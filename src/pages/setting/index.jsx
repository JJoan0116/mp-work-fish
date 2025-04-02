import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
// import { AtInput, AtButton } from "taro-ui";
import "./index.scss";

const Setting = ({ isOpened, onClose }) => {
  const [salary, setSalary] = useState("500");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [workdays, setWorkdays] = useState(["1", "2", "3", "4", "5"]);

  const handleSalaryChange = (value) => {
    setSalary(value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.detail.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.detail.value);
  };

  const toggleWorkday = (day) => {
    setWorkdays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  const handleSelectAll = () => {
    setWorkdays(["1", "2", "3", "4", "5", "6", "7"]);
  };

  const handleClearAll = () => {
    setWorkdays([]);
  };

  const handleSave = () => {
    // TODO: 保存设置
    onClose();
  };

  return (
    <View className="setting-drawer">
      <View className="setting-header">
        <Text className="setting-title">设置</Text>
      </View>

      <View className="setting-content">
        <View className="setting-item">
          <Text className="setting-label">日薪 (元)</Text>
          {/* <AtInput type="number" value={salary} onChange={handleSalaryChange} /> */}
        </View>

        <View className="setting-item">
          <Text className="setting-label">上班时间</Text>
          {/* <Picker
              mode='time'
              value={startTime}
              onChange={handleStartTimeChange}
            >
              <View className='picker-value'>{startTime}</View>
            </Picker> */}
        </View>

        <View className="setting-item">
          <Text className="setting-label">下班时间</Text>
          {/* <Picker
              mode='time'
              value={endTime}
              onChange={handleEndTimeChange}
            >
              <View className='picker-value'>{endTime}</View>
            </Picker> */}
        </View>

        <View className="setting-item">
          <View className="workday-header">
            <Text className="setting-label">工作日选择</Text>
            <View className="workday-actions">
              <Text className="action-btn" onClick={handleSelectAll}>
                全选
              </Text>
              <Text className="action-btn" onClick={handleClearAll}>
                清除
              </Text>
            </View>
          </View>
          <View className="workday-list">
            {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => (
              <View
                key={index}
                className={`workday-item ${
                  workdays.includes(String(index + 1)) ? "selected" : ""
                }`}
                onClick={() => toggleWorkday(String(index + 1))}
              >
                周{day}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* <AtButton type="primary" className="save-btn" onClick={handleSave}>
        保存设置
      </AtButton> */}
    </View>
  );
};

export default Setting;
