import React, { useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import AddBtn from "./AddBtn";

const AddBtnAuth = ({ auth: { isAuthenticated, loading } }) => {
  useEffect(() => {
    M.AutoInit(); // initialise materialise JS on load
  }, []);

  // Only show floating buttons if user is logged in (i.e. viewing logs page)

  if (isAuthenticated) {
    return <AddBtn />;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddBtnAuth);
