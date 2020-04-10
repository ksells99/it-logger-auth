import React from "react";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";

const SearchBarAuth = ({ auth: { isAuthenticated, loading } }) => {
  // Only show searchbar if user is logged in (i.e. viewing logs page)
  if (!loading && isAuthenticated) {
    return <SearchBar />;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SearchBarAuth);
