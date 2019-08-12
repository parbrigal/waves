import axios from "axios";

import { SERVER_URL_USERS, SERVER_URL_PRODUCT } from "../../utils/misc";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_CART_TO_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY
} from "./types";

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
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios.get(`${SERVER_URL_USERS}/logout`).then(response => {
    return response.data;
  });

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function addToCart(_id) {
  const request = axios
    .post(`${SERVER_URL_USERS}/add_to_cart?productId=${_id}`)
    .then(response => {
      return response.data;
    });

  return {
    type: ADD_CART_TO_USER,
    payload: request
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${SERVER_URL_PRODUCT}/article_by_id?id=${cartItems}&type=array`)
    .then(response => {
      userCart.forEach(item => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  };
}

export function removeCartItem(id) {

  const request = axios.get(`${SERVER_URL_USERS}/removeFromCart?_id=${id}`)
  .then(response => {
       response.data.cart.forEach(item => {
         response.data.cartDetail.forEach( (detail,iter) => {
           if (item.id === detail._id) {
             response.data.cartDetail[iter].quantity = item.quantity
           }
         })
       })
       return response.data;
     }
  )

  return {
    type : REMOVE_CART_ITEM,
    payload : request
  }
}

export function onSuccessBuy(data) {

  const request = axios.post(`${SERVER_URL_USERS}/successBuy`,data).then(response => response.data)

  return {
    type : ON_SUCCESS_BUY,
    payload : request
  }

}
