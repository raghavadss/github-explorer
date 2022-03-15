import { combineReducers } from "redux";
import userListReducer from "./userListReducer";
import userProfileReducer from "./userProfileReducer";
import searchTermReducer from "./searchTermReducer";

export default combineReducers({
  userList: userListReducer,
  userProfile: userProfileReducer,
  searchTerm: searchTermReducer,
});
