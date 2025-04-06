# 摸鱼记录 API 接口文档

## 基本信息

- **基础URL**: `http://localhost:27017/api`
- **请求格式**: 所有请求均使用 `POST` 方法，请求体为 JSON 格式
- **响应格式**: 所有响应均为 JSON 格式，包含 `success` 字段表示请求是否成功
- **状态码**:
  - `200`: 请求成功
  - `201`: 创建成功
  - `400`: 请求参数错误
  - `404`: 资源不存在
  - `500`: 服务器内部错误

## 接口列表

### 1. 查询今天记录的摸鱼事件

获取指定用户在指定日期的摸鱼记录列表。

- **接口路径**: `/get-today-work-fish`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| userId | string | 是 | 用户ID |
| date | string | 是 | 日期，格式为 YYYY-MM-DD |

- **请求示例**:
```json
{
  "userId": "user123",
  "date": "2023-11-20"
}
```

- **响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "userId": "user123",
      "date": "2023-11-20",
      "time": "10:30",
      "duration": 15,
      "content": "刷抖音",
      "createdAt": "2023-11-20T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e2",
      "userId": "user123",
      "date": "2023-11-20",
      "time": "14:45",
      "duration": 30,
      "content": "看B站视频",
      "createdAt": "2023-11-20T14:45:00.000Z"
    }
  ],
  "count": 2
}
```

- **错误响应**:
```json
{
  "success": false,
  "message": "缺少必要参数：userId或date"
}
```

### 2. 添加新的摸鱼记录

创建一条新的摸鱼记录。

- **接口路径**: `/add-work-fish`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| userId | string | 是 | 用户ID |
| date | string | 是 | 日期，格式为 YYYY-MM-DD |
| time | string | 是 | 摸鱼时间，格式为 HH:MM |
| duration | number | 是 | 持续时间，单位是分钟 |
| content | string | 是 | 摸鱼内容描述 |

- **请求示例**:
```json
{
  "userId": "user123",
  "date": "2023-11-20",
  "time": "15:30",
  "duration": 20,
  "content": "玩手机游戏"
}
```

- **响应示例**:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e3",
    "userId": "user123",
    "date": "2023-11-20",
    "time": "15:30",
    "duration": 20,
    "content": "玩手机游戏",
    "createdAt": "2023-11-20T15:30:00.000Z"
  },
  "message": "摸鱼记录添加成功"
}
```

- **错误响应**:
```json
{
  "success": false,
  "message": "缺少必要参数"
}
```

### 3. 更新摸鱼记录

根据记录ID更新摸鱼记录的内容。

- **接口路径**: `/update-work-fish`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| id | string | 是 | 记录ID |
| userId | string | 是 | 用户ID |
| date | string | 否 | 日期，格式为 YYYY-MM-DD |
| time | string | 否 | 摸鱼时间，格式为 HH:MM |
| duration | number | 否 | 持续时间，单位是分钟 |
| content | string | 否 | 摸鱼内容描述 |

- **请求示例**:
```json
{
  "id": "65a1b2c3d4e5f6a7b8c9d0e3",
  "userId": "user123",
  "date": "2023-11-20",
  "time": "15:45",
  "duration": 25,
  "content": "玩手机游戏并看视频"
}
```

- **响应示例**:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e3",
    "userId": "user123",
    "date": "2023-11-20",
    "time": "15:45",
    "duration": 25,
    "content": "玩手机游戏并看视频",
    "createdAt": "2023-11-20T15:30:00.000Z"
  },
  "message": "摸鱼记录更新成功"
}
```

- **错误响应**:
```json
{
  "success": false,
  "message": "缺少必要参数：id或userId"
}
```

或

```json
{
  "success": false,
  "message": "找不到指定的摸鱼记录"
}
```

### 4. 删除摸鱼记录

根据记录ID删除摸鱼记录。

- **接口路径**: `/del-work-fish`
- **请求方法**: `POST`
- **请求参数**:

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| id | string | 是 | 记录ID |

- **请求示例**:
```json
{
  "id": "65a1b2c3d4e5f6a7b8c9d0e3"
}
```

- **响应示例**:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e3",
    "userId": "user123",
    "date": "2023-11-20",
    "time": "15:45",
    "duration": 25,
    "content": "玩手机游戏并看视频",
    "createdAt": "2023-11-20T15:30:00.000Z"
  },
  "message": "摸鱼记录删除成功"
}
```

