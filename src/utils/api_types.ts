/**
 * 摸鱼记录API类型定义文件
 */

/**
 * 摸鱼记录对象
 */
export interface WorkFishRecord {
  /** 记录唯一标识符 */
  _id: string;
  /** 用户ID */
  userId: string;
  /** 日期，格式为 YYYY-MM-DD */
  date: string;
  /** 摸鱼时间，格式为 HH:MM */
  time: string;
  /** 持续时间，单位是分钟 */
  duration: number;
  /** 摸鱼内容描述 */
  content: string;
  /** 记录创建时间，ISO格式 */
  createdAt: string;
}

/**
 * API响应基础接口
 */
export interface ApiResponse {
  /** 请求是否成功 */
  success: boolean;
  /** 响应消息 */
  message?: string;
}

/**
 * 查询摸鱼记录的响应
 */
export interface GetWorkFishResponse extends ApiResponse {
  /** 摸鱼记录列表 */
  data: WorkFishRecord[];
  /** 记录数量 */
  count: number;
}

/**
 * 添加/更新/删除摸鱼记录的响应
 */
export interface WorkFishActionResponse extends ApiResponse {
  /** 操作的摸鱼记录 */
  data: WorkFishRecord;
}

/**
 * 查询摸鱼记录的请求参数
 */
export interface GetWorkFishParams {
  /** 用户ID */
  userId: string;
  /** 日期，格式为 YYYY-MM-DD */
  date: string;
}

/**
 * 添加摸鱼记录的请求参数
 */
export interface AddWorkFishParams {
  /** 用户ID */
  userId: string;
  /** 日期，格式为 YYYY-MM-DD，默认为今天 */
  date?: string;
  /** 摸鱼时间，格式为 HH:MM */
  time: string;
  /** 持续时间，单位是分钟 */
  duration: number;
  /** 摸鱼内容描述 */
  content: string;
}

/**
 * 更新摸鱼记录的请求参数
 */
export interface UpdateWorkFishParams {
  /** 记录ID */
  id: string;
  /** 用户ID */
  userId: string;
  /** 日期，格式为 YYYY-MM-DD */
  date?: string;
  /** 摸鱼时间，格式为 HH:MM */
  time?: string;
  /** 持续时间，单位是分钟 */
  duration?: number;
  /** 摸鱼内容描述 */
  content?: string;
}

/**
 * 删除摸鱼记录的请求参数
 */
export interface DeleteWorkFishParams {
  /** 记录ID */
  id: string;
}

/**
 * 用户设置对象
 */
export interface UserSettings {
  /** 用户ID */
  userId: string;
  /** 用户日薪 */
  salary: number;
  /** 开始上班时间，格式为HH:MM */
  startTime: string;
  /** 结束上班时间，格式为HH:MM */
  endTime: string;
  /** 每周上班天数，0-6的数字字符串数组 */
  workdays: string[];
}

/**
 * 更新用户设置的请求参数
 */
export interface UpdateSettingsParams {
  /** 用户ID */
  userId: string;
  /** 用户日薪 */
  salary: number;
  /** 开始上班时间，格式为HH:MM */
  startTime: string;
  /** 结束上班时间，格式为HH:MM */
  endTime: string;
  /** 每周上班天数，0-6的数字字符串数组 */
  workdays: string[];
}

/**
 * 获取用户设置的请求参数
 */
export interface GetSettingsParams {
  /** 用户ID */
  userId: string;
}

/**
 * 用户设置操作的响应
 */
export interface SettingsActionResponse extends ApiResponse {
  /** 操作的用户设置 */
  data: UserSettings;
}

/**
 * 摸鱼记录API客户端接口
 */
export interface WorkFishApiClientInterface {
  /**
   * 查询用户当天的摸鱼记录
   * @param userId - 用户ID
   * @param date - 日期，格式为YYYY-MM-DD，默认为今天
   */
  getTodayWorkFish(userId: string, date?: string): Promise<GetWorkFishResponse>;

  /**
   * 添加新的摸鱼记录
   * @param params - 摸鱼记录参数
   */
  addWorkFish(params: AddWorkFishParams): Promise<WorkFishActionResponse>;

  /**
   * 更新摸鱼记录
   * @param params - 摸鱼记录参数
   */
  updateWorkFish(params: UpdateWorkFishParams): Promise<WorkFishActionResponse>;

  /**
   * 删除摸鱼记录
   * @param id - 记录ID
   */
  deleteWorkFish(id: string): Promise<WorkFishActionResponse>;

  /**
   * 更新用户设置
   * @param params - 用户设置参数
   */
  updateSettings(params: UpdateSettingsParams): Promise<SettingsActionResponse>;

  /**
   * 获取用户设置
   * @param userId - 用户ID
   */
  getSettings(userId: string): Promise<SettingsActionResponse>;
} 