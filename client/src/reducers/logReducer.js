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
  CLEAR_LOGS,
} from "../actions/types";

const initialState = {
  logs: [],
  current: null,
  search: null,
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload, // fill logs with payload data
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload], // add new log to state
        loading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id !== action.payload), // only return logs not matching the deleted one
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log._id === action.payload._id ? action.payload : log
        ), // match based on id and update respective log, if not return current log
      };
    case SEARCH_LOGS:
      return {
        ...state,
        search: state.logs.filter((log) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            log.tech.match(regex) ||
            log._id.match(regex) ||
            log.message.match(regex)
          );
        }),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
        current: null,
        search: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
