import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import PropTypes from "prop-types";
import { getLogs, setLoading } from "../../actions/logActions";
import { getTechs } from "../../actions/techActions";

const Logs = ({
  log: { logs, loading, search },
  setLoading,
  getLogs,
  getTechs,
  auth,
}) => {
  useEffect(() => {
    setLoading();
    getLogs();
    getTechs();
    // eslint-disable-next-line
  }, [getLogs, getTechs, setLoading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Fragment>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>
            {auth.user && auth.user.name}'s System Tickets
          </h4>
        </li>

        {/* if no logs, show message - if there are, output them */}
        {!loading && logs.length === 0 ? (
          <p className='center'>No logs to show</p>
        ) : search !== null ? (
          search.map((log) => <LogItem key={log._id} log={log} />)
        ) : (
          (logs.sort((a, b) => (a.date > b.date ? -1 : 1)),
          logs.sort((a, b) =>
            Number(a.attention) < Number(b.attention) ? 1 : -1
          ),
          logs.map((log) => <LogItem key={log._id} log={log} />))
        )}
      </ul>
    </Fragment>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log, // state.log refers to index.js in reducer folder
  auth: state.auth,
});

export default connect(mapStateToProps, { getLogs, getTechs, setLoading })(
  Logs
);
