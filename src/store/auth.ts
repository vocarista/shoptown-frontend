import { create } from 'zustand';

interface Auth {
    token: String;
    base: String;
    isLoggedIn: Boolean;
}

interface SetAuth {
    setToken: (newToken: String) => void;
    toggleIsLoggedIn: () => void;
}

const useAuth = create<Auth & SetAuth>((set) => ({
    token: '',
    username: '',
    password: '',
    isLoggedIn: false,
    base: `https://api.shoptown.vocarista.com`,
    setToken: (newToken) => set((state: any) => ({...state, token: newToken})),
    toggleIsLoggedIn: () => set((state: any) => ({...state, loggedIn: !state.loggedIn}))
}));

export default useAuth;