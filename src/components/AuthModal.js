import { useState } from 'react';
import { BASE_URL } from '../constant';
import { useAuth } from '../context/AuthContext';
import {
    Modal,
    TextInput,
    PasswordInput,
    Button,
    Stack,
} from '@mantine/core';

import '../AuthModal.css';

import { loginUser } from '../utils/auth';

function AuthModal({ opened, onClose, type }) {
    const token = localStorage.getItem('access_token');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginSuccess } = useAuth();

    const [loading, setLoading] = useState(false);

    const isLogin = type === 'login';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // =========================
            // LOGIN
            // =========================
            if (isLogin) {

                const data = await loginUser(
                    username,
                    password
                );
                loginSuccess();
                console.log('Login successful:', data);
            }

            // =========================
            // SIGN UP
            // =========================
            else {

                const response = await fetch(
                    `${BASE_URL}/user/new`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            password,
                        }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();

                    throw new Error(
                        errorData.detail || 'Failed to create user'
                    );
                }

                const data = await response.json();

                console.log('User created:', data);
            }

            // Clear form
            setUsername('');
            setEmail('');
            setPassword('');

            // Close modal
            onClose();

        } catch (error) {

            console.log(
                isLogin
                    ? 'Login error:'
                    : 'Signup error:',
                error
            );

        } finally {

            setLoading(false);

        }
    };
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                isLogin
                    ? 'Login to Your Account'
                    : 'Create Your Account'
            }
            centered
            size="sm"
            radius="lg"
            classNames={{
                root: 'auth-modal-root',
                content: 'auth-modal-content',
                header: 'auth-modal-header',
                title: 'auth-modal-title',
                body: 'auth-modal-body',
                close: 'auth-modal-close',
            }}
        >

            <form onSubmit={handleSubmit}>

                <Stack gap="md">

                    {/* ========================= */}
                    {/* USERNAME */}
                    {/* ========================= */}

                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.currentTarget.value)
                        }
                        required
                    />


                    {/* ========================= */}
                    {/* EMAIL - SIGNUP ONLY */}
                    {/* ========================= */}

                    {!isLogin && (
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.currentTarget.value)
                            }
                            required
                        />
                    )}


                    {/* ========================= */}
                    {/* PASSWORD */}
                    {/* ========================= */}

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.currentTarget.value)
                        }
                        required
                    />


                    {/* ========================= */}
                    {/* BUTTON */}
                    {/* ========================= */}

                    <Button
                        type="submit"
                        fullWidth
                        size="md"
                        radius="md"
                        loading={loading}
                    >
                        {isLogin
                            ? 'Login'
                            : 'Create Account'}
                    </Button>

                </Stack>

            </form>

        </Modal>
    );
}

export default AuthModal;