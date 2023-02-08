import {
  CREATE,
  FETCH_PAGE,
  FETCH_BY,
  UPDATE,
  DELETE,
} from "../../constants/actionTypes";

const initialState = {
  dataLandingPageReducerAll: [],
  dataLandingPageReducer: [],
};

const landingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
      };
    case FETCH_PAGE:
      return {
        ...state,
        dataLandingPageReducerAll: action.payload,
      };
    case FETCH_BY:
      return {
        ...state,
        dataLandingPageReducer: action.payload,
      };
    case UPDATE:
      return {
        ...state,
      };
    case DELETE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default landingPageReducer;
