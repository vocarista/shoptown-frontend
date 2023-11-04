import { Button, Card, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import React from 'react'
import wishIcon from '../assets/wishlist.png';
import useUser from '../store/user';

interface Product {
    _id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

const categories: any = {
    "men's clothing": "Men's Clothing",
    "jewelery": "Jewelery",
    "electronics": "Electronics",
    "women's clothing": "Women's Clothing"
}

const ProductCard = ({ data }: any) => {
    const {_id, title, price, description, category, image, rating }: Product = data;

    const base = `https://api.shoptown.vocarista.com`;
    const addCartItem = useUser((state: any) => state.addCartItem);
    const addWishlistItem = useUser((state: any) => state.addWishlistItem);

    const cartHandler = () => {

    }

    const wishlistHandler = () => {
            
    }

    return (
        <Card className = {`h-auto w-[320px]`}>
            <Flex direction={`column`} gap = "2">
                <Flex direction={`column`} className = "place-items-center">
                    <img src={image} className={`h-[300px] place-self-center`} />
                </Flex>
                <Heading size={`5`} className = "text-center hover:underline hover:cursor-pointer">{`${title.length > 60 ? `${title.slice(0,60)}...` : title}`}</Heading>
                <Text>{`Price: $`}<Strong>{price}</Strong>&nbsp;&nbsp;<Text className = "line-through text-gray-500 italic">{`$${(price * 1.5).toPrecision(4)}`}</Text></Text>
                <Text>{`Category: `}<Strong>{categories[category]}</Strong></Text>
                <Text>{`Rating: `}<Strong  className={`${rating.rate > 4 ? `text-green-600` : rating.rate > 3 ? `text-green-400` : rating.rate > 2 ? `text-yellow-600` : 'text-red-600'}`}>{rating.rate}/5 </Strong>({rating.count})</Text>
                <Text><Strong>Description: </Strong>{`${description.slice(0,80)}...`}</Text>
                <Flex gap = "3" className = "justify-items-center place-items-center" width="100%">
                    <Button variant = "soft" size = "3">Add to Cart</Button>
                    <Button variant = "outline" size = "3">View Details</Button>
                    <Button variant = "ghost" radius = "full"><img src = {wishIcon} className = "h-auto w-7" /></Button>
                </Flex>
            </Flex>
        </Card>
    )
}

export default ProductCard