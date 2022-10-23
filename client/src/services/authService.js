import { authRequest, httpRequest } from '~/utils/httpRequest';

// Register user
export const register = async (data) => {
    const response = await httpRequest.post('auth/register', data);
    const user = response.data;
    localStorage.setItem('token', user.token);

    return user;
};

// Login by JWT
export const getMe = async () => {
    try {
        const response = await authRequest.get('users/me');
        const { password, ...other } = { ...response.data };
        localStorage.setItem('user', JSON.stringify(other));
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// Login user
export const login = async (data) => {
    const response = await httpRequest.post('auth/login', data);
    const user = response.data;
    localStorage.setItem('token', user.token);
    return user;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    return;
};
