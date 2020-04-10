import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";

const SearchBar = ({ searchLogs }) => {
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== null) {
      searchLogs(e.target.value);
    }
  };

  return (
    <div className='searchbar orange lighten-3'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search tickets...'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs })(SearchBar);
