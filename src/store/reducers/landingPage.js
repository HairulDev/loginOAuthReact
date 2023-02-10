import {
  FETCH_PAGE,
} from "../../constants/actionTypes";

const initialState = {
  dataLandingPageReducer: [],
};

const landingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        dataLandingPageReducer: action.payload,
      };

    default:
      return state;
  }
};
export default landingPageReducer;
