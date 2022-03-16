import React, { useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../SearchBar";
import { searchUsers, updateSelectedUser } from "../../actions";
import { Link } from "react-router-dom";
import "./index.css";

const UserList = (props) => {
  const { searchedTerm, userSearchTerm, searchUsersAction } = props;

  useEffect(() => {
    if (searchedTerm !== userSearchTerm) searchUsersAction(userSearchTerm);
  }, [userSearchTerm, searchUsersAction, searchedTerm]);

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
          key={user.id}
        >
          <div className="card">
            <div className="cardImage">
              <img alt="avatar" className="image" src={user.avatar_url}></img>
            </div>
            <div className="cardTitle">{user.login}</div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="UserList">
      <SearchBar flow="userlist" placeholder="search for user" searchedTerm={userSearchTerm} />
      <div className="list">{renderUserList()}</div>
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

export default connect(mapStateToProps, {
  searchUsersAction: searchUsers,
  updateSelectedUser,
})(UserList);
