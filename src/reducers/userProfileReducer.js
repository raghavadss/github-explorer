import * as Types from "../actions/types";

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };

    case Types.FETCH_USER_REPOS:
      return {
        ...state,
        repos: action.payload.list,
        userRepoSearchedTerm: action.payload.searchedTerm,
      };

    case Types.UPDATE_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case Types.CLEAR_SELECTED_USER:
      return {
        ...state,
        user: null,
        repos: null,
        selectedUser: null,
        userRepoSearchedTerm: null,
      };

    default:
      return state;
  }
};

export default userProfileReducer;
