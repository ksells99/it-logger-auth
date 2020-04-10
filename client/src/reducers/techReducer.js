import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
  UPDATE_TECH,
  SET_CURRENTTECH,
  CLEAR_TECHS,
} from "../actions/types";

const initialState = {
  techs: [],
  loading: false,
  error: {},
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false,
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map((tech) =>
          tech._id === action.payload._id ? action.payload : tech
        ), // match based on id and update respective tech, if not return current tech
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((tech) => tech._id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENTTECH:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_TECHS:
      return {
        ...state,
        techs: [],
        loading: false,
        error: {},
      };
    case TECHS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
