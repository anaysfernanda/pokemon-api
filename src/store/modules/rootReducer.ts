import { combineReducers } from "@reduxjs/toolkit";

import tasks from "./TaskSlice";

export default combineReducers({
  tasks,
});
