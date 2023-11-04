import { create } from 'zustand';

interface Products {
    allProducts: any[];
    displayProducts: any[];
}

interface SetProducts {
    setAllProducts: (productList: object[]) => void;
    setDisplayProducts: (category: string) => void;
    resetDisplayProducts: () => void; 
}

const useProducts = create<Products & SetProducts>(set => ({
   allProducts: [],
   displayProducts: [],
   setAllProducts: (productList) => set((state: any) => ({ ...state, allProducts: productList })),
   setDisplayProducts: (products) => set((state: any) => ({ ...state, displayProducts: products })),
   resetDisplayProducts: () => set((state: any) => ({ ...state, displayProducts: state.allProducts })),

}))

export default useProducts;