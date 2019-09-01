import axios from "axios";

 import {
    GET_SITE_DATA,
    UPDATE_SITE_DATA
 } from "./types";

import { SERVER_URL_SITE } from "../../utils/misc";

export function getSiteData() {
    const request = axios.get(`${SERVER_URL_SITE}/site_data`)
                    .then(response => response.data)
    
    return {
        type: GET_SITE_DATA,
        payload : request
    }
}

export function updateSiteData(dataToSubmit) {

    const request = axios.post(`${SERVER_URL_SITE}/site_data`,dataToSubmit)
                    .then(response => response.data)

    return {
        type: UPDATE_SITE_DATA,
        payload : request
    }
}