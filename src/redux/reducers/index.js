import { combineReducers } from "redux";

const reducers = ["messages", "dialogs", "user", "attachments", "profileReducer"];

export default combineReducers(
  reducers.reduce((initial, name) => {
    initial[name] = require(`./${name}`).default;
    return initial;
  }, {})
);
