// Action Types
const SET_SETTINGS = "settings/SET_SETTINGS";

// Initial State
const initialState = {
  salary: "500",
  startTime: "09:00",
  endTime: "18:00",
  workdays: ["1", "2", "3", "4", "5"],
};

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
