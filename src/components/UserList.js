import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import { searchUsers, updateSelectedUser } from "../actions";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = (props) => {
  useEffect(() => {
    if (props.searchedTerm !== props.userSearchTerm)
      props.searchUsers(props.userSearchTerm);
  }, [props.userSearchTerm]);

  const handleOnClick = (user) => {
    props.updateSelectedUser(user.login);
  };

  const renderUserList = () => {
    return props.userList?.map((user) => {
      return (
        <Link
          to={`user/${user.login}`}
          className="item"
          onClick={(user) => handleOnClick(user)}
        >
          <img className="" src={user.avatar_url}></img>
          <div className="searchItem">
            <div className="header">{user.login}</div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <SearchBar flow="userlist" placeholder="search for user" />
      <div className="searchDiv">
        {renderUserList()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSearchTerm: state.searchTerm.userlist,
    userList: state.userList.list,
    searchedTerm: state.userList.searchedTerm,
  };
};

export default connect(mapStateToProps, { searchUsers, updateSelectedUser })(
  UserList
);
