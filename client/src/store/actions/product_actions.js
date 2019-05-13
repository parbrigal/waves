import axios from "axios";

import { SERVER_URL_PRODUCT } from "../../utils/misc";
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL,BRANDS,WOODS, GET_PRODUCTS_BY_SHOP, ADD_PRODUCT } from "./types";

export function getProductsByArrival(){
    const request = axios.get(`${SERVER_URL_PRODUCT}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${SERVER_URL_PRODUCT}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}


export function getBrands() {
    const request = axios.get(`${SERVER_URL_PRODUCT}/list_brands`)
                    .then(response => response.data);

    return {
        type : BRANDS,
        payload : request
    }
}

export function getWoods() {
    const request = axios.get(`${SERVER_URL_PRODUCT}/list_woods`)
                    .then(response => response.data);
    return {
        type : WOODS,
        payload : request
    }
}

export function getProductsToShop(skip,limit,filters = [],previousState = []) {
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${SERVER_URL_PRODUCT}/shop`,data).then(resp => {
        let newState = [
            ...previousState,
            ...resp.data.articles
        ];
        return {
            size : resp.data.size,
            articles : newState
        }
    });

    return {
        type : GET_PRODUCTS_BY_SHOP,
        payload : request
    }
}

export function addProduct(dataToSubmit) {
     const request = axios.post(`${SERVER_URL_PRODUCT}/article`,dataToSubmit).then(response => response.data);

     return {
         type : ADD_PRODUCT,
         payload : request
     }
}