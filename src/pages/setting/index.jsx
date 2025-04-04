import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../../store/settings";
import {
  Form,
  Cell,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
} from "@nutui/nutui-react-taro";
import { Eye, Marshalling } from '@nutui/icons-react-taro'
import "./index.scss";
import Taro from "@tarojs/taro";

const Setting = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  // 初始化状态
  const [salary, setSalary] = useState(settings.salary);
  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [workdays, setWorkdays] = useState(settings.workdays);
  const [inputType, setInputType] = useState('text');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartTimeChange = (selectedTime) => {
    const formattedTime = selectedTime.split(" ")[1];
    setStartTime(formattedTime);
    setShowStartPicker(false);
  };

  const handleEndTimeChange = (selectedTime) => {
    const formattedTime = selectedTime.split(" ")[1];
    setEndTime(formattedTime);
    setShowEndPicker(false);
  };

  const handleWorkdaysChange = (values) => {
    setWorkdays(values);
  };

  const handleSelectAll = () => {
    setWorkdays(["1", "2", "3", "4", "5", "6", "7"]);
  };

  const handleClearAll = () => {
    setWorkdays([]);
  };

  const handleSave = () => {
    const settings = { salary, startTime, endTime, workdays };
    try {
      // 保存所有设置到本地存储
      Taro.setStorageSync("mp-work-fish-settings", settings);
      // 更新Redux store
      dispatch(setSettings(settings));

      Taro.showToast({
        title: "设置保存成功",
        icon: "success",
        duration: 2000,
      });
    } catch (error) {
      Taro.showToast({
        title: "保存失败",
        icon: "error",
        duration: 2000,
      });
    }
  };

  return (
    <View className="setting-page">
      <Form>
        <Cell
          title="日薪 (元)"
          align="center"
          extra={
            <>
              <Input type={inputType} placeholder="请输入日薪" value={salary} onChange={(v)=>setSalary(v)}/>
              <View
                style={{
                  display: 'flex',
                  marginRight: 10,
                  alignItems: 'center',
                }}
                onClick={() => setInputType(inputType === 'text' ? 'password' : 'text')}
              >
                {inputType === 'text' ? (
                  <Eye color="var(--nutui-gray-7)" />
                ) : (
                  <Marshalling color="var(--nutui-gray-7)" />
                )}
              </View>
            </>
          }
        ></Cell>
        <Cell
          title="上班时间"
          align="center"
          extra={
            <Input
              type="text"
              value={startTime}
              onChange={handleStartTimeChange}
              placeholder="请输入上班时间"
            />
          }
          onClick={() => setShowStartPicker(true)}
        ></Cell>

        <DatePicker
          title="选择上班时间"
          type="hour-minutes"
          visible={showStartPicker}
          onClose={() => setShowStartPicker(false)}
          onConfirm={handleStartTimeChange}
          defaultValue={startTime}
        />

        <Cell
          title="下班时间"
          align="center"
          extra={
            <Input
              type="text"
              value={endTime}
              onChange={handleEndTimeChange}
              placeholder="请输入下班时间"
            />
          }
          onClick={() => setShowEndPicker(true)}
        ></Cell>

        <DatePicker
          title="选择下班时间"
          type="hour-minutes"
          visible={showEndPicker}
          onClose={() => setShowEndPicker(false)}
          onConfirm={handleEndTimeChange}
          defaultValue={endTime}
        />

        <Cell
          title="工作日设置"
          align="center"
          extra={
            <View className="workday-header">
              <View className="workday-actions">
                <Button
                  size="small"
                  type="primary"
                  onClick={handleSelectAll}
                  style={{ marginRight: "12px", background: "#1E88E5" }}
                >
                  全选
                </Button>
                <Button size="small" onClick={handleClearAll}>
                  清除
                </Button>
              </View>
            </View>
          }
        ></Cell>

        <CheckboxGroup value={workdays} onChange={handleWorkdaysChange}>
          <View className="workday-list">
            {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => (
              <Checkbox key={index + 1} value={String(index + 1)}>
                周{day}
              </Checkbox>
            ))}
          </View>
        </CheckboxGroup>

        <View style={{ margin: "20px" }}>
          <Button
            block
            type="primary"
            onClick={handleSave}
            style={{ background: "#1E88E5" }}
          >
            保存设置
          </Button>
        </View>
      </Form>
    </View>
  );
};

export default Setting;
