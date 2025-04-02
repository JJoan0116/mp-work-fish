import React, { useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
import { Calendar } from "@nutui/nutui-react-taro";

const Diary = () => {
  // 历史记录数据
  const [historyRecords, setHistoryRecords] = useState([
    {
      id: 1,
      date: "2024-01-20",
      fishTime: "3.5h",
      description: "上午开会摸鱼2小时，下午摸了会儿微博...",
      fishRate: "43%",
      salary: 175,
    },
    {
      id: 2,
      date: "2024-01-19",
      fishTime: "2h",
      description: "今天忙不忙，摸了一下午的鱼...",
      fishRate: "25%",
      salary: 125,
    },
    {
      id: 3,
      date: "2024-01-18",
      fishTime: "1.5h",
      description: "今天工作状态，只摸了一会儿鱼...",
      fishRate: "18%",
      salary: 90,
    },
  ]);

  // 日历显示状态
  const [showCalendar, setShowCalendar] = useState(false);
  // 选中的日期
  const [selectedDate, setSelectedDate] = useState("");

  // 查看详情
  const viewDetail = (id) => {
    Taro.showToast({
      title: `查看记录${id}详情功能开发中`,
      icon: "none",
    });
  };

  // 处理日期选择
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // 过滤显示的记录
  const filteredRecords = selectedDate
    ? historyRecords.filter((record) => record.date === selectedDate)
    : historyRecords;

  return (
    <View className="diary-container">
      {/* 头部 */}
      <View className="header">
        <View className="title">
          <View className="iconfont icon-touch-fish icon-fish"></View>
          <Text>{selectedDate || "2024.4.1"}摸鱼记录</Text>
        </View>
        <View
          className="iconfont .icon-icon"
          onClick={() => setShowCalendar(!showCalendar)}
        ></View>
      </View>

      {/* 日历组件 */}
      <Calendar
        visible={showCalendar}
        defaultValue={selectedDate}
        onClose={() => setShowCalendar(false)}
        onConfirm={handleDateSelect}
      />

      {/* 历史记录列表 */}
      <View className="history-list">
        {filteredRecords.map((record) => (
          <View
            className="history-item"
            key={record.id}
            onClick={() => viewDetail(record.id)}
          >
            <View className="history-header">
              <Text className="history-date">{record.date}</Text>
              <Text className="history-fish-time">
                摸鱼时长: {record.fishTime}
              </Text>
            </View>
            <Text className="history-description">{record.description}</Text>
            <View className="history-footer">
              <Text className="history-fish-rate">
                摸鱼率: {record.fishRate}
              </Text>
              <Text className="history-salary">¥{record.salary}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Diary;
