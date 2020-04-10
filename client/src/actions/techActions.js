import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  SET_CURRENTTECH,
  TECHS_ERROR,
  UPDATE_TECH,
} from "./types";

import axios from "axios";

// GET TECHS
export const getTechs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/techs");

    dispatch({ type: GET_TECHS, payload: res.data });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err.message });
  }
};

// ADD TECH
export const addTech = (tech) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/techs", tech, config);

    dispatch({ type: ADD_TECH, payload: res.data });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err.message });
  }
};

// EDIT TECH
export const updateTech = (tech) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();

    const res = await axios.put(`/api/techs/${tech.id}`, tech, config);

    dispatch({ type: UPDATE_TECH, payload: res.data });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err.message });
  }
};

// SET CURRENT TECH WHEN EDITING
export const setCurrentTech = (tech) => {
  return {
    type: SET_CURRENTTECH,
    payload: tech,
  };
};

// DELETE TECH
export const deleteTech = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/techs/${id}`);

    dispatch({ type: DELETE_TECH, payload: id });
  } catch (err) {
    dispatch({ type: TECHS_ERROR, payload: err.message });
  }
};

// SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
