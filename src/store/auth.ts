import { create } from 'zustand';

interface Auth {
    token: String;
    base: String;
    isLoggedIn: Boolean;
}

interface SetAuth {
    setToken: (newToken: String) => void;
    setIsLoggedIn: (status: boolean) => void;
}

const useAuth = create<Auth & SetAuth>((set) => ({
    token: '',
    isLoggedIn: false,
    base: `https://api.shoptown.vocarista.com`,
    setToken: (newToken) => set((state: any) => ({...state, token: newToken})),
    setIsLoggedIn: (status) => set((state: any) => ({...state, isLoggedIn: status}))
}));

export default useAuth;