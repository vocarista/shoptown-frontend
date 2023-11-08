import { Button, Card, Checkbox, Flex } from '@radix-ui/themes';
import { useState,  } from 'react';
import useProducts from '../store/products';
import useGeneral from '../store/general';
import Form from "react-bootstrap/Form";

const categories = [
    "All Products",
    "Men's Clothing",
    "Jewelery",
    "Electronics",
    "Women's Clothing",
]

const SideBar = () => {
    const setDisplayProducts = useProducts((state: any) => state.setDisplayProducts);
    const resetDisplayProducts = useProducts((state: any) => state.resetDisplayProducts);
    const [category, setCategory] = useState<string>('All Products');
    const isMobile = useGeneral((state: any) => state.isMobile);
    const allProducts = useProducts((state: any) => state.allProducts);
    const [sortPrice, setSortPrice] = useState<boolean>(false);
    const [sortRatings, setSortRatings] = useState<boolean>(false);


    const categoryChangeHandler = (event: any) => {
        console.log("Category: ", event.target.value);
        setCategory(event.target.value);
        if (event.target.value === `all products`) {
            resetDisplayProducts();
        } else {
            const newShowProducts: any[] = [];
            allProducts.forEach((product: any) => {
                if (product.category === event.target.value) {
                    newShowProducts.push(product);
                }
            });
            setDisplayProducts(newShowProducts);
        }
    }

    const MobileSideBar = () => {
        return (
            <Flex direction={"column"} gap = "4">
                <Form.Select size ="lg" onChange={categoryChangeHandler} value = {category}>
                    {
                        categories.map((category: string) => {
                            return <option value={category.toLowerCase()}>{category}</option>
                        })
                    }
                </Form.Select>
                <Button variant = "soft" size = "3" onClick = {() => {
                    setCategory('All Products');
                    resetDisplayProducts();
                }}>Clear Search</Button>
                <Flex direction={`row`} gap = "6" className = "text-xl">
                    Sort By:
                    <Flex gap = "2" className = "place-items-center">
                        <Button variant='ghost'  size={`4`} className = "text-black"><Checkbox checked = {sortPrice} id='priceCheckbox' onCheckedChange={(event) => {
                            setSortPrice(event ? true : false);
                        }} size={`3`} /><label htmlFor = "priceCheckbox">Price</label></Button>
                    </Flex>
                    <Flex gap = "2"  className = "place-items-center">
                        <Button variant = "ghost" size={`4`} className = "text-black"><Checkbox checked = {sortRatings} id = "ratingsCheckbox" size={`3`} onCheckedChange={(event) => {
                            setSortRatings(event ? true : false);
                        }}/><label htmlFor='ratingsCheckbox'>Ratings</label></Button>
                    </Flex>
                </Flex>
            </Flex>
        )
    }

    const  DesktopSideBar = () => {
        return (
            <Flex direction={"column"} gap = "4" className = "p-3">
                <Form.Select size ="lg" onChange={categoryChangeHandler} value = {category}>
                    {
                        categories.map((category: string) => {
                            return <option value={category.toLowerCase()}>{category}</option>
                        })
                    }
                </Form.Select>
                <Button variant = "soft" size = "3" onClick = {resetDisplayProducts}>Clear Search</Button>
                <Flex direction={`column`} gap = "4" className = "text-xl">
                    Sort By:
                    <Flex gap = "2" className = "place-items-center">
                        <Button variant='ghost'  size={`4`} className = "text-black p-2"><Checkbox checked = {sortPrice} id='priceCheckbox' onCheckedChange={(event) => {
                            setSortPrice(event ? true : false);
                        }} size={`3`} /><label htmlFor = "priceCheckbox">Price</label></Button>
                    </Flex>
                    <Flex gap = "2"  className = "place-items-center">
                        <Button variant = "ghost" size={`4`} className = "text-black p-2"><Checkbox checked = {sortRatings} id = "ratingsCheckbox" size={`3`} onCheckedChange={(event) => {
                            setSortRatings(event ? true : false);
                        }}/><label htmlFor='ratingsCheckbox'>Ratings</label></Button>
                    </Flex>
                </Flex>
            </Flex>
        )
    }

  return (
    <Card className = {`${isMobile ? `w-[95vw]` : `w-auto`} mr-4`}>
        {isMobile ? <MobileSideBar /> : <DesktopSideBar /> }
    </Card>
  )
}

export default SideBar