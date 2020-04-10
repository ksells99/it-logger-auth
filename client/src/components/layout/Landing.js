import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  // If user is logged in, don't show landing page - redirect to logs page instead
  if (isAuthenticated) {
    return <Redirect to='/logs' />;
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>IT Ticket Logger</h1>
          <p></p>
          <p className='lead'>
            A full MERN stack application with user authentication. Create and
            manage your service tickets, set statuses and assign technicians.
          </p>
          <p>
            Hit the buttons below to either register for a free account, or sign
            into your existing account.
          </p>

          <div className='buttons'>
            <Link to='/register' className='btn btn-primary mr-2'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
