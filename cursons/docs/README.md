# 摸鱼记录API文档

欢迎使用摸鱼记录API！本文档旨在帮助前端开发人员集成和使用摸鱼记录后端服务。

## 文档索引

- [API接口参考文档](api_reference.md) - 详细的API接口说明文档，包含所有接口的参数、返回值和示例
- [API接口JSON描述](api_reference.json) - 接口的JSON格式描述，可导入到接口管理工具中
- [API客户端封装](api_client.js) - 封装好的JavaScript客户端，可直接在前端项目中使用
- [TypeScript类型定义](api_types.ts) - TypeScript类型定义，为使用TypeScript的项目提供类型支持

## 快速入门

### 1. 集成API客户端

**使用ES模块引入：**

```javascript
import WorkFishApiClient from './api_client.js';

// 创建API客户端实例
const api = new WorkFishApiClient();
```

**使用TypeScript：**

```typescript
import WorkFishApiClient from './api_client.js';
import { WorkFishRecord, GetWorkFishResponse } from './api_types';

// 创建API客户端实例
const api = new WorkFishApiClient();
```

### 2. 基本用法

**查询当天摸鱼记录：**

```javascript
// 查询指定用户当天的摸鱼记录
async function fetchTodayRecords(userId) {
  try {
    const result = await api.getTodayWorkFish(userId);
    console.log(`获取到${result.count}条记录`);
    return result.data;
  } catch (error) {
    console.error('查询失败:', error.message);
    return [];
  }
}
```

**添加摸鱼记录：**

```javascript
// 添加新的摸鱼记录
async function addNewRecord(params) {
  try {
    const result = await api.addWorkFish({
      userId: params.userId,
      time: params.time,
      duration: params.duration,
      content: params.content
    });
    console.log('添加成功:', result.data);
    return result.data;
  } catch (error) {
    console.error('添加失败:', error.message);
    throw error;
  }
}
```

**更新摸鱼记录：**

```javascript
// 更新摸鱼记录
async function updateRecord(id, userId, updates) {
  try {
    const result = await api.updateWorkFish({
      id,
      userId,
      ...updates
    });
    console.log('更新成功:', result.data);
    return result.data;
  } catch (error) {
    console.error('更新失败:', error.message);
    throw error;
  }
}
```

**删除摸鱼记录：**

```javascript
// 删除摸鱼记录
async function deleteRecord(id) {
  try {
    const result = await api.deleteWorkFish(id);
    console.log('删除成功:', result.data);
    return true;
  } catch (error) {
    console.error('删除失败:', error.message);
    return false;
  }
}
```

## 注意事项

1. API服务器默认运行在 `http://localhost:27017/api`，如需修改，请在创建客户端实例时传入新的URL
2. 所有请求均使用POST方法，请求体为JSON格式
3. 所有响应均为JSON格式，包含success字段表示请求是否成功
4. 日期格式统一为YYYY-MM-DD，时间格式统一为HH:MM

## 联系与支持

如有任何问题或建议，请联系后端开发团队。 