import { Button, Card, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import wishIcon from '../assets/wishlist.png';
import useUser from '../store/user';
import useError from '../store/error';
import { CartItem, WishlistItem } from '../store/user';
import useAuth from '../store/auth';

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

    const base = useAuth((state: any) => state.base);
    const setWishlist = useUser((state: any) => state.setWishlist);
    const setCartList = useUser((state: any) => state.setCartList);
    const cart: CartItem[] = useUser((state: any) => state.cart);
    const wishlist: WishlistItem[] = useUser((state: any) => state.wishlist);
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const setError = useError((state: any) => state.setError);
    const setShowError = useError((state: any) => state.setShowError);

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
            const response = await fetch(`${base}/products/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify(cartItem)
            });

            if (response.status === 200) {
                setCartList(newCart);
            } else {
                console.log('error');
                setError('An error occurred. Please try again later.');
                setShowError(true);
            }
        }
        addToCart();
    }

    const wishlistHandler = () => {
        let wishlistItem: WishlistItem 
        let hasItem: boolean = false;
        const newWishlist = wishlist.map((item: WishlistItem) => {
            if (item.productId === _id) {
                hasItem = true;
                wishlistItem = {
                    productId: _id,
                }
                return wishlistItem;
            } else {
                return item;
            }
        });

        if (!hasItem) {
            wishlistItem = {
                productId: _id,
            }
            newWishlist.push(wishlistItem);
        }

        async function addToWishlist() {
            const response = await fetch(`${base}/products/add-to-wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify(wishlistItem)
            });

            if (response.status === 200) {
                setWishlist(newWishlist);
            } else {
                setError('An error occurred. Please try again later.');
                setShowError(true);
            }
        }
        addToWishlist();
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
                            setError('Please login to add items to cart');
                            setShowError(true);
                        }
                    }}>Add to Cart</Button>
                    <Button variant = "outline" size = "3">View Details</Button>
                    <Button variant = "ghost" radius = "full" onClick = {() => {
                        if (isLoggedIn) {
                            wishlistHandler();
                        } else {
                            setError('Please login to add items to wishlist');
                            setShowError(true);
                        }
                    }}><img src = {wishIcon} className = "h-auto w-7" /></Button>
                </Flex>
            </Flex>
        </Card>
    )
}

export default ProductCard