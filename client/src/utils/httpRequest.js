import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

const token = localStorage.getItem('token');

export const httpRequest = axios.create({
    baseURL: API_ROOT,
    timeout: 3000,
});

export const authRequest = axios.create({
    baseURL: API_ROOT,
    timeout: 3000,
    headers: {
        Authorization: 'Bearer ' + token,
    },
});
