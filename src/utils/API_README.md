# 摸鱼记录API使用说明

本文档介绍了如何在项目中使用摸鱼记录API。

## API结构

- `api_client.js` - API客户端实现
- `api_config.js` - API配置（URL、超时时间等）
- `api_service.js` - API服务（单例模式）
- `api_types.ts` - API类型定义（TypeScript）

## 接口列表

1. **摸鱼记录接口**
   - `getTodayWorkFish` - 获取当天摸鱼记录
   - `addWorkFish` - 添加摸鱼记录
   - `updateWorkFish` - 更新摸鱼记录
   - `deleteWorkFish` - 删除摸鱼记录

2. **用户设置接口**
   - `getSettings` - 获取用户设置
   - `updateSettings` - 更新用户设置

## 快速使用

### 1. 使用API服务（推荐）

```javascript
import apiService from '../utils/api_service';

// 获取当天摸鱼记录
const fetchRecords = async (userId) => {
  try {
    const result = await apiService.getTodayWorkFish(userId);
    console.log('获取成功', result.data);
    return result.data;
  } catch (error) {
    console.error('获取失败', error);
    return [];
  }
};

// 添加摸鱼记录
const addRecord = async (params) => {
  try {
    const result = await apiService.addWorkFish(params);
    console.log('添加成功', result.data);
    return result.data;
  } catch (error) {
    console.error('添加失败', error);
    return null;
  }
};

// 更新摸鱼记录
const updateRecord = async (params) => {
  try {
    const result = await apiService.updateWorkFish(params);
    console.log('更新成功', result.data);
    return result.data;
  } catch (error) {
    console.error('更新失败', error);
    return null;
  }
};

// 删除摸鱼记录
const deleteRecord = async (id) => {
  try {
    const result = await apiService.deleteWorkFish(id);
    console.log('删除成功', result.data);
    return true;
  } catch (error) {
    console.error('删除失败', error);
    return false;
  }
};

// 获取用户设置
const getUserSettings = async (userId) => {
  try {
    const result = await apiService.getSettings(userId);
    console.log('获取设置成功', result.data);
    return result.data;
  } catch (error) {
    console.error('获取设置失败', error);
    return null;
  }
};

// 更新用户设置
const updateUserSettings = async (settingsData) => {
  try {
    const result = await apiService.updateSettings(settingsData);
    console.log('更新设置成功', result.data);
    return result.data;
  } catch (error) {
    console.error('更新设置失败', error);
    return null;
  }
};
```

### 2. 在Redux中使用

项目中已经集成了API与Redux的连接，可以直接使用以下异步action：

```javascript
// 摸鱼记录相关
import { 
  fetchTodayFishRecords, 
  addFishRecordAsync, 
  updateFishRecordAsync, 
  deleteFishRecordAsync 
} from '../../store/fishRecords';

// 设置相关
import {
  fetchSettings,
  updateSettingsAsync
} from '../../store/settings';

// 在组件中使用
import { useDispatch, useSelector } from 'react-redux';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector(state => state.fishRecords);
  const { settings, loading: settingsLoading, error: settingsError } = useSelector(state => state.settings);
  
  // 获取记录
  useEffect(() => {
    dispatch(fetchTodayFishRecords('your-user-id'));
  }, [dispatch]);
  
  // 获取设置
  useEffect(() => {
    dispatch(fetchSettings('your-user-id'));
  }, [dispatch]);
  
  // 添加记录
  const addRecord = () => {
    dispatch(addFishRecordAsync({
      userId: 'your-user-id',
      time: '14:30',
      duration: 30,
      content: '看视频摸鱼'
    }));
  };
  
  // 更新记录
  const updateRecord = (record) => {
    dispatch(updateFishRecordAsync({
      ...record,
      content: '更新后的内容'
    }));
  };
  
  // 删除记录
  const deleteRecord = (id) => {
    dispatch(deleteFishRecordAsync(id));
  };
  
  // 更新设置
  const updateSettings = () => {
    dispatch(updateSettingsAsync({
      userId: 'your-user-id',
      salary: 200,
      startTime: '09:00',
      endTime: '18:00',
      workdays: ['1', '2', '3', '4', '5']
    }));
  };
  
  return (
    <div>
      {/* 记录相关UI */}
      {loading && <p>加载记录中...</p>}
      {error && <p>记录错误: {error}</p>}
      <ul>
        {records.map(record => (
          <li key={record._id || record.id}>
            {record.time} - {record.content}
          </li>
        ))}
      </ul>
      
      {/* 设置相关UI */}
      {settingsLoading && <p>加载设置中...</p>}
      {settingsError && <p>设置错误: {settingsError}</p>}
      {settings && (
        <div>
          <p>日薪: {settings.salary}</p>
          <p>工作时间: {settings.startTime} - {settings.endTime}</p>
        </div>
      )}
    </div>
  );
};
```

## API配置

默认API配置位于`api_config.js`，可以根据环境设置不同的API URL：

```javascript
// 在开发中修改API配置
import apiConfig from '../utils/api_config';

// 覆盖默认配置
const customConfig = {
  ...apiConfig,
  BASE_URL: 'https://your-custom-api.com/api'
};

// 使用修改后的配置创建新的API客户端
import WorkFishApiClient from '../utils/api_client';
const customApiClient = new WorkFishApiClient(customConfig.BASE_URL);
```

## 错误处理

所有API调用都包含错误处理，失败时会抛出异常，请在使用时进行try/catch处理。

## 类型支持

如果使用TypeScript，可以导入类型定义：

```typescript
import { 
  WorkFishRecord, 
  AddWorkFishParams, 
  UpdateWorkFishParams,
  UserSettings,
  UpdateSettingsParams
} from '../utils/api_types';

// 使用类型 - 摸鱼记录
const record: WorkFishRecord = {
  _id: '123',
  userId: 'user1',
  date: '2023-04-06',
  time: '14:30',
  duration: 30,
  content: '看视频摸鱼',
  createdAt: new Date().toISOString()
};

// 使用类型 - 用户设置
const settings: UserSettings = {
  userId: 'user1',
  salary: 200,
  startTime: '09:00',
  endTime: '18:00',
  workdays: ['1', '2', '3', '4', '5']
};
``` 