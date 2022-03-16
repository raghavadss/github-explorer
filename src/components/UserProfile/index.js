import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, searchUserRepos } from "../../actions";
import SearchBar from "../SearchBar";
import "./index.css";

const UserProfile = (props) => {
  const { username } = props.match.params;
  const {
    fetchUserAction,
    searchUserReposAction,
    userRepoSearchTerm,
    userDetails,
    userRepos,
    userRepoSearchedTerm,
  } = props;

  useEffect(() => {
    if (userDetails?.login !== username) fetchUserAction(username);
    if (userRepoSearchTerm !== userRepoSearchedTerm) {
      searchUserReposAction(username, userRepoSearchTerm);
    }
  }, [
    userDetails,
    username,
    userRepoSearchTerm,
    fetchUserAction,
    searchUserReposAction,
    userRepoSearchedTerm,
  ]);

  const renderRepos = () => {
    return userRepos?.map((repo) => {
      return (
        <div
          onClick={() => {
            window.location.href = repo.html_url;
          }}
          key={repo.id}
          className="repoCard"
        >
          <div className="repoName">
            <div className="title">{repo.name}</div>
          </div>
          <div className="repoForks">
            Forks: {repo.forks_count}
            <br />
            Stars: {repo.stargazers_count}
          </div>
        </div>
      );
    });
  };

  const renderUserProfile = () => {
    if (!userDetails) return null;

    const metricsMap = {
      "# Public Repos": userDetails.public_repos,
      Followers: userDetails.followers,
      Following: userDetails.following,
      "Join Date": new Date(userDetails.created_at).toLocaleDateString(),
    };

    const metricsFragment = Object.keys(metricsMap).map((key) => {
      if (metricsMap[key])
        return (
          <div className="metric" key={key}>
            <div className="metricName">{key}</div>
            <div className="metricValue">{metricsMap[key]}</div>
          </div>
        );
      return null;
    });

    return (
      <div className="UserProfile">
        <div className="userDetails">
          <div className="Basic">
            <div className="avatar">
              <img alt={userDetails.name} src={userDetails.avatar_url}></img>
            </div>
            <div className="basicDetails">
              <div className="name-username">
                <div className="name">{userDetails.name}</div>
                <div className="username">{userDetails.login}</div>
              </div>
              {userDetails.location ? (
                <div className="location">{userDetails.location}</div>
              ) : null}
            </div>
          </div>
          {userDetails.email ? (
            <div className="email">
              <i class="fa fa-envelope"></i>
              <span>{userDetails.email}</span>
            </div>
          ) : null}
          <div className="bio"> {userDetails.bio}</div>
          <div className="metrics">{metricsFragment}</div>
        </div>

        <SearchBar
          flow="userrepo"
          placeholder={`search for ${userDetails.login}'s repos`}
        />
        <div className="repos">{renderRepos()}</div>
      </div>
    );
  };

  return renderUserProfile();
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userProfile.user,
    userRepos: state.userProfile.repos,
    userRepoSearchTerm: state.searchTerm.userrepo,
    userRepoSearchedTerm: state.userProfile.userRepoSearchedTerm,
  };
};

export default connect(mapStateToProps, {
  fetchUserAction: fetchUser,
  searchUserReposAction: searchUserRepos,
})(UserProfile);
