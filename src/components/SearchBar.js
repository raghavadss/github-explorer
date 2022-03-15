import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateSearchTerm } from "../actions";
import "./SearchBar.css"
const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    if (!term && props.debouncedTerm) setTerm(props.debouncedTerm);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const termObj = {};
      termObj[props.flow] = term;
      props.updateSearchTerm(termObj);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  return (
    <div className="">
      <div className="">
        <input
          className="prompt"
          type="text"
          placeholder={props.placeholder}
          value={term}
          onChange={(e) => onInputChange(e)}
        />
        <i className="search icon"></i>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    debouncedTerm: state.searchTerm[ownProps.flow],
  };
};

export default connect(mapStateToProps, { updateSearchTerm })(SearchBar);
