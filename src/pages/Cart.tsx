import { Card, Flex, ScrollArea, Text, Button } from '@radix-ui/themes';
import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import useGeneral from '../store/general';
import useAuth from '../store/auth';
import useProducts from '../store/products';
import useUser from '../store/user';
import { CartItem } from '../store/user';
import { Product } from '../components/ProductCard';
import CartCard from '../components/CartCard';
import { CartProduct } from '../components/CartCard';
import Bg from  '../assets/home-bg.jpg'
import useAlert from '../store/alert';
import { Link } from 'react-router-dom';
// import { Card } from '@radix-ui/themes'


const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backGroundPosition: 'center',
    // Other background properties (position, repeat, etc.) can be added here
};

const Cart = () => {

    const isMobile = useGeneral((state) => state.isMobile);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    const base = useAuth((state) => state.base);
    const allProducts = useProducts((state) => state.allProducts);
    const cart = useUser((state) => state.cart);
    const setCartList = useUser((state) => state.setCartList);
    const cartItems = useUser((state) => state.cartItems);
    const setCartItems = useUser((state) => state.setCartItems);
    const finalPrice = useUser((state) => state.finalPrice);
    const setFinalPrice = useUser((state) => state.setFinalPrice);
    const setAlert = useAlert((state) => state.setAlert);
    const setShowAlert = useAlert((state) => state.setShowAlert);

    useEffect(() => {
        if (isLoggedIn) {
          async function getCart() {
            const response = await fetch(`${base}/user/cart`, {
              method: 'GET',
              headers: {
                'Authorization': `"Bearer ${token}"`,
                'Content-Type': 'application/json',
              },
            });
            if (response.status === 200) {
              const data = await response.json();
              setCartList(data);
            } else {
              setAlert('An error occurred. Please try again later.');
              setShowAlert(true);
            }
          }
          getCart();
        }
      }, [cart])

    useEffect(() => {
        const cartProducts: Product[] = allProducts.filter((item: Product) => {
            return cart.some((cartItem: CartItem) => cartItem.productId === item._id);
        });

        const finalCartProducts: any = cartProducts.map((item: Product) => {
            const cartItem = cart.find((cartItem: CartItem) => cartItem.productId === item._id);
            return {
                ...item,
                qty: cartItem?.qty
            }
        })

        setCartItems(finalCartProducts);
        let total: number = 0;
        finalCartProducts.forEach((item: CartProduct) => {
            total += item.qty * item.price;
        })
        setFinalPrice(parseFloat(total.toFixed(2)));
    }, [])

    return (
        <div style={backgroundImageStyle} className = "pb-10"><NavigationBar />
        <Flex direction={`column`} className = {`mt-10 w-screen h-auto place-items-center`}>
           <Card className={`${isMobile ? `w-[90vw]` : `w-[80vw]`} h-auto`}>
           <Text className = {`text-5xl font-thin`}>Cart</Text>
           <ScrollArea type='auto' scrollbars='vertical'>
           <Flex direction = 'column' gap = "6" className = "mt-10 border-b-2 pb-3">
            {
                cartItems.map((item: Product) => {
                    return <CartCard data = {item} />
                })
            }
           </Flex>
           </ScrollArea>
           <Flex direction={`row`} className = {`mt-4`}>
                <Text className = {`text-3xl flex-1`} >Total: </Text>
                <Flex direction = "column" className = "place-items-center" gap = "6" >
                    <Text className = "font-semibold text-2xl">${finalPrice}</Text>
                    <Button variant = "surface" size={`4`} ><Link className="no-underline text-black" to = "/checkout">Checkout</Link></Button>
                </Flex>
           </Flex>
           </Card>
        </Flex></div>
    )
}

export default Cart;