/**
 * 摸鱼记录API客户端
 * 提供了对摸鱼记录API的便捷调用方法
 */
import Taro from '@tarojs/taro';

class WorkFishApiClient {
  /**
   * 创建API客户端实例
   * @param {string} baseUrl - API基础URL，默认为 http://localhost:27017/api
   */
  constructor(baseUrl = 'http://localhost:27017/api') {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  /**
   * 发送请求到API
   * @param {string} endpoint - API端点路径
   * @param {Object} data - 请求数据
   * @param {string} method - 请求方法，默认为POST
   * @returns {Promise<Object>} - 响应结果
   * @private
   */
  async _request(endpoint, data, method = 'POST') {
    try {
      const response = await Taro.request({
        url: `${this.baseUrl}${endpoint}`,
        method: method,
        header: this.headers,
        data: data
      });

      const result = response.data;
      
      // 如果请求不成功，抛出错误
      if (!result.success) {
        const error = new Error(result.message || '请求失败');
        error.response = result;
        throw error;
      }
      
      return result;
    } catch (error) {
      // 重新抛出错误，保留原始错误信息
      throw error;
    }
  }

  /**
   * 查询用户当天的摸鱼记录
   * @param {string} userId - 用户ID
   * @param {string} date - 日期，格式为YYYY-MM-DD，默认为今天
   * @returns {Promise<Object>} - 返回包含摸鱼记录列表的对象
   */
  async getTodayWorkFish(userId, date = this._getTodayDate()) {
    if (!userId) {
      throw new Error('缺少必要参数：userId');
    }

    return this._request('/get-today-work-fish', { userId, date });
  }

  /**
   * 添加新的摸鱼记录
   * @param {Object} params - 摸鱼记录参数
   * @param {string} params.userId - 用户ID
   * @param {string} params.date - 日期，格式为YYYY-MM-DD，默认为今天
   * @param {string} params.time - 摸鱼时间，格式为HH:MM
   * @param {number} params.duration - 持续时间，单位是分钟
   * @param {string} params.content - 摸鱼内容
   * @returns {Promise<Object>} - 返回新创建的摸鱼记录
   */
  async addWorkFish({ userId, date = this._getTodayDate(), time, duration, content }) {
    if (!userId || !time || !duration || !content) {
      throw new Error('缺少必要参数：userId, time, duration 或 content');
    }

    return this._request('/add-work-fish', {
      userId,
      date,
      time,
      duration,
      content
    });
  }

  /**
   * 更新摸鱼记录
   * @param {Object} params - 摸鱼记录参数
   * @param {string} params.id - 记录ID
   * @param {string} params.userId - 用户ID
   * @param {string} [params.date] - 日期，格式为YYYY-MM-DD
   * @param {string} [params.time] - 摸鱼时间，格式为HH:MM
   * @param {number} [params.duration] - 持续时间，单位是分钟
   * @param {string} [params.content] - 摸鱼内容
   * @returns {Promise<Object>} - 返回更新后的摸鱼记录
   */
  async updateWorkFish({ id, userId, date, time, duration, content }) {
    if (!id || !userId) {
      throw new Error('缺少必要参数：id或userId');
    }

    const updateData = { id, userId };
    
    // 仅包含要更新的字段
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (duration !== undefined) updateData.duration = duration;
    if (content) updateData.content = content;

    return this._request('/update-work-fish', updateData);
  }

  /**
   * 删除摸鱼记录
   * @param {string} id - 记录ID
   * @returns {Promise<Object>} - 返回删除操作的结果
   */
  async deleteWorkFish(id) {
    if (!id) {
      throw new Error('缺少必要参数：id');
    }

    return this._request('/del-work-fish', { id });
  }

  /**
   * 更新用户设置
   * @param {Object} params - 用户设置参数
   * @param {string} params.userId - 用户ID
   * @param {number} params.salary - 用户日薪
   * @param {string} params.startTime - 开始上班时间，格式为HH:MM
   * @param {string} params.endTime - 结束上班时间，格式为HH:MM
   * @param {string[]} params.workdays - 每周上班天数，0-6的数字字符串数组
   * @returns {Promise<Object>} - 返回更新后的用户设置
   */
  async updateSettings({ userId, salary, startTime, endTime, workdays }) {
    if (!userId || salary === undefined || !startTime || !endTime || !workdays) {
      throw new Error('缺少必要参数：userId, salary, startTime, endTime 或 workdays');
    }

    // 验证时间格式
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new Error('时间格式不正确，应为 HH:MM');
    }

    // 验证工作日格式
    if (!Array.isArray(workdays) || workdays.length === 0 || !workdays.every(day => /^[0-6]$/.test(day))) {
      throw new Error('工作日格式不正确，应为包含0-6数字的数组');
    }

    return this._request('/update/settings', {
      userId,
      salary,
      startTime,
      endTime,
      workdays
    });
  }

  /**
   * 获取用户设置
   * @param {string} userId - 用户ID
   * @returns {Promise<Object>} - 返回用户设置
   */
  async getSettings(userId) {
    if (!userId) {
      throw new Error('缺少必要参数：userId');
    }

    return this._request('/settings', { userId }, 'GET');
  }

  /**
   * 获取当前日期，格式为YYYY-MM-DD
   * @returns {string} - 当前日期字符串
   * @private
   */
  _getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }
}

// 导出API客户端类
export default WorkFishApiClient; 