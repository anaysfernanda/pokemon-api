import { combineReducers } from "@reduxjs/toolkit";

import tasks from "./TaskSlice";
import pokemon from "./PokemonSlice";

export default combineReducers({
  tasks,
  pokemon,
});
