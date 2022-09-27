import axios from 'axios';

const token = localStorage.getItem('token');

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 3000,
});

export const authRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 3000,
    headers: { Authorization: 'Bearer ' + token },
});
