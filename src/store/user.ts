import { create } from 'zustand';

interface UserState {
    username: string;
    cart: string[];
    orders: string[];
    wishlist: string[];
}

interface UserActions {
    setUsername: (newUsername: string) => void;
    addCartItem: (newItem: string) => void;
    addOrderItem: (newItem: string) => void;
    addWishlistItem: (newItem: string) => void;
}

const useUser = create<UserState & UserActions>((set) => ({
    username: '',
    setUsername: (newUsername) => set((state) => ({ ...state, username: newUsername })),
    cart: [],
    addCartItem: (newItem) => set((state) => ({ ...state, cart: [...state.cart, newItem] })),
    orders: [],
    addOrderItem: (newOrder) => set((state) => ({ ...state, orders: [...state.orders, newOrder] })),
    wishlist: [],
    addWishlistItem: (newItem) => set((state) => ({ ...state, wishList: [...state.wishlist, newItem] })),
  }));
  
  export default useUser;
