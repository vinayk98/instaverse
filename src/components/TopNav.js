import {
    Button,
} from '@mantine/core';

import "../TopNav.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function TopNav({
    setAuthModal,
    setModalType,
    setCreatePostModal
}) {
    const { login } = useAuth();
    const navigate = useNavigate();
    // const username = localStorage.getItem('username');

    // const displayUsername = username
    //     ? capitalizeFirstLetter(username)
    //     : 'User';

    return (
        <nav className="top-nav">

            <div className="nav-container">

                {/* ================= LOGO ================= */}
                <div className="nav-logo">

                    <div
                        className="logo-icon"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        I
                    </div>

                    <span className="app-name">
                        InstaVerse
                    </span>

                    {/* Create Post next to logo */}
                    {login && (
                        <Button
                            size="sm"
                            onClick={() => setCreatePostModal(true)}
                        >
                            Create
                        </Button>
                    )}

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

                        {/* User */}
                        <Button
                            component={Link}
                            to="/settings"
                            variant="light"
                            size="sm"
                        >
                            Settings
                        </Button>
                    </div>
                )}
            </div>

        </nav>
    );
}

export default TopNav;