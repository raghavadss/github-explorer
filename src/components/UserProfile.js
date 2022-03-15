import React, { useEffect,} from "react";
import { connect } from "react-redux";
import { fetchUser, searchUserRepos } from "../actions";
import SearchBar from "./SearchBar";
import "./UserProfile.css";

const UserProfile = (props) => {
  const { username } = props.match.params;
  const { fetchUserAction, searchUserReposAction, userRepoSearchTerm } = props;

  useEffect(() => {
    fetchUserAction(username);
    searchUserReposAction(username);
  }, [username, fetchUserAction, searchUserReposAction, userRepoSearchTerm]);

  const renderRepos = () => {
    return props.userRepos?.map((repo) => {
      return (
        <div
          onClick={() => {
            window.location.href = repo.html_url;
          }}
          key={repo.id}
          className="repoCard"
        >
          <div className="">
            <div className="title">{repo.name}</div>
          </div>
          <div className="">
            Forks: {repo.forks_count}
            <br />
            Stars: {repo.stargazers_count}
          </div>
        </div>
      );
    });
  };

  const renderUserProfile = () => {
    const userDetailsMap = {
      Name: props.userDetails.name,
      Username: props.userDetails.login,

      Location: props.userDetails.location,
      Email: props.userDetails.email,
    };

    const detailsMap = {
      "Public Repo Count": props.userDetails.public_repos,
      Followers: props.userDetails.followers,
      Following: props.userDetails.following,
      "Join Date": new Date(props.userDetails.created_at).toLocaleDateString(),
    };
    const userDetailsFragment = Object.keys(userDetailsMap).map((key) => {
      if (userDetailsMap[key])
        return (
          <div className="item">
            <div className="detailsHeader">{key}</div>
            {userDetailsMap[key]}
          </div>
        );
      return null;
    });

    const detailsFragment = Object.keys(detailsMap).map((key) => {
      if (detailsMap[key])
        return (
          <div className="details">
            <div className="description">{key}</div>
            <div>{detailsMap[key]}</div>
          </div>
        );
      return null;
    });

    return (
      <React.Fragment>
        <div className="">
          <div className="">
            <div className="">
              <img src={props.userDetails.avatar_url}></img>
            </div>
            <div className="">{userDetailsFragment}</div>
          </div>
          <div className="bio"> {props.userDetails.bio}</div>
          <div className="repos">{detailsFragment}</div>
        </div>

        <SearchBar
          flow="userrepo"
          placeholder={`search for ${props.userDetails.login}'s repositories`}
        />
        <div className="">{renderRepos()}</div>
      </React.Fragment>
    );
  };

  return props.userDetails ? renderUserProfile() : <div></div>;
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userProfile.user,
    userRepos: state.userProfile.repos,
    userRepoSearchTerm: state.searchTerm.userrepo,
  };
};

export default connect(mapStateToProps, {
  fetchUserAction: fetchUser,
  searchUserReposAction: searchUserRepos,
})(UserProfile);
