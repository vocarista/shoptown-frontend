import { create } from 'zustand';

interface UserState {
    cart: CartItem[];
    orders: OrderItem[];
    wishlist: WishlistItem[];
    cartCount: number;
    wishlistCount: number;
    finalPrice: number;
    cartItems: any[];
}

interface UserActions {
    setCartList: (newList: CartItem[]) => void;
    setWishlist: (newList: WishlistItem[]) => void;
    setOrderList: (newList: OrderItem[]) => void;
    setFinalPrice: (newPrice: number) => void;
    setCartItems: (newList: any[]) => void;
}

export interface CartItem {
    productId: string,
    qty: number,
}

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    wishlist: WishlistItem[];
    orderlist: OrderItem[];
    cartlist: CartItem[];
    role: string;
    email: string;
    phone: string;
    dob: Date;
    shippingList: Address[];
    billingAddress: Address;
}

export interface Address {
    country: string;
    fullName: string;
    mobileNumber: string;
    pincode: string;
    houseNumber: string;
    street: string;
    area: string;
    city: string;
    state: string;
    landmark: string;
    defaultAddress: boolean;
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
    finalPrice: 0,
    cartItems: [],
    setCartItems: (newList) => set((state) => ({ ...state, cartItems: newList })),
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
    setOrderList: (newList) => set((state) => ({ ...state, orders: newList })),
    setFinalPrice: (newPrice) => set((state) => ({ ...state, finalPrice: newPrice })),
  }));
  
  export default useUser;

