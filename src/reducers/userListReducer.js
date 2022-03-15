import * as Types from "../actions/types";

const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.SEARCH_USERS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default userListReducer;
