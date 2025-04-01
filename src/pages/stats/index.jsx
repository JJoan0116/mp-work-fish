import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";

const Stats = () => {
  // 状态管理
  const [totalSalary, setTotalSalary] = useState(568);
  const [fishEfficiency, setFishEfficiency] = useState(28);
  const [avgFishTime, setAvgFishTime] = useState(2.5);
  const [monthlyFishSalary, setMonthlyFishSalary] = useState(2340);

  // 图表数据
  const chartData = [
    { day: "周一", value: 45, salary: 225 },
    { day: "周二", value: 65, salary: 325 },
    { day: "周三", value: 40, salary: 200 },
    { day: "周四", value: 75, salary: 375 },
    { day: "周五", value: 55, salary: 275 },
  ];

  // 获取最大值用于计算比例
  const maxValue = Math.max(...chartData.map((item) => item.value));

  // 鼠标悬停状态
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <View className="stats-container">
      {/* 统计卡片 */}
      <View className="stats-card">
        <View className="stats-header">
          <Text className="stats-title">本周摸鱼分析</Text>
          <Text className="stats-total">总计: ¥{totalSalary}</Text>
        </View>

        {/* 图表 */}
        <View className="stats-chart">
          {chartData.map((item, index) => (
            <View
              className="chart-column"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <View className="chart-value">
                <Text className="value-text">¥{item.salary}</Text>
              </View>
              <View
                className={`chart-bar ${
                  hoveredIndex === index ? "hovered" : ""
                }`}
                style={{ height: `${(item.value / maxValue) * 150}px` }}
              >
                <Text className="bar-value">{item.value}%</Text>
              </View>
              <Text className="chart-label">{item.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 摸鱼效率分析 */}
      <View className="analysis-card">
        <Text className="analysis-title">摸鱼效率分析</Text>

        <View className="analysis-data">
          <View className="data-item">
            <Text className="data-value">{fishEfficiency}%</Text>
            <Text className="data-label">平均摸鱼率</Text>
          </View>

          <View className="data-item">
            <Text className="data-value">{avgFishTime}h</Text>
            <Text className="data-label">日均摸鱼时长</Text>
          </View>

          <View className="data-item">
            <Text className="data-value">¥{monthlyFishSalary}</Text>
            <Text className="data-label">本月摸鱼薪资</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stats;
