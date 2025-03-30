import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction, AtInputNumber, AtModalHeader, AtButton, AtSwipeAction} from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 今日摸鱼金额和工资收入
      todayFishAmount: 0,
      todaySalary: 0,
      // 金额显示状态
      showFishAmount: true,
      showSalary: true,
      // Modal状态
      isModalOpen: false,
      currentActivityType: '',
      inputDuration: '',
      // 当前时间和下班时间
      currentTime: '0',
      timeToOffWork: '0',
      // 四个功能按钮的数据
      activities: [
            
        { type: 'FISH', label: '带薪摸鱼', icon: <View className='iconfont icon-touch-fish'></View>, count: 0 },
        { type: 'TOILET', label: '带薪蹲坑', icon: <View className='iconfont icon-matong'></View>, count: 0 },
        { type: 'DRINK', label: '带薪喝水', icon: <View className='iconfont icon-heshui'></View>, count: 0 },
      ],
      // 四个状态指标
      statusItems: [
        { label: '距离发钱', icon: <View className='iconfont icon-qian'></View>, value: '0天' },
        { label: '距离周末', icon: <View className='iconfont icon-icon'></View>, value: '0天' },
        { label: '距离放假', icon: <View className='iconfont icon-qingzhu1'></View>, value: '0天' },
      ],
      // 摸鱼记录
      fishRecords: [
      ],
      // 总计时间
      totalTime: '0'
    }
  }

  componentDidMount() {
    // 实际应用中应该获取真实数据
    this.updateCurrentTime()
    // 如果已经下班，不启动定时器
    const now = new Date()
    const offWorkTime = new Date()
    offWorkTime.setHours(18, 0, 0)
    if (now < offWorkTime) {
      this.timer = setInterval(() => {
        this.updateCurrentTime()
      }, 60000) // 每分钟更新一次
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  updateCurrentTime() {
    const now = new Date()
    const offWorkTime = new Date()
    offWorkTime.setHours(18, 0, 0)
    
    // 如果已经下班，固定时间为00:00并清除定时器
    if (now >= offWorkTime) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.setState({
        currentTime: '00:00',
        timeToOffWork: '已下班'
      })
      return
    }
    
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    this.setState({
      currentTime: `${hours}:${minutes}`
    })
    
    // 计算距离下班时间
    const diffMs = offWorkTime - now
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    this.setState({
      timeToOffWork: `距离下班还有${diffHours}.${Math.floor(diffMinutes / 6)}h`
    })
  }

  toggleAmountVisibility(type) {
    if (type === 'fish') {
      this.setState(prevState => ({
        showFishAmount: !prevState.showFishAmount
      }))
    } else if (type === 'salary') {
      this.setState(prevState => ({
        showSalary: !prevState.showSalary
      }))
    }
  }

  addActivity(type) {
    this.setState({
      isModalOpen: true,
      currentActivityType: type,
      inputDuration: ''
    })
  }

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
      currentActivityType: '',
      inputDuration: ''
    })
  }

  handleSwipeAction = (record, index) => {
    return [
      {
        text: '编辑',
        style: {
          backgroundColor: '#6190E8'
        },
        onClick: () => this.handleEdit(record, index)
      },
      {
        text: '删除',
        style: {
          backgroundColor: '#FF4949'
        },
        onClick: () => this.handleDelete(index)
      }
    ]
  }

  handleEdit = (record, index) => {
    this.setState({
      isModalOpen: true,
      currentActivityType: record.type,
      inputDuration: record.duration.replace('分钟', ''),
      editingIndex: index
    })
  }

  handleDelete = (index) => {
    const { fishRecords, activities } = this.state
    const deletedRecord = fishRecords[index]
    const duration = parseInt(deletedRecord.duration)

    // 更新活动时间
    const updatedActivities = activities.map(activity => {
      if (activity.type === deletedRecord.type) {
        return { ...activity, count: activity.count - duration }
      }
      return activity
    })

    // 更新记录列表
    const updatedRecords = [...fishRecords]
    updatedRecords.splice(index, 1)

    // 计算总时间
    const totalMinutes = updatedActivities.reduce((sum, activity) => sum + activity.count, 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const totalTime = `${hours}小时${minutes}分`

    this.setState({
      fishRecords: updatedRecords,
      activities: updatedActivities,
      totalTime
    })

    Taro.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  }

  handleInputChange = (value) => {
    this.setState({
      inputDuration: value
    })
  }

  handleConfirm = () => {
    const { currentActivityType, inputDuration, activities, fishRecords, editingIndex } = this.state
    const duration = parseInt(inputDuration)
    
    if (!duration || duration <= 0) {
      return
    }

    let updatedActivities = [...activities]
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const currentTime = `${hours}:${minutes}`

    // 如果是编辑模式，先减去原有记录的时长
    if (editingIndex !== undefined) {
      const oldRecord = fishRecords[editingIndex]
      const oldDuration = parseInt(oldRecord.duration)
      updatedActivities = updatedActivities.map(activity => {
        if (activity.type === oldRecord.type) {
          return { ...activity, count: activity.count - oldDuration }
        }
        return activity
      })
    }

    // 更新活动时间
    updatedActivities = updatedActivities.map(activity => {
      if (activity.type === currentActivityType) {
        return { ...activity, count: activity.count + duration }
      }
      return activity
    })

    const newRecord = {
      time: currentTime,
      type: currentActivityType,
      icon: activities.find(a => a.type === currentActivityType)?.icon || <View className='iconfont icon-touch-fish'></View>,
      duration: `${duration}分钟`
    }

    let updatedRecords
    if (editingIndex !== undefined) {
      updatedRecords = [...fishRecords]
      updatedRecords[editingIndex] = newRecord
    } else {
      updatedRecords = [newRecord, ...fishRecords]
    }

    // 计算总时间
    const totalMinutes = updatedActivities.reduce((sum, activity) => sum + activity.count, 0)
    const hours2 = Math.floor(totalMinutes / 60)
    const minutes2 = totalMinutes % 60
    const totalTime = `${hours2}小时${minutes2}分`

    Taro.showToast({
      title: editingIndex !== undefined ? '摸鱼记录更新成功' : '摸鱼记录添加成功',
      icon: 'success',
      duration: 2000
    })

    this.setState({
      activities: updatedActivities,
      fishRecords: updatedRecords,
      totalTime,
      isModalOpen: false,
      currentActivityType: '',
      inputDuration: '',
      editingIndex: undefined
    })
  }

  render() {
    const { 
      todayFishAmount, todaySalary, currentTime, timeToOffWork,
      activities, statusItems, fishRecords, totalTime, showFishAmount, showSalary, isModalOpen
    } = this.state

    return (
      <View className='today-page'>
        {/* 顶部卡片区域 */}
        <View className='card-section'>
          <View className='card fish-amount-card'>
            <View className='card-header'>
              <Text className='card-title'>今日摸鱼金额</Text>
              <View className='favorite-icon' onClick={() => this.toggleAmountVisibility('fish')}>
              <View className={`iconfont ${showFishAmount ? 'icon-eye-close' : 'icon-eye'}`}></View>
              </View>
            </View>
            <Text className='card-value'>¥ {showFishAmount ? todayFishAmount.toFixed(2) : '****'}</Text>
          </View>
          
          <View className='card salary-card'>
            <View className='card-header'>
              <Text className='card-title'>今日工资收入</Text>
              <View className='favorite-icon' onClick={() => this.toggleAmountVisibility('salary')}>
              <View className={`iconfont ${showSalary ? 'icon-eye-close' : 'icon-eye'}`}></View>
              </View>
            </View>
            <Text className='card-value'>¥ {showSalary ? todaySalary.toFixed(2) : '****'}</Text>
          </View>
        </View>

        {/* 时钟区域 */}
        <View className='clock-section'>
          <View className='clock-container'>
            <Text className='current-time'>{currentTime}</Text>
            <Text className='time-to-off'>{timeToOffWork}</Text>
          </View>
        </View>

        {/* 功能按钮区域 */}
        <View className='activity-section'>
          {activities.map((activity, index) => (
            <View key={index} className='activity-item' onClick={() => this.addActivity(activity.type)}>
              <View className='activity-icon'>{activity.label} {activity.icon}</View>
              <Text className='activity-count'>{activity.count}分钟</Text>
            </View>
          ))}
        </View>

        {/* 状态指标区域 */}
        <View className='status-section'>
          {statusItems.map((item, index) => (
            <View key={index} className='status-item'>
              <View className='status-label'>{item.label} {item.icon}</View>
              <Text className='status-value'>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* 摸鱼记录区域 */}
        <View className='record-section'>
          <View className='record-header'>
            <Text className='record-title'>今日摸鱼记录</Text>
            <Text className='record-total'>共计: {totalTime}</Text>
          </View>
          
          <View className='record-list'>
            {fishRecords.map((record, index) => (
              <AtSwipeAction
                key={index}
                options={this.handleSwipeAction(record, index)}
                className='record-item'
                autoClose
                onClick={(item, index) => item.onClick()}
                onOpened={() => console.log('Swipe opened')}
                onClosed={() => console.log('Swipe closed')}
                isOpened={false}
              >
                <View className='record-content-wrapper'>
                  <Text className='record-time'>{record.time}</Text>
                  <View className='record-content'>
                    <View className='record-icon'>{record.icon}</View>
                    <Text className='record-type'>{activities.find(a => a.type === record.type)?.label || '带薪摸鱼'}</Text>
                  </View>
                  <Text className='record-duration'>{record.duration}</Text>
                </View>
              </AtSwipeAction>
            ))}
          </View>
        </View>

        {/* 输入时间弹窗 */}
        <AtModal isOpened={isModalOpen} onClose={this.handleModalClose} className='fish-modal'>
          <AtModalHeader>好耶，又摸鱼咯 🎉</AtModalHeader>
          <AtModalContent>
            <View className='modal-input-container'>
              <Text className='input-unit'>本次摸鱼</Text>
              <AtInputNumber
                min={0}
                max={100}
                step={1}
                value={Number(this.state.inputDuration)}
                onChange={this.handleInputChange}
                type='number'
                placeholder='请输入时间'
              />
              <Text className='input-unit'>分钟</Text>
            </View>
          </AtModalContent>
          <AtModalAction>
            <View className='modal-buttons'>
              <AtButton
                onClick={this.handleModalClose}>取消</AtButton>
              <AtButton 
                 type='primary' onClick={this.handleConfirm}>确定</AtButton>
            </View>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}