import { create } from 'zustand';

interface Auth {
    token: String;
    username: String;
    base: String;
}

interface SetAuth {
    setToken: (newToken: String) => void;
    setUsername: (username: String) => void;
}

const useAuth = create<Auth & SetAuth>((set) => ({
    token: '',
    username: '',
    base: `https://api.shoptown.vocarista.com`,
    setToken: (newToken) => set((state: any) => ({...state, token: newToken})),
    setUsername: (newUsername) => set((state) => ({...state, username: newUsername}))
}));

export default useAuth;