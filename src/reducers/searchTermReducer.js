import * as Types from "../actions/types";

const searchTermReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.UPDATE_SEARCH_TERM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default searchTermReducer;
