import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const Today = () => {
  // 状态管理
  const [countdown, setCountdown] = useState({ hours: 1, minutes: 25, seconds: 36 })
  const [progress, setProgress] = useState(82)
  const [todayFishSalary, setTodayFishSalary] = useState(128)
  const [todayTotalSalary, setTodayTotalSalary] = useState(450)
  const [fishRecords, setFishRecords] = useState([
    {
      id: 1,
      time: '上午 10:30',
      duration: 60,
      content: '开会时间摸鱼，看了会儿微博...'
    },
    {
      id: 2,
      time: '下午 14:20',
      duration: 45,
      content: '午休后继续摸鱼，刷了会儿视频...'
    },
    {
      id: 3,
      time: '下午 16:45',
      duration: 45,
      content: '下班前摸鱼，看了会儿小说...'
    },
    {
      id: 4,
      time: '晚上 22:00',
      duration: 30,
      content: '睡前摸鱼，听了会儿音乐...'
    },
    {
      id: 5,
      time: '凌晨 02:30',
      duration: 30,
      content: '第二天上班前摸鱼，看了会儿漫画...'
    }
  ])

  // 倒计时效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        let { hours, minutes, seconds } = prevCountdown

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              // 倒计时结束
              clearInterval(timer)
              return { hours: 0, minutes: 0, seconds: 0 }
            }
          }
        }

        // 更新进度
        const totalSeconds = 8 * 60 * 60 // 假设工作8小时
        const remainingSeconds = hours * 3600 + minutes * 60 + seconds
        const newProgress = Math.floor(((totalSeconds - remainingSeconds) / totalSeconds) * 100)
        setProgress(newProgress)

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 格式化时间显示
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  // 跳转到设置页面
  const goToSettings = () => {
    Taro.navigateTo({
      url: '/pages/settings/index'
    })
  }

  // 添加摸鱼记录
  const addFishRecord = () => {
    Taro.showToast({
      title: '添加摸鱼记录功能开发中',
      icon: 'none'
    })
  }

  // 编辑摸鱼记录
  const editFishRecord = (id) => {
    Taro.showToast({
      title: `编辑记录${id}功能开发中`,
      icon: 'none'
    })
  }

  // 删除摸鱼记录
  const deleteFishRecord = (id) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条摸鱼记录吗？',
      success: function (res) {
        if (res.confirm) {
          setFishRecords(prevRecords => prevRecords.filter(record => record.id !== id))
          Taro.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  }

  return (
    <View className='today-container'>
      {/* 倒计时卡片 */}
      <View className='countdown-card'>
        {/* 动效元素 */}
        <View className='confetti' style={{ left: '10%', animationDelay: '0.5s' }}></View>
        <View className='confetti' style={{ left: '25%', animationDelay: '1.2s' }}></View>
        <View className='confetti' style={{ left: '40%', animationDelay: '0.8s' }}></View>
        <View className='confetti' style={{ left: '55%', animationDelay: '1.5s' }}></View>
        <View className='confetti' style={{ left: '70%', animationDelay: '0.7s' }}></View>
        <View className='confetti' style={{ left: '85%', animationDelay: '1.3s' }}></View>
        <View className='confetti' style={{ left: '15%', animationDelay: '1.0s' }}></View>
        <View className='confetti' style={{ left: '60%', animationDelay: '0.9s' }}></View>
        <Text className='countdown-title'>距离下班还有</Text>
        <Text className='time-display'>
          {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
        </Text>
        <View className='progress-bar'>
          <View className='progress' style={{ width: `${progress}%` }}></View>
        </View>
        <Text className='progress-text'>已完成今日 {progress}%</Text>
      </View>

      {/* 薪资信息 */}
      <View className='salary-info'>
        <View className='salary-item'>
          <Text className='salary-label'>今日摸鱼薪资</Text>
          <Text className='salary-value'>¥{todayFishSalary}</Text>
        </View>
        <View className='salary-item'>
          <Text className='salary-label'>今日总薪资</Text>
          <Text className='salary-value total'>¥{todayTotalSalary}</Text>
        </View>
      </View>

      {/* 摸鱼记录区域 */}
      <View className='fish-records'>
        <View className='records-header'>
          <View className='records-title'>
            <Text className='icon'>🐟</Text>
            <Text>今日摸鱼记录</Text>
          </View>
          <View className='add-record' onClick={addFishRecord}>
            <Text className='icon'>+</Text>
            <Text>添加记录</Text>
          </View>
        </View>

        {/* 摸鱼记录列表 */}
        <View className='record-list'>
          {fishRecords.map(record => (
            <View className='record-item' key={record.id}>
              <View className='record-header'>
                <Text className='record-time'>{record.time}</Text>
                <Text className='record-duration'>{record.duration} 分钟</Text>
              </View>
              <View className='record-content-wrapper'>
                <Text className='record-content'>{record.content}</Text>
                <View className='record-actions'>
                  <Text className='edit-btn' onClick={() => editFishRecord(record.id)}>编辑</Text>
                  <Text className='delete-btn' onClick={() => deleteFishRecord(record.id)}>删除</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Today