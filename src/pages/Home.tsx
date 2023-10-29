import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import useProducts from '../store/products';
import useUser from '../store/user';
import dropIcon from '../assets/down-filled-triangular-arrow.png'
import { motion } from 'framer-motion';

// const Banners = () => {
//     return (
//         <div className="banner-container mt-10 p-5 overflow-auto h-[60vh] w-[100vw] flex flex-row place-items-center gap-10">
//             <div className="hover:scale-105 w-[60vw] bg-slate-200 text-black flex flex-col place-items-center shadow-md shadow-black rounded-lg hover:shadow-xl duration-200 hover:shadow-black h-[40vh]">
//                 <div className = {`p-5 flex flex-col justify-center place-items-center h-full gap-10`}>
//                   <div className = {`text-5xl font-bold`}>A Banner</div>
//                   <div className = {`text-2xl font-semibold`}>
//                     This section can be used to feature a product.
//                   </div>
//                   <div className = {`text-2xl font-semibold`}>Last updated 3 mins ago</div>
//                 </div>
//             </div>
//             <div className="hover:scale-105 w-[60vw] bg-slate-200 text-black flex flex-col place-items-center shadow-md shadow-black rounded-lg hover:shadow-xl duration-200 hover:shadow-black h-[40vh]">
//                 <div className = {`p-5 flex flex-col justify-center place-items-center h-full gap-10`}>
//                   <div className = {`text-5xl font-bold`}>Another Banner</div>
//                   <div className = {`text-2xl font-semibold`}>
//                     This section can be used to feature a product.
//                   </div>
//                   <div className = {`text-2xl font-semibold`}>Last updated 3 mins ago</div>
//                 </div>
//             </div>
//             <div className="hover:scale-105 w-[60vw] bg-slate-200 text-black flex flex-col place-items-center shadow-md shadow-black rounded-lg hover:shadow-xl duration-200 hover:shadow-black h-[40vh]">
//                 <div className = {`p-5 flex flex-col justify-center place-items-center h-full gap-10`}>
//                   <div className = {`text-5xl font-bold`}>A Banner</div>
//                   <div className = {`text-2xl font-semibold`}>
//                     This section can be used to feature a product.
//                   </div>
//                   <div className = {`text-2xl font-semibold`}>Last updated 3 mins ago</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const Home = () => {
    const currentProducts = useProducts((state: any) => state.currentProducts);
    const allProducts = useProducts((state: any) => state.allProducts);
    const setCurrentProducts = useProducts((state: any) => state.setCurrentProducts);
    const currentCategory = useProducts((state: any) => state.currentCategory);
    const setCurrentCategory = useProducts((state: any) => state.setCurrentCategory);
    const [categories, setCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const allSortCriteria = ['Price', 'Ratings', 'None'];

    useEffect(() => {
        setCurrentProducts(currentCategory);
    }, [currentCategory]);

    useEffect(() => {
        const cat = allProducts.map((product: any) => product.category);
        const catUnique = cat.filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) == index;
        });

        setCategories(catUnique);
    }, [allProducts]);

    const ProductsGrid = () => {

        const SelectCategory = () => {
            const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State to track menu open/closed
            const toggleCategory = () => {
                setIsCategoryOpen(!isCategoryOpen); // Toggle the menu state
            };
            const closeCategory = () => {
                setIsCategoryOpen(false); // Close the menu
            };
            return (
                <div className="relative">
                    <button
                        onClick={toggleCategory}
                        className={`flex-row place-items-center font-bold text-xl text-black w-40 bg-white hover:bg-slate-200 duration-150 rounded-lg flex justify-center items-center h-10`}
                    >
                        Category
                        <img src = { dropIcon } className = { `ml-2 mt-2 h-4 w-4` }/>
                    </button>
                    {isCategoryOpen && (
                        <motion.div
                            initial = {{top: "-100px", opacity: "0", scale: 0}}
                            animate = {{top: "50px", opacity: "1", scale: 1}}
                            transition= {{duration: 0.1, ease: "easeInOut"}}
                            className={`absolute top-full left-0 w-40 text-black bg-white rounded-lg ease duration-150 shadow-lg shadow-slate-700`}
                            onClick={closeCategory} // Close the menu when clicked outside
                        >
                            <button
                                onClick={() => {
                                    setCurrentCategory('All Products');
                                    closeCategory(); // Close the menu when a category is clicked
                                }}
                                className="hover:bg-slate-200 duration-150 p-3 text-lg w-full text-left rounded-lg"
                            >
                                All Products
                            </button>
                            {categories.map((category: string) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setCurrentCategory(category);
                                        closeCategory(); // Close the menu when a category is clicked
                                    }}
                                    className="hover:bg-slate-200 duration-100 p-3 text-lg w-full text-left rounded-lg"
                                >
                                    {category}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            );
        };

        const SelectSort = () => {
            const [isSortOpen, setIsSortOpen] = useState(false); // State to track menu open/closed
            const toggleSort = () => {
                setIsSortOpen(!isSortOpen);
            }

            const closeSort = () => {
                setIsSortOpen(false)
            }
            return (
                <div className="relative">
                    <button
                        onClick={toggleSort}
                        className={`flex-row place-items-center font-bold text-xl text-black w-40 bg-white hover:bg-slate-200 duration-150 rounded-lg flex justify-center items-center h-10`}
                    >
                        Sort By
                        <img src = { dropIcon } className = { `ml-2 mt-2 h-4 w-4` }/>
                    </button>
                    {isSortOpen && (
                        <motion.div
                            initial = {{top: "-50px", opacity: "0", scale: 0}}
                            animate = {{top: "50px", opacity: "1", scale: 1}}
                            transition= {{duration: 0.1, ease: "easeInOut"}}
                            className={`absolute top-full left-0 w-40 text-black bg-white rounded-lg ease duration-150 shadow-lg shadow-slate-700`}
                            onClick={closeSort} // Close the menu when clicked outside
                        >
                            {allSortCriteria.map((criteria: string) => (
                                <button
                                    key={criteria}
                                    onClick={() => {
                                        setSortCriteria(criteria);
                                        closeSort(); // Close the menu when a category is clicked
                                    }}
                                    className="hover:bg-slate-200 duration-100 p-3 text-lg w-full text-left rounded-lg"
                                >
                                    {criteria}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            );
        };


        return (
        <div className="products-container">
            <div className="controls flex flex-row gap-10 w-[100vw] h-[9vh] bg-slate-600 p-3 place-items-center">
                <div className = {'flex-shrink text-2xl font-semibold text-white place-content-start'}>{ currentCategory }</div>
                <SelectCategory />
                <SelectSort />
            </div>
        </div>
        );
    }

    return (
        <div className="home">
            <Navbar />
            <ProductsGrid />
            
        </div>
    )
}

export default Home;