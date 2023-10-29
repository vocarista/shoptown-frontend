import { create } from 'zustand';

interface Modes {
    isDark: boolean;
    isMobile: boolean;
    showWishlist: boolean;
    showNav: boolean;
}

interface SetModes {
    toggleTheme: () => void;
    toggleIsMobile: (newMode: boolean) => void;
    toggleWishlist: () => void;
    toggleNav: () => void;
}

const useGeneral = create<Modes & SetModes>((set) => ({
    isDark: false,
    isMobile: false,
    showWishlist: false,
    showNav: true,
    toggleTheme: () => set((state: any) => ({ ...state, isDark: !state.isDark })),
    toggleIsMobile: (newMode) => set((state: any) => ({ ...state, isMobile: newMode })),
    toggleWishlist: () => set((state: any) => ({ ...state, showWishlist: !state.showWishlist })),
    toggleNav: () => set((state: any) => ({ ...state, showNav: !state.showNav }))
}));

export default useGeneral;