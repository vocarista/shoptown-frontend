import { create } from 'zustand';

interface Products {
    allProducts: any[];
    displayProducts: any[];
    currentCategory: string;
}

interface SetProducts {
    setAllProducts: (productList: object[]) => void;
    setDisplayProducts: (category: string) => void;
    setCategory: (category: string) => void;
}

const useProducts = create<Products & SetProducts>(set => ({
   allProducts: [],
   displayProducts: [],
   currentCategory: 'All Products',
   setAllProducts: (productList) => set((state: any) => ({ ...state, allProducts: productList })),
   setDisplayProducts: (products) => set((state: any) => ({ ...state, displayProducts: products })),
   setCategory: (category) => set((state: any) => ({ ...state, currentCategory: category })),

}))

export default useProducts;