import { create } from 'zustand';

interface UserState {
    cart: CartItem[];
    orders: OrderItem[];
    wishlist: WishlistItem[];
    cartCount: number;
    wishlistCount: number;
}

interface UserActions {
    setCartList: (newList: CartItem[]) => void;
    setWishlist: (newList: WishlistItem[]) => void;
    setOrderList: (newList: OrderItem[]) => void;
}

export interface CartItem {
    productId: string,
    qty: number,
}

export interface WishlistItem {
    productId: string,
}

export interface OrderItem {
    productId: string,
    qty: number,
    orderDate: Date,
    arrivalDate: Date,

}
const useUser = create<UserState & UserActions>((set) => ({
    wishlistCount: 0,
    cartCount: 0,
    cart: [],
    wishlist: [],
    orders: [],
    setCartList: (newList) => set((state) => {
        let count = 0;
        newList.forEach((item) => {
            count += item.qty;
        });
        return { ...state, cart: newList, cartCount: count };
    }),
    setWishlist: (newList) => set((state) => {
        let count = newList.length;
        return { ...state, wishlist: newList, wishlistCount: count };
    }),
    setOrderList: (newList) => set((state) => ({ ...state, orders: newList }))
  }));
  
  export default useUser;

