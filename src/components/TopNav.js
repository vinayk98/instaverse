import {
    Button,
    Avatar,
    Group,
} from '@mantine/core';

import "../TopNav.css";

import { capitalizeFirstLetter } from '../utils/utils';
import { useAuth } from '../context/AuthContext';

function TopNav({
    setAuthModal,
    setModalType,
    setCreatePostModal
}) {
    const { login, logout } = useAuth();

    const username = localStorage.getItem('username');

    const displayUsername = username
        ? capitalizeFirstLetter(username)
        : 'User';

    return (
        <nav className="top-nav">

            <div className="nav-container">

                {/* ================= LOGO ================= */}
                <div className="nav-logo">

                    <div className="logo-icon">
                        I
                    </div>

                    <span className="app-name">
                        InstaVerse
                    </span>

                </div>


                {/* ================= ACTIONS ================= */}
                {!login ? (

                    <div className="nav-actions">

                        <Button
                            color="blue"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setAuthModal(true);
                                setModalType("login");
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            color="blue"
                            variant="filled"
                            size="sm"
                            onClick={() => {
                                setAuthModal(true);
                                setModalType("sign-up");
                            }}
                        >
                            Sign Up
                        </Button>

                    </div>

                ) : (

                    <div className="nav-actions">

                        {/* Create Post */}
                        <Button
                            size="sm"
                            onClick={() => setCreatePostModal(true)}
                        >
                            Create Post
                        </Button>


                        {/* User */}
                        <Group
                            gap="xs"
                            className="nav-user"
                        >

                            <Avatar
                                size="sm"
                                radius="xl"
                                color="blue"
                            >
                                {displayUsername.charAt(0)}
                            </Avatar>

                            <span className="nav-username">
                                {displayUsername}
                            </span>

                        </Group>


                        {/* Logout */}
                        <Button
                            color="blue"
                            variant="outline"
                            size="sm"
                            onClick={logout}
                        >
                            Logout
                        </Button>

                    </div>

                )}

            </div>

        </nav>
    );
}

export default TopNav;