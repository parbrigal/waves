import axios from "axios";

import { SERVER_URL_USERS } from "../../utils/misc";
import { LOGIN_USER, REGISTER_USER, AUTH_USER,LOGOUT_USER, ADD_CART_TO_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER_URL_USERS}/login`, dataToSubmit)
    .then(response => {
      return response.data;
    });

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER_URL_USERS}/register`, dataToSubmit)
    .then(response => {
      return response.data;
    });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function auth() {
  const request = axios.get(`${SERVER_URL_USERS}/auth`).then(response => {
    return response.data;
  });

  return {
      type : AUTH_USER,
      payload : request
  }
}

export function logoutUser() {

  const request = axios.get(`${SERVER_URL_USERS}/logout`).then(response => {
    return response.data;
  });

  return {
    type : LOGOUT_USER,
    payload : request
  }
}

export function addToCart(_id) {

  const request = axios.post(`${SERVER_URL_USERS}/add_to_cart?productId=${_id}`).then(response => { 
    return response.data});

  return {
    type : ADD_CART_TO_USER,
    payload:request
  }
}
