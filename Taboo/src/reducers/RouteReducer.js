import { SET_ROUTE } from '../types';

const INITIAL_STATE = {route: null};

const routeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { route: action.route };
    default:
      return state
  }
};

export default routeReducer;
