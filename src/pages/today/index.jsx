import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction, AtInputNumber, AtModalHeader, AtButton, AtSwipeAction} from 'taro-ui'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import duration from 'dayjs/plugin/duration'
dayjs.extend(isSameOrAfter)
dayjs.extend(duration)
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
      // 进度条状态
      progress: 0,
      // 发薪日设置
      payDay: 10,
      // 法定节假日信息
      holidays: [
        { name: '元旦', date: '2025-01-01' },
        { name: '春节', date: '2025-01-29' },
        { name: '清明节', date: '2025-04-04' },
        { name: '劳动节', date: '2025-05-01' },
        { name: '端午节', date: '2025-05-31' },
        { name: '中秋节', date: '2025-09-06' },
        { name: '国庆节', date: '2025-10-01' }
      ],
      // 四个功能按钮的数据
      activities: [
        { type: 'FISH', label: '带薪摸鱼', icon: <View className='iconfont icon-touch-fish'></View>, count: 0 },
        { type: 'TOILET', label: '带薪蹲坑', icon: <View className='iconfont icon-matong'></View>, count: 0 },
        { type: 'DRINK', label: '带薪喝水', icon: <View className='iconfont icon-heshui'></View>, count: 0 },
      ],
      // 四个状态指标
      statusItems: [
        { label: '距离发钱', icon: <View className='iconfont icon-qian'></View>, value: '0' },
        { label: '距离周末', icon: <View className='iconfont icon-icon'></View>, value: '0' },
        { label: '距离放假', icon: <View className='iconfont icon-qingzhu1'></View>, value: '0' },
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
    this.calculateDaysToTarget()
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

  calculateDaysToTarget() {
    const today = dayjs().startOf('day')
    const { holidays, payDay } = this.state
    const statusItems = [...this.state.statusItems]

    // 计算距离发薪日的天数
    const thisMonthPayday = dayjs().date(payDay)
    const nextMonthPayday = dayjs().add(1, 'month').date(payDay)
    const daysToPayday = today.date() < payDay
      ? thisMonthPayday.diff(today, 'day')
      : nextMonthPayday.diff(today, 'day')
    statusItems[0] = { ...statusItems[0], value: daysToPayday.toString() }

    // 计算距离本周六的天数
    const saturday = today.endOf('week')
    const daysToWeekend = saturday.diff(today, 'day')
    statusItems[1] = { ...statusItems[1], value: daysToWeekend.toString() }

    // 计算距离最近节假日的天数
    const nextHoliday = holidays
      .map(holiday => ({ ...holiday, date: dayjs(holiday.date).startOf('day') }))
      .filter(holiday => dayjs(holiday.date).isSameOrAfter(today))
      .sort((a, b) => dayjs(a.date).diff(today, 'day') - dayjs(b.date).diff(today, 'day'))[0]

    if (nextHoliday) {
      const daysToHoliday = nextHoliday.date.diff(today, 'day')
      statusItems[2] = { ...statusItems[2], value: daysToHoliday.toString() }
      console.log(`下一个最近的节假日是 ${nextHoliday.name}，距离今天还有 ${daysToHoliday} 天`)
    }

    this.setState({ statusItems })
  }

  updateCurrentTime() {
    const now = dayjs()
    const offWorkTime = now.hour(18).minute(0).second(0)
    const startWorkTime = now.hour(9).minute(0).second(0)

    // 如果已经下班，固定时间为00:00并清除定时器
    if (now.isAfter(offWorkTime)) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.setState({
        currentTime: '00:00',
        timeToOffWork: '已下班'
      })
      this.setState({
        currentTime: '00:00',
        timeToOffWork: '已下班',
        progress: 1
      })
      return
    }

    // 更新当前时间显示
    this.setState({
      currentTime: now.format('HH:mm')
    })

    // 计算工作进度
    const totalWorkMs = offWorkTime.diff(startWorkTime)
    const workedMs = now.diff(startWorkTime)
    const progress = Math.max(0, Math.min(1, workedMs / totalWorkMs))
    this.setState({ progress })
    console.log('progress', progress)

    // 计算距离下班时间
    const diffDuration = dayjs.duration(offWorkTime.diff(now))
    const diffHours = diffDuration.hours()
    const diffMinutes = diffDuration.minutes()

    this.setState({
      timeToOffWork: now.isAfter(offWorkTime) ? '已下班' : `距离下班还有${diffHours}.${Math.floor(diffMinutes / 6)}h`
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
      activities, statusItems, fishRecords, totalTime, showFishAmount, showSalary, isModalOpen, progress
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
          <View className='clock-container' style={{ '--progress': progress }}>
            <View></View>
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
              <Text className='status-value'>{item.value}天</Text>
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