import Taro from "@tarojs/taro";

// Action Types
const SET_SETTINGS = "settings/SET_SETTINGS";

// Initial State
const defaultState = {
  salary: "200",
  startTime: "09:00",
  endTime: "18:00",
  workdays: ["1", "2", "3", "4", "5"],
};

let initialState = defaultState;
try {
  const storedSettings = Taro.getStorageSync("mp-work-fish-settings");
  if (storedSettings) {
    console.log("storedSettings", storedSettings, typeof storedSettings);
    initialState = storedSettings || defaultState;
  }
} catch (error) {
  console.error("Failed to parse settings:", error);
}

// Action Creators
export const setSettings = (settings) => ({
  type: SET_SETTINGS,
  payload: settings,
});

// Reducer
export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
