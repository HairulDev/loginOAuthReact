import {
  FETCH_PAGE,
} from "../../constants/actionTypes";

import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_HOST });

export const getAllLandingPage =
  (successCB, failedCB) => async (dispatch) => {
    API.get(`/v1/landingPage`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({
          type: FETCH_PAGE,
          payload: resAPI,
        });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return dispatch(failedCB && failedCB(err));
      });
  };

