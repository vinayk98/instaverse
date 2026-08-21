import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [login, setLogin] = useState(
        !!localStorage.getItem('access_token')
    );


    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setLogin(false);
        navigate('/');
    };

    const loginSuccess = () => {
        setLogin(true);
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                loginSuccess,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};