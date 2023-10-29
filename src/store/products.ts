import { create } from 'zustand';

interface Products {
    allProducts: object[];
    currentProducts: object[];
    currentCategory: string;
}

interface SetProducts {
    setAllProducts: (productList: object[]) => void;
    setCurrentProducts: (category: string) => void;
    setCategory: (category: string) => void;
}

const useProducts = create<Products & SetProducts>(set => ({
   allProducts: [],
   currentProducts: [],
   currentCategory: 'All Products',
   setAllProducts: (productList) => set((state: any) => ({ ...state, allProducts: productList })),
   setCurrentProducts: (category) => set((state: any) => {
     if (category === 'All Products') {
        return { ...state, currentProducts: state.allProducts }
     } else {
        return state.allProducts.filter((product: any) => product.category === state.currentCategory);
     }
   }),
   setCategory: (category) => set((state: any) => ({ ...state, currentCategory: category }))

}))

export default useProducts;