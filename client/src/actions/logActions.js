import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./types";

import axios from "axios";

// GET LOGS FROM SERVER
export const getLogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/logs");
    dispatch({ type: GET_LOGS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err.message });
  }
};

// ADD NEW LOG
export const addLog = (log) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();

    const res = await axios.post("/api/logs", log, config);

    dispatch({ type: ADD_LOG, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err.message });
  }
};

// DELETE LOGS
export const deleteLog = (_id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/logs/${_id}`);

    dispatch({ type: DELETE_LOG, payload: _id });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err.response.data.message });
  }
};

// UPDATE LOGS

export const updateLog = (log) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();

    const res = await axios.put(`/api/logs/${log._id}`, log, config);

    dispatch({ type: UPDATE_LOG, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGS_ERROR, payload: err.message });
  }
};

// SEARCH LOGS
export const searchLogs = (text) => async (dispatch) => {
  dispatch({ type: SEARCH_LOGS, payload: text });
};

// SET CURRENT LOG WHEN EDITING
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// CLEAR CURRENT LOG
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
