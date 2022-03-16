import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateSearchTerm } from "../../actions";
import "./index.css";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");  
  const { debouncedTerm, updateSearchTermAction, flow } = props;
  
  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (!term && debouncedTerm) setTerm(debouncedTerm);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const termObj = {};
      termObj[flow] = term;
      updateSearchTermAction(termObj);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term, flow, updateSearchTermAction]);

  return (
    <div className="SearchBar">
      <div className="searchInput">
        <input
          className="prompt"
          type="text"
          placeholder={props.placeholder}
          value={term}
          onChange={(e) => onInputChange(e)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    debouncedTerm: state.searchTerm[ownProps.flow],
  };
};

export default connect(mapStateToProps, {
  updateSearchTermAction: updateSearchTerm,
})(SearchBar);
