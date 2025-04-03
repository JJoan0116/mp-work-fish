import Taro from "@tarojs/taro";

// Action Types
const ADD_FISH_RECORD = "fishRecords/ADD_FISH_RECORD";
const UPDATE_FISH_RECORD = "fishRecords/UPDATE_FISH_RECORD";
const DELETE_FISH_RECORD = "fishRecords/DELETE_FISH_RECORD";
const SET_FISH_RECORDS = "fishRecords/SET_FISH_RECORDS";

// Initial State
let initialState = [];
try {
  const storedRecords = Taro.getStorageSync("mp-work-fish-records");
  if (storedRecords) {
    // 获取今日零点时间戳
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    // 筛选今日数据
    const todayRecords = storedRecords.filter(
      (record) => record.id >= todayTimestamp
    );

    // 如果筛选后的数据量与原数据不同，说明有历史数据需要清理
    if (todayRecords.length !== storedRecords.length) {
      Taro.setStorageSync("mp-work-fish-records", todayRecords);
    }

    initialState = todayRecords;
  }
} catch (error) {
  console.error("Failed to load fish records:", error);
}

// Action Creators
export const addFishRecord = (record) => ({
  type: ADD_FISH_RECORD,
  payload: record,
});

export const updateFishRecord = (record) => ({
  type: UPDATE_FISH_RECORD,
  payload: record,
});

export const deleteFishRecord = (id) => ({
  type: DELETE_FISH_RECORD,
  payload: id,
});

export const setFishRecords = (records) => ({
  type: SET_FISH_RECORDS,
  payload: records,
});

// Reducer
const fishRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FISH_RECORD:
      const newState = [action.payload, ...state];
      Taro.setStorageSync("mp-work-fish-records", newState);
      return newState;

    case UPDATE_FISH_RECORD:
      const updatedState = state.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
      Taro.setStorageSync("mp-work-fish-records", updatedState);
      return updatedState;

    case DELETE_FISH_RECORD:
      const filteredState = state.filter(
        (record) => record.id !== action.payload
      );
      Taro.setStorageSync("mp-work-fish-records", filteredState);
      return filteredState;

    case SET_FISH_RECORDS:
      Taro.setStorageSync("mp-work-fish-records", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default fishRecordsReducer;
