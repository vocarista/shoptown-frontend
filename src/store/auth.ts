import { create } from 'zustand';

interface Auth {
    token: string;
    base: string;
    isLoggedIn: boolean; // Use lowercase 'boolean'
}

interface SetAuth {
    setToken: (newToken: string) => void;
    removeToken: () => void;
}

const useAuth = create<Auth & SetAuth>((set) => ({
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Store as a string and convert to boolean
    base: `https://api.shoptown.vocarista.com`,
    setToken: (newToken) => set((state) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('isLoggedIn', 'true');
        return { ...state, isLoggedIn: true, token: newToken };
    }),
    removeToken: () => set((state) => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        return { ...state, isLoggedIn: false, token: '' };
    }),
}));

export default useAuth;