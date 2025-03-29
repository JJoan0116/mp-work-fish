import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 今日摸鱼金额和工资收入
      todayFishAmount: '****', // 隐藏金额
      todaySalary: 328.50,
      // 当前时间和下班时间
      currentTime: '14:30',
      timeToOffWork: '3.5h',
      // 四个功能按钮的数据
      activities: [
        { type: 'FISH', label: '带薪摸鱼', icon: '🐟', count: 12 },
        { type: 'TOILET', label: '带薪蹲坑', icon: '🚽', count: 8 },
        { type: 'DRINK', label: '带薪喝水', icon: '🥤', count: 15 },
        { type: 'CHAT', label: '带薪聊天', icon: '🌙', count: 5 }
      ],
      // 四个状态指标
      statusItems: [
        { label: '距离发钱', icon: '💰', value: '15天' },
        { label: '距离周末', icon: '📅', value: '3天' },
        { label: '距离放假', icon: '🎁', value: '45天' },
        { label: '距离退休', icon: '🏖️', value: '20年' }
      ],
      // 摸鱼记录
      fishRecords: [
        { time: '14:00', type: 'FISH', icon: '🐟', duration: '30分钟' },
        { time: '11:30', type: 'TOILET', icon: '🚽', duration: '15分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '14:00', type: 'FISH', icon: '🐟', duration: '30分钟' },
        { time: '11:30', type: 'TOILET', icon: '🚽', duration: '15分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '14:00', type: 'FISH', icon: '🐟', duration: '30分钟' },
        { time: '11:30', type: 'TOILET', icon: '🚽', duration: '15分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '14:00', type: 'FISH', icon: '🐟', duration: '30分钟' },
        { time: '11:30', type: 'TOILET', icon: '🚽', duration: '15分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '14:00', type: 'FISH', icon: '🐟', duration: '30分钟' },
        { time: '11:30', type: 'TOILET', icon: '🚽', duration: '15分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
        { time: '10:00', type: 'DRINK', icon: '🥤', duration: '10分钟' },
      ],
      // 总计时间
      totalTime: '2小时30分'
    }
  }

  componentDidMount() {
    // 实际应用中应该获取真实数据
    this.updateCurrentTime()
    this.timer = setInterval(() => {
      this.updateCurrentTime()
    }, 60000) // 每分钟更新一次
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  updateCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    this.setState({
      currentTime: `${hours}:${minutes}`
    })
    
    // 计算距离下班时间（假设下班时间是18:00）
    const offWorkTime = new Date()
    offWorkTime.setHours(18, 0, 0)
    const diffMs = offWorkTime - now
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    this.setState({
      timeToOffWork: diffHours > 0 ? `${diffHours}.${Math.floor(diffMinutes / 6)}h` : '已下班'
    })
  }

  toggleFavorite(type) {
    const typeMap = {
      'FISH': '带薪摸鱼',
      'TOILET': '带薪蹲坑',
      'DRINK': '带薪喝水',
      'CHAT': '带薪聊天'
    }
    console.log(`收藏${typeMap[type]}`)
    // 实际应用中应该更新收藏状态
  }

  addActivity(type) {
    const typeMap = {
      'FISH': '带薪摸鱼',
      'TOILET': '带薪蹲坑',
      'DRINK': '带薪喝水',
      'CHAT': '带薪聊天'
    }
    console.log(`添加${typeMap[type]}活动`)
    // 实际应用中应该添加新活动并更新状态
  }

  render() {
    const { 
      todayFishAmount, todaySalary, currentTime, timeToOffWork,
      activities, statusItems, fishRecords, totalTime 
    } = this.state

    return (
      <View className='today-page'>
        {/* 顶部卡片区域 */}
        <View className='card-section'>
          <View className='card fish-amount-card'>
            <View className='card-header'>
              <Text className='card-title'>今日摸鱼金额</Text>
              <Text className='favorite-icon'>☆</Text>
            </View>
            <Text className='card-value'>¥ {todayFishAmount}</Text>
          </View>
          
          <View className='card salary-card'>
            <View className='card-header'>
              <Text className='card-title'>今日工资收入</Text>
              <Text className='favorite-icon'>☆</Text>
            </View>
            <Text className='card-value'>¥ {todaySalary.toFixed(2)}</Text>
          </View>
        </View>

        {/* 时钟区域 */}
        <View className='clock-section'>
          <View className='clock-container'>
            <Text className='current-time'>{currentTime}</Text>
            <Text className='time-to-off'>距离下班还有{timeToOffWork}</Text>
          </View>
        </View>

        {/* 功能按钮区域 */}
        <View className='activity-section'>
          {activities.map((activity, index) => (
            <View key={index} className='activity-item' onClick={() => this.addActivity(activity.type)}>
              <Text className='activity-icon'>{activity.label} {activity.icon}</Text>
              <Text className='activity-count'>{activity.count}次</Text>
            </View>
          ))}
        </View>

        {/* 状态指标区域 */}
        <View className='status-section'>
          {statusItems.map((item, index) => (
            <View key={index} className='status-item'>
              <Text className='status-label'>{item.label} {item.icon}</Text>
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
              <View key={index} className='record-item'>
                <Text className='record-time'>{record.time}</Text>
                <View className='record-content'>
                  <Text className='record-icon'>{record.icon}</Text>
                  <Text className='record-type'>{record.type}</Text>
                </View>
                <Text className='record-duration'>{record.duration}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    )
  }
}