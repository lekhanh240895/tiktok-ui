import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

const token = localStorage.getItem('token');

export const httpRequest = axios.create({
    baseURL: API_ROOT,
});

export const authRequest = axios.create({
    baseURL: API_ROOT,
    headers: {
        Authorization: 'Bearer ' + token,
    },
});
