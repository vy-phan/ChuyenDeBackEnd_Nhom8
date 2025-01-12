import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        try {
            const token = localStorage.getItem('auth-token');
            const user = localStorage.getItem('user');
            
            if (!token) return null;
            
            if (user) {
                return JSON.parse(user);
            }
            
            return null;
        } catch (error) {
            console.error("Auth context error:", error);
            return null;
        }
    });

    // Thêm function để update cả token và user
    const updateAuth = (token, user) => {
        if (token) localStorage.setItem('auth-token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));
        setAuthUser(user);
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

