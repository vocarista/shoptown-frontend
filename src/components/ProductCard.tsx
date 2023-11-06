import { Button, Card, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import useUser from '../store/user';
import useAlert from '../store/alert';
import { CartItem, WishlistItem } from '../store/user';
import useAuth from '../store/auth';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { useState } from 'react'; 

export interface Product {
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
    let wishlistItem: WishlistItem = {
        productId: _id,
    }

    const base = useAuth((state: any) => state.base);
    const setWishlist = useUser((state: any) => state.setWishlist);
    const setCartList = useUser((state: any) => state.setCartList);
    const cart: CartItem[] = useUser((state: any) => state.cart);
    const wishlist: WishlistItem[] = useUser((state: any) => state.wishlist);
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const setAlert = useAlert((state: any) => state.setAlert);
    const setShowAlert = useAlert((state: any) => state.setShowAlert);

    const [isWishlisted, setIsWishlisted] = useState<boolean>(wishlist.includes(wishlistItem));

    const cartHandler = () => {
        let cartItem: CartItem
        let hasItem: boolean = false;
        const newCart = cart.map((item: CartItem) => {
            if (item.productId === _id) {
                hasItem = true;
                cartItem = {
                    productId: _id,
                    qty: item.qty + 1,
                }
                return cartItem;
            } else {
                return item;
            }
        });
        if (!hasItem) {
            cartItem = {
                productId: _id,
                qty: 1,
            }
            newCart.push(cartItem);
        }

        async function addToCart() {
            const response = await fetch(`${base}/user/cart/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify(cartItem)
            });

            if (response.status === 200) {
                setCartList(newCart);
                setAlert('Added to cart');
                setShowAlert(true);
            } else {
                console.log('error');
                setAlert('An error occurred. Please try again later.');
                setShowAlert(true);
            }
        }
        addToCart();
    }

    const wishlistHandler = () => {
        const newWishlist = wishlist.filter((item: WishlistItem) => item.productId !== _id);
        if (isWishlisted) {
            async function removeFromWishlist() {
                const response = await fetch(`${base}/user/wishlist/remove`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `"Bearer ${token}"`,
                    },
                    body: JSON.stringify(wishlistItem)
                });

                if (response.status === 200) {
                    setWishlist(newWishlist);
                    setAlert('Removed from wishlist');
                    setShowAlert(true);
                } else {
                    setAlert('An error occurred. Please try again later.');
                    setShowAlert(true);
                }
            }
            removeFromWishlist();
        } else {
            const newWishlist = [...wishlist, wishlistItem];
            async function addToWishlist() {
            const response = await fetch(`${base}/user/wishlist/add-to-wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify(wishlistItem)
            });

            if (response.status === 200) {
                setWishlist(newWishlist);
                setAlert('Added to wishlist');
                setShowAlert(true);
            } else {
                setAlert('An error occurred. Please try again later.');
                setShowAlert(true);
            }
            }
            addToWishlist();
            setIsWishlisted(true);
        }
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
                    <Button variant = "soft" size = "3" onClick = {() => {
                        if (isLoggedIn) {
                            cartHandler();
                        } else {
                            setAlert('Please login to add items to cart');
                            setShowAlert(true);
                        }
                    }}>Add to Cart</Button>
                    <Button variant = "outline" size = "3">View Details</Button>
                    <Button variant = "ghost" radius = "full" onClick = {() => {
                        if (isLoggedIn) {
                            wishlistHandler();
                        } else {
                            setAlert('Please login to add items to wishlist');
                            setShowAlert(true);
                        }
                    }}>{isWishlisted ? <HeartFilledIcon className="h-auto w-7" /> : <HeartIcon className = "h-auto w-7" />}</Button>
                </Flex>
            </Flex>
        </Card>
    )
}

export default ProductCard