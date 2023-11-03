import { create } from 'zustand';

interface UserState {
    cart: any[];
    orders: any[];
    wishlist: any[];
    cartCount: number;
    wishlistCount: number;
}

interface UserActions {
    addCartItem: (newItem: any) => void;
    addOrderItem: (newItem: any) => void;
    addWishlistItem: (newItem: any) => void;
}

const useUser = create<UserState & UserActions>((set) => ({
    wishlistCount: 0,
    cartCount: 0,
    cart: [],
    addCartItem: (newItem) => set((state) => ({ ...state, cart: [...state.cart, newItem] })),
    orders: [],
    addOrderItem: (newOrder) => set((state) => ({ ...state, orders: [...state.orders, newOrder] })),
    wishlist: [],
    addWishlistItem: (newItem) => set((state) => ({ ...state, wishList: [...state.wishlist, newItem] })),
  }));
  
  export default useUser;
