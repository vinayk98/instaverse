import { Button } from '@mantine/core';
import "../TopNav.css";
import { capitalizeFirstLetter } from '../utils/utils';
import { useAuth } from '../context/AuthContext';

function TopNav({ setAuthModal, setModalType }) {
    console.log()
    const { login, logout } = useAuth();
    const username = localStorage.getItem('username')
    return (
        <nav className="top-nav">
            <div className="nav-container">

                <div className="nav-logo">
                    <div className="logo-icon">
                        I
                    </div>

                    <span className="app-name">
                        InstaVerse
                    </span>
                </div>
                {!login ?
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

                    </div> :
                    <div className="nav-actions">
                        <p>{capitalizeFirstLetter(username)}</p>
                        <Button
                            color="blue"
                            variant="outline"
                            size="sm"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>}
            </div>
        </nav>
    );
}

export default TopNav;