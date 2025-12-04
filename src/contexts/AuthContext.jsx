import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = storage.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const user = storage.login(email, password);
        if (user) {
            setUser(user);
            storage.setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        storage.setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
