import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const TechSelectOptions = ({ tech: { techs, loading } }) => {
  return (
    !loading &&
    techs !== null &&
    techs.map((tech) => (
      <option key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}
      </option>
    ))
  );
};

TechSelectOptions.propTypes = {
  tech: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps)(TechSelectOptions);
