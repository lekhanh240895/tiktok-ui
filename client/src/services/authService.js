import { authRequest, httpRequest } from '~/utils/httpRequest';

// Register user
export const register = async (data) => {
    try {
        const response = await httpRequest.post('auth/register', data);
        const user = response.data;
        localStorage.setItem('token', user.token);

        return user;
    } catch (err) {
        console.log(err);
    }
};

// Login by JWT
export const getMe = async () => {
    try {
        const response = await authRequest.get('users/me');
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Login user
export const login = async (data) => {
    try {
        const response = await httpRequest.post('auth/login', data);
        const user = response.data;
        localStorage.setItem('token', user.token);
        return user;
    } catch (err) {
        console.log(err);
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    return;
};
