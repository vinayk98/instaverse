import { BASE_URL } from '../constant';
import { notifications } from '@mantine/notifications';

export const loginUser = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    const data = await response.json();
    if (response?.status === 200) {
        notifications.show({
            title: 'Success',
            message: 'Login successful!',
        });
    }
    if (!response.ok) {
        notifications.show({
            title: 'Error',
            message: 'Invalid username or password',
            color: 'red',
        });
        throw new Error(
            data.detail || 'Invalid username or password'
        );
    }

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('user_id', data.user_id);
    localStorage.setItem('username', data.username);
    return data;
};

export const isLoggedIn = () => {
    const token = localStorage.getItem('access_token');

    return !!token;
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (!token) {
        return null;
    }

    return {
        token,
        userId,
        username,
    };
};


export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    notifications.show({
        title: 'Success',
        message: 'Login successful!',
    });
};
