import axios from 'axios';

import { SERVER_URL_USERS } from '../../utils/misc';
import { LOGIN_USER,REGISTER_USER } from './types';

export function loginUser(dataToSubmit) {

    const request = axios.post(`${SERVER_URL_USERS}/login`,dataToSubmit).then(response => {
        return response.data;
    })

    return {
        type : LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post(`${SERVER_URL_USERS}/register`,dataToSubmit).then(response => {
        return response.data;
    })

    return {
        type : REGISTER_USER,
        payload: request
    }

} 