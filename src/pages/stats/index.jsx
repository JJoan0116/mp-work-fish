import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const Stats = () => {
  // 状态管理
  const [currentMonth, setCurrentMonth] = useState('本周摸鱼薪资')
  const [totalSalary, setTotalSalary] = useState(568)
  const [fishEfficiency, setFishEfficiency] = useState(28)
  const [avgFishTime, setAvgFishTime] = useState(2.5)
  const [monthlyFishSalary, setMonthlyFishSalary] = useState(2340)

  // 图表数据
  const chartData = [
    { day: '周一', value: 45 },
    { day: '周二', value: 65 },
    { day: '周三', value: 40 },
    { day: '周四', value: 75 },
    { day: '周五', value: 55 }
  ]

  // 获取最大值用于计算比例
  const maxValue = Math.max(...chartData.map(item => item.value))

  return (
    <View className='stats-container'>
      {/* 头部 */}
      <View className='header'>
        <Text className='title'>摸鱼统计</Text>
        <View className='filter-icon'>📅</View>
      </View>

      {/* 统计卡片 */}
      <View className='stats-card'>
        <View className='stats-header'>
          <Text className='stats-title'>{currentMonth}</Text>
          <Text className='stats-total'>总计: ¥{totalSalary}</Text>
        </View>

        {/* 图表 */}
        <View className='stats-chart'>
          {chartData.map((item, index) => (
            <View className='chart-column' key={index}>
              <View
                className='chart-bar'
                style={{ height: `${(item.value / maxValue) * 150}px` }}
              ></View>
              <Text className='chart-label'>{item.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 摸鱼效率分析 */}
      <View className='analysis-card'>
        <Text className='analysis-title'>摸鱼效率分析</Text>

        <View className='analysis-data'>
          <View className='data-item'>
            <Text className='data-value'>{fishEfficiency}%</Text>
            <Text className='data-label'>平均摸鱼率</Text>
          </View>

          <View className='data-item'>
            <Text className='data-value'>{avgFishTime}h</Text>
            <Text className='data-label'>日均摸鱼时长</Text>
          </View>

          <View className='data-item'>
            <Text className='data-value'>¥{monthlyFishSalary}</Text>
            <Text className='data-label'>本月摸鱼薪资</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default Stats