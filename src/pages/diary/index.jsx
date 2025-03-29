import { Component } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'

export default class Diary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: '2023年11月',
      totalDays: 22,
      totalHours: 45.5,
      totalAmount: 2275.0,
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      days: this.generateDays(),
      diaries: [
        {
          date: '2023-11-15',
          total: '2小时15分钟',
          activities: [
            { type: '带薪摸鱼', icon: '🐟', duration: '45分钟' },
            { type: '带薪蹲坑', icon: '🚽', duration: '30分钟' },
            { type: '带薪喝水', icon: '🥤', duration: '15分钟' },
            { type: '带薪带薪', icon: '🌙', duration: '45分钟' }
          ],
          summary: {
            efficiency: '75%',
            saved: '¥112.50',
            mood: '😊'
          }
        },
        {
          date: '2023-11-14',
          total: '1小时45分钟',
          activities: [
            { type: '带薪摸鱼', icon: '🐟', duration: '30分钟' },
            { type: '带薪蹲坑', icon: '🚽', duration: '30分钟' },
            { type: '带薪喝水', icon: '🥤', duration: '15分钟' },
            { type: '带薪带薪', icon: '🌙', duration: '30分钟' }
          ],
          summary: {
            efficiency: '70%',
            saved: '¥87.50',
            mood: '😊'
          }
        },
        {
          date: '2023-11-13',
          total: '2小时30分钟',
          activities: [
            { type: '带薪摸鱼', icon: '🐟', duration: '1小时' },
            { type: '带薪蹲坑', icon: '🚽', duration: '30分钟' },
            { type: '带薪喝水', icon: '🥤', duration: '15分钟' },
            { type: '带薪带薪', icon: '🌙', duration: '45分钟' }
          ],
          summary: {
            efficiency: '80%',
            saved: '¥125.00',
            mood: '😁'
          }
        }
      ]
    }
  }

  generateDays() {
    // 这里简化处理，实际应用中应该根据当前月份生成正确的日期
    const days = []
    for (let i = 1; i <= 30; i++) {
      days.push({
        day: i,
        hasRecord: Math.random() > 0.5, // 随机生成是否有记录
        isActive: i === 15 // 假设当前日期是15号
      })
    }
    return days
  }

  prevMonth = () => {
    // 实际应用中应该更新月份并重新生成日期
    console.log('上个月')
  }

  nextMonth = () => {
    // 实际应用中应该更新月份并重新生成日期
    console.log('下个月')
  }

  selectDay = (day) => {
    // 实际应用中应该根据选中的日期更新日记列表
    console.log('选中日期:', day)
    
    // 更新选中状态
    const updatedDays = this.state.days.map(d => ({
      ...d,
      isActive: d.day === day
    }))
    
    this.setState({ days: updatedDays })
  }

  render() {
    const { 
      currentMonth, 
      totalDays, 
      totalHours, 
      totalAmount,
      weekdays,
      days,
      diaries 
    } = this.state

    return (
      <View className='diary-page'>
        {/* 头部统计 */}
        <View className='header'>
          <Text className='title'>摸鱼日记</Text>
          <View className='total-stats'>
            <Text className='stats-item'>总天数: <Text className='value'>{totalDays}天</Text></Text>
            <Text className='stats-item'>总时长: <Text className='value'>{totalHours}小时</Text></Text>
            <Text className='stats-item'>总金额: <Text className='value'>¥{totalAmount.toFixed(2)}</Text></Text>
          </View>
        </View>

        {/* 日历部分 */}
        <View className='calendar-section'>
          <View className='month-selector'>
            <Text className='month-title'>{currentMonth}</Text>
            <View className='month-actions'>
              <View className='month-action' onClick={this.prevMonth}>
                <Text>←</Text>
              </View>
              <View className='month-action' onClick={this.nextMonth}>
                <Text>→</Text>
              </View>
            </View>
          </View>
          
          <View className='calendar-grid'>
            {/* 星期标题 */}
            {weekdays.map((day, index) => (
              <Text className='weekday-label' key={index}>{day}</Text>
            ))}
            
            {/* 日期单元格 */}
            {days.map((day, index) => (
              <View 
                className={`day-cell ${day.isActive ? 'active' : ''}`} 
                key={index}
                onClick={() => this.selectDay(day.day)}
              >
                <Text className='day-number'>{day.day}</Text>
                {day.hasRecord && <View className='day-indicator' />}
              </View>
            ))}
          </View>
        </View>

        {/* 日记列表 */}
        <ScrollView className='diary-list' scrollY>
          {diaries.map((diary, index) => (
            <View className='diary-item' key={index}>
              <View className='diary-header'>
                <Text className='diary-date'>{diary.date}</Text>
                <Text className='diary-total'>总计: {diary.total}</Text>
              </View>
              
              <View className='diary-content'>
                {diary.activities.map((activity, actIndex) => (
                  <View className='activity-item' key={actIndex}>
                    <View className='activity-type'>
                      <Text className='activity-icon'>{activity.icon}</Text>
                      <Text className='activity-name'>{activity.type}</Text>
                    </View>
                    <Text className='activity-duration'>{activity.duration}</Text>
                  </View>
                ))}
              </View>
              
              <View className='diary-summary'>
                <View className='summary-item'>
                  <Text className='summary-label'>效率</Text>
                  <Text className='summary-value'>{diary.summary.efficiency}</Text>
                </View>
                <View className='summary-item'>
                  <Text className='summary-label'>节省</Text>
                  <Text className='summary-value'>{diary.summary.saved}</Text>
                </View>
                <View className='summary-item'>
                  <Text className='summary-label'>心情</Text>
                  <Text className='summary-value'>{diary.summary.mood}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}