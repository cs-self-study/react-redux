import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

const configureStore = initialState => {
  const composeEnhancment =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancment(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
};

export default configureStore;
