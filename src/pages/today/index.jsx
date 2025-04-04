import React, { useState, useEffect } from "react";
import { View, Text, Picker } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { Dialog, TextArea, Button, InputNumber } from "@nutui/nutui-react-taro";
import { Eye, Marshalling } from '@nutui/icons-react-taro'
import {
  addFishRecord,
  updateFishRecord,
  deleteFishRecord,
} from "../../store/fishRecords";
import "./index.scss";

const Today = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const fishRecords = useSelector((state) => state.fishRecords);

  // 控制薪资显示状态
  const [showFishSalary, setShowFishSalary] = useState(true);
  const [showTotalSalary, setShowTotalSalary] = useState(true);

  // 状态管理
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [todayFishSalary, setTodayFishSalary] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    time: "",
    duration: 0,
    content: "",
  });

  // 计算今日摸鱼薪资
  useEffect(() => {
    // 检查今天是否是工作日
    const today = dayjs().day();
    const isWorkday = settings.workdays.includes(today.toString());

    if (!isWorkday) {
      setTodayFishSalary(0);
      return;
    }

    // 解析开始和结束时间
    const startTimeParts = settings.startTime.split(":");
    const endTimeParts = settings.endTime.split(":");

    const startTime = dayjs()
      .hour(parseInt(startTimeParts[0]))
      .minute(parseInt(startTimeParts[1]))
      .second(0);

    const endTime = dayjs()
      .hour(parseInt(endTimeParts[0]))
      .minute(parseInt(endTimeParts[1]))
      .second(0);

    // 计算工作总时长（分钟）
    const totalWorkMinutes = endTime.diff(startTime, "minute");

    // 计算摸鱼总时长
    const totalFishMinutes = fishRecords.reduce(
      (total, record) => total + record.duration,
      0
    );

    // 计算摸鱼薪资
    const fishSalary = Math.min(
      Math.floor((totalFishMinutes / totalWorkMinutes) * parseInt(settings.salary)),
      parseInt(settings.salary)
    );
    setTodayFishSalary(fishSalary);
  }, [fishRecords, settings]);

  // 倒计时效果
  useEffect(() => {
    // 检查今天是否是工作日
    const today = dayjs().day(); // 0是周日，1-6是周一到周六
    const isWorkday = settings.workdays.includes(today.toString());

    // 如果不是工作日，直接设置为已下班状态
    if (!isWorkday) {
      setCountdown({ hours: 0, minutes: 0, seconds: 0 });
      setProgress(100);
      return;
    }

    // 解析开始和结束时间
    const startTimeParts = settings.startTime.split(":");
    const endTimeParts = settings.endTime.split(":");

    const startTime = dayjs()
      .hour(parseInt(startTimeParts[0]))
      .minute(parseInt(startTimeParts[1]))
      .second(0);

    const endTime = dayjs()
      .hour(parseInt(endTimeParts[0]))
      .minute(parseInt(endTimeParts[1]))
      .second(0);

    // 计算工作总时长（秒）
    const totalWorkSeconds = endTime.diff(startTime, "second");

    const timer = setInterval(() => {
      const now = dayjs();

      // 如果当前时间在下班时间之后，显示已下班
      if (now.isAfter(endTime)) {
        clearInterval(timer);
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
        return;
      }

      // 如果当前时间在上班时间之前，显示全天工作时间
      if (now.isBefore(startTime)) {
        const diff = endTime.diff(startTime, "second");
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        setCountdown({ hours, minutes, seconds });
        setProgress(0);
        return;
      }

      // 计算剩余时间
      const remainingSeconds = endTime.diff(now, "second");
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      // 计算进度
      const elapsedSeconds = now.diff(startTime, "second");
      const newProgress = Math.floor((elapsedSeconds / totalWorkSeconds) * 100);

      setCountdown({ hours, minutes, seconds });
      setProgress(Math.min(newProgress, 100));
    }, 1000);

    return () => clearInterval(timer);
  }, [settings]);

  // 格式化时间显示
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // 添加摸鱼记录
  const addFishRecordFunc = () => {
    setEditingRecord(null);
    setFormData({
      time: dayjs().format("HH:mm"),
      duration: 0,
      content: "",
    });
    setShowModal(true);
  };

  // 编辑摸鱼记录
  const editFishRecord = (id) => {
    const record = fishRecords.find((r) => r.id === id);
    if (record) {
      setEditingRecord(record);
      setFormData({
        time: record.time,
        duration: record.duration,
        content: record.content,
      });
      setShowModal(true);
    }
  };

  // 保存摸鱼记录
  const handleSave = () => {
    if (!formData.time || !formData.duration || !formData.content) {
      Taro.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }

    if (editingRecord) {
      // 编辑模式
      dispatch(updateFishRecord({ ...editingRecord, ...formData }));
    } else {
      // 新增模式
      const newRecord = {
        id: Date.now(),
        ...formData,
      };
      dispatch(addFishRecord(newRecord));
    }

    setShowModal(false);
    Taro.showToast({
      title: editingRecord ? "编辑成功" : "添加成功",
      icon: "success",
    });
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 删除摸鱼记录
  const handleDelete = (id) => {
    Taro.showModal({
      title: "确认删除",
      content: "确定要删除这条摸鱼记录吗？",
      success: function (res) {
        if (res.confirm) {
          dispatch(deleteFishRecord(id));
          Taro.showToast({
            title: "删除成功",
            icon: "success",
          });
        }
      },
    });
  };

  return (
    <View className="today-container">
      {/* 倒计时卡片 */}
      <View className="countdown-card">
        {/* 动效元素 */}
        <View
          className="confetti"
          style={{ left: "10%", animationDelay: "0.5s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "25%", animationDelay: "1.2s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "40%", animationDelay: "0.8s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "55%", animationDelay: "1.5s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "70%", animationDelay: "0.7s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "85%", animationDelay: "1.3s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "15%", animationDelay: "1.0s" }}
        ></View>
        <View
          className="confetti"
          style={{ left: "60%", animationDelay: "0.9s" }}
        ></View>
        <Text className="countdown-title">
          {countdown.hours === 0 &&
            countdown.minutes === 0 &&
            countdown.seconds === 0
            ? "恭喜下班"
            : "距离下班还有"}
        </Text>
        <Text className="time-display">
          {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:
          {formatTime(countdown.seconds)}
        </Text>
        <View className="progress-bar">
          <View className="progress" style={{ width: `${progress}%` }}></View>
        </View>
        <Text className="progress-text">已完成今日 {progress}%</Text>
      </View>

      {/* 薪资信息 */}
      <View className="salary-info">
        <View className="salary-item">
          <View className="salary-label">
            <Text>今日摸鱼薪资</Text>
            {showFishSalary ? (
              <Eye color="var(--nutui-gray-7)" onClick={() => setShowFishSalary(!showFishSalary)} />
            ) : (
              <Marshalling color="var(--nutui-gray-7)" onClick={() => setShowFishSalary(!showFishSalary)} />
            )}
          </View>
          <Text className="salary-value">
            ¥{showFishSalary ? todayFishSalary : "***"}
          </Text>
        </View>
        <View className="salary-item">
          <View className="salary-label">
            <Text>今日总薪资</Text>
            {showTotalSalary ? (
              <Eye color="var(--nutui-gray-7)" onClick={() => setShowTotalSalary(!showTotalSalary)} />
            ) : (
              <Marshalling color="var(--nutui-gray-7)" onClick={() => setShowTotalSalary(!showTotalSalary)} />
            )}
          </View>
          <Text className="salary-value total">
            ¥{showTotalSalary ? (settings.workdays.includes(dayjs().day().toString()) ? settings.salary : 0) : "***"}
          </Text>
        </View>
      </View>

      {/* 摸鱼记录区域 */}
      <View className="fish-records">
        <View className="records-header">
          <View className="records-title">
            <View className="iconfont icon-touch-fish icon-fish"></View>
            <Text>今日摸鱼记录</Text>
          </View>
          <View className="add-record" onClick={addFishRecordFunc}>
            <Text className="icon">+</Text>
            <Text>添加记录</Text>
          </View>
        </View>

        {/* 摸鱼记录列表 */}
        <View className="record-list">
          {fishRecords.length === 0 ? (
            <View className="empty-state" style={{ color: "#666" }}>
              <Text style={{ fontSize: 16 }}>
                你今天工作太努力啦，快来摸鱼吧~
              </Text>
              <View className="iconfont icon-keaisuopingtubiao_moyuzhu"></View>
            </View>
          ) : (
            <>
              {fishRecords.map((record) => (
                <View className="record-item" key={record.id}>
                  <View className="record-header">
                    <Text className="record-time">{record.time}</Text>
                    <Text className="record-duration">
                      {record.duration} 分钟
                    </Text>
                  </View>
                  <View className="record-content-wrapper">
                    <Text className="record-content">{record.content}</Text>
                    <View className="record-actions">
                      <Text
                        className="edit-btn"
                        onClick={() => editFishRecord(record.id)}
                      >
                        编辑
                      </Text>
                      <Text
                        className="delete-btn"
                        onClick={() => handleDelete(record.id)}
                      >
                        删除
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </View>

      {/* 添加/编辑摸鱼记录弹窗 */}
      <Dialog
        title={editingRecord ? "编辑摸鱼记录" : "添加摸鱼记录"}
        visible={showModal}
        onClose={() => setShowModal(false)}
        closeOnOverlayClick
        footer={
          <View className="modal-footer">
            <Button size="small" onClick={() => setShowModal(false)}>
              取消
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={handleSave}
              style={{ background: "#1E88E5" }}
            >
              确定
            </Button>
          </View>
        }
      >
        <View className="modal-content">
          <View className="form-item">
            <Text className="form-label">摸鱼时间</Text>
            <Picker
              name="time"
              mode="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.detail.value)}
            >
              <View className="picker-value">
                {formData.time || "请选择时间"}
              </View>
            </Picker>
          </View>

          <View className="form-item">
            <Text className="form-label">摸鱼时长(分钟)</Text>
            <View>
              <InputNumber
                digits={0}
                min={0}
                max={dayjs(`2000-01-01 ${settings.endTime}`).diff(dayjs(`2000-01-01 ${settings.startTime}`), "minute")}
                step={1}
                value={formData.duration}
                onChange={(value) =>
                  handleInputChange("duration", parseInt(value))
                }
                style={{ width: 120 }}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">摸鱼内容</Text>
            <TextArea
              value={formData.content}
              onChange={(value) => handleInputChange("content", value)}
              maxLength={200}
              placeholder="记录一下摸鱼内容..."
              autoSize={{ minHeight: 80 }}
            />
          </View>
        </View>
      </Dialog>
    </View>
  );
};

export default Today;
