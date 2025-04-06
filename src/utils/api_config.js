/**
 * API配置文件
 */

// API基础URL，根据环境不同可以设置不同的值
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.workfish.example.com/api' // 生产环境URL，需要替换为实际的生产环境API URL
  : 'http://localhost:27017/api'; // 开发环境URL

// API超时时间设置（毫秒）
const API_TIMEOUT = 10000;

// 用户默认ID
const DEFAULT_USER_ID = 'default';

// 导出配置
export default {
  BASE_URL: API_BASE_URL,
  TIMEOUT: API_TIMEOUT,
  DEFAULT_USER_ID
}; 