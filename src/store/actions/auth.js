import { AUTH, LOGOUT } from "../../constants/actionTypes";

import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_HOST });

export const signin = (formData, successCB, failedCB) => async (dispatch) => {
  API.post("/v1/auth/signin", formData)
    .then((response) => {
      const result = response.data.result;
      console.log("response signin:", result);
      const token = response.data.token;
      const data = {
        result,
        token,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};

export const signup = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("file", formData.file);
  API.post("/v1/auth/signup", data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};

export const signOut = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData);
  API.post("/v1/auth/signOut", data)
    .then((response) => {
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};

export const changepassword = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData.email);
  data.append("oldPassword", formData.oldPassword);
  data.append("password", formData.password);
  API.post("/v1/auth/changepassword", data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};

export const resetPassword = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData.email);
  API.post("/v1/auth/resetPassword", data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};

export const createNewPassword = (formData, { token }, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("password", formData.password);
  API.post(`/v1/auth/createNewPassword/${token}`, data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};
