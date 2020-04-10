import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteLog, setCurrent } from "../../actions/logActions";

import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log._id);
    M.toast({ html: "Log deleted" });
  };

  return (
    <div>
      <li
        className={`collection-item ${!log.attention ? "grey lighten-3" : ""} `}
      >
        <div>
          <a
            href='#edit-log-modal'
            onClick={() => setCurrent(log)}
            className={`modal-trigger ${
              log.attention
                ? "orange-text bold-text"
                : "grey-text text-darken-3"
            }`}
          >
            {log.message}
          </a>
          <br />
          <span className='grey-text'>
            Ticket <span className='black-text'>#{log._id}</span> assigned to{" "}
            <span className='black-text'>{log.tech}</span>. Last updated on{" "}
            <Moment format='MMMM Do YYYY, kk:mm'>{log.date}</Moment>
          </span>
          <a href='#!' className='secondary-content' onClick={onDelete}>
            <i className='material-icons grey-text'>delete</i>
          </a>
        </div>
      </li>
    </div>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