- **错误响应**:
```json
{
  "success": false,
  "message": "缺少必要参数：id"
}
```

或

```json
{
  "success": false,
  "message": "找不到指定的摸鱼记录"
}
```

## 数据结构

### 摸鱼记录对象

| 字段名 | 类型 | 描述 |
|-------|------|------|
| _id | string | 记录唯一标识符 |
| userId | string | 用户ID |
| date | string | 日期，格式为 YYYY-MM-DD |
| time | string | 摸鱼时间，格式为 HH:MM |
| duration | number | 持续时间，单位是分钟 |
| content | string | 摸鱼内容描述 |
| createdAt | string | 记录创建时间，ISO格式 |

## 错误码说明

| 状态码 | 错误类型 | 说明 |
|-------|---------|------|
| 400 | 参数错误 | 缺少必要参数或参数格式错误 |
| 404 | 资源不存在 | 指定的记录不存在 |
| 500 | 服务器错误 | 服务器内部处理错误 |

## 调用示例

### 使用 fetch API (JavaScript)

```javascript
// 添加摸鱼记录
async function addWorkFish() {
  const data = {
    userId: 'user123',
    date: '2023-11-20',
    time: '14:30',
    duration: 30,
    content: '摸鱼内容'
  };

  try {
    const response = await fetch('http://localhost:27017/api/add-work-fish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('添加结果:', result);
    
    if (result.success) {
      // 添加成功，记录ID: result.data._id
    } else {
      // 添加失败，错误信息: result.message
    }
  } catch (error) {
    console.error('请求出错:', error);
  }
}

// 查询当天摸鱼记录
async function getTodayWorkFish() {
  const data = {
    userId: 'user123',
    date: '2023-11-20'
  };

  try {
    const response = await fetch('http://localhost:27017/api/get-today-work-fish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('查询结果:', result);
    
    if (result.success) {
      // 查询成功，记录列表: result.data
      // 记录数量: result.count
    } else {
      // 查询失败，错误信息: result.message
    }
  } catch (error) {
    console.error('请求出错:', error);
  }
}
```

### 使用 axios (JavaScript)

```javascript
import axios from 'axios';

// 配置基础URL
const api = axios.create({
  baseURL: 'http://localhost:27017/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 添加摸鱼记录
async function addWorkFish() {
  const data = {
    userId: 'user123',
    date: '2023-11-20',
    time: '14:30',
    duration: 30,
    content: '摸鱼内容'
  };

  try {
    const response = await api.post('/add-work-fish', data);
    console.log('添加结果:', response.data);
    
    if (response.data.success) {
      // 添加成功，记录ID: response.data.data._id
    } else {
      // 添加失败，错误信息: response.data.message
    }
  } catch (error) {
    console.error('请求出错:', error.response ? error.response.data : error.message);
  }
}

// 查询当天摸鱼记录
async function getTodayWorkFish() {
  const data = {
    userId: 'user123',
    date: '2023-11-20'
  };

  try {
    const response = await api.post('/get-today-work-fish', data);
    console.log('查询结果:', response.data);
    
    if (response.data.success) {
      // 查询成功，记录列表: response.data.data
      // 记录数量: response.data.count
    } else {
      // 查询失败，错误信息: response.data.message
    }
  } catch (error) {
    console.error('请求出错:', error.response ? error.response.data : error.message);
  }
}
``` 