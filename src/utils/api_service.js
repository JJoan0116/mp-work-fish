/**
 * API服务
 * 提供API客户端单例实例，可在应用中任何地方使用
 */
import WorkFishApiClient from './api_client';
import apiConfig from './api_config';

// 创建API客户端单例实例
const apiClient = new WorkFishApiClient(apiConfig.BASE_URL);

/**
 * 获取当天摸鱼记录
 * @param {string} userId - 用户ID
 * @param {string} [date] - 日期，格式为YYYY-MM-DD，默认为今天
 * @returns {Promise<Object>} - 返回包含摸鱼记录列表的对象
 */
export const getTodayWorkFish = (userId, date) => {
  return apiClient.getTodayWorkFish(userId, date);
};

/**
 * 添加新的摸鱼记录
 * @param {Object} params - 摸鱼记录参数
 * @returns {Promise<Object>} - 返回新创建的摸鱼记录
 */
export const addWorkFish = (params) => {
  return apiClient.addWorkFish(params);
};

/**
 * 更新摸鱼记录
 * @param {Object} params - 摸鱼记录参数
 * @returns {Promise<Object>} - 返回更新后的摸鱼记录
 */
export const updateWorkFish = (params) => {
  return apiClient.updateWorkFish(params);
};

/**
 * 删除摸鱼记录
 * @param {string} id - 记录ID
 * @returns {Promise<Object>} - 返回删除操作的结果
 */
export const deleteWorkFish = (id) => {
  return apiClient.deleteWorkFish(id);
};

/**
 * 更新用户设置
 * @param {Object} params - 用户设置参数
 * @returns {Promise<Object>} - 返回更新后的用户设置
 */
export const updateSettings = (params) => {
  return apiClient.updateSettings(params);
};

/**
 * 获取用户设置
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} - 返回用户设置
 */
export const getSettings = (userId) => {
  return apiClient.getSettings(userId);
};

// 导出默认的API服务对象
export default {
  getTodayWorkFish,
  addWorkFish,
  updateWorkFish,
  deleteWorkFish,
  updateSettings,
  getSettings
}; 