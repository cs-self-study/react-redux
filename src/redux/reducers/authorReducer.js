import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// return new state for each action
const authorReducer = (state = initialState.authors, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
};

export default authorReducer;
