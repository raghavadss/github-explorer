import _ from "lodash";
import githubAPI from "../api/githubAPI";
import * as Types from "./types";

export const searchUsers = (searchTerm) => async (dispatch) => {
  if (!searchTerm) dispatch({ type: Types.SEARCH_USERS, payload: [] });
  else {
    const response = await githubAPI.get("/search/users", {
      params: {
        q: searchTerm,
      },
    });

    dispatch({
      type: Types.SEARCH_USERS,
      payload: { list: response.data.items, searchedTerm: searchTerm },
    });
  }
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await githubAPI.get(`/users/${id}`);

  dispatch({ type: Types.FETCH_USER, payload: response.data });
};

export const updateSearchTerm = (term) => (dispatch) => {
  dispatch({ type: Types.UPDATE_SEARCH_TERM, payload: term });
};

export const updateSelectedUser = (user) => (dispatch) => {
  dispatch({ type: Types.UPDATE_SELECTED_USER, payload: user });
};

export const searchUserRepos = (id, searchTerm) => async (dispatch) => {
  const response = await githubAPI.get("/search/repositories", {
    params: {
      q: `${searchTerm ? `${searchTerm} in:name ` : ""}user:${id}`,
    },
  });

  dispatch({
    type: Types.FETCH_USER_REPOS,
    payload: response.data.items,
  });
};
