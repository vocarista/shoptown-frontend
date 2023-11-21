import { Card, Flex, ScrollArea, Text, Button } from '@radix-ui/themes';
import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import useGeneral from '../store/general';
// import useAuth from '../store/auth';
import useProducts from '../store/products';
import useUser from '../store/user';
import { CartItem } from '../store/user';
import { Product } from '../components/ProductCard';
import CartCard from '../components/CartCard';
import { CartProduct } from '../components/CartCard';
import Bg from  '../assets/home-bg.jpg'
// import useAlert from '../store/alert';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backGroundPosition: 'center',
};

const Cart = () => {

    const isMobile = useGeneral((state) => state.isMobile);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // const token = localStorage.getItem('token');
    // const base = useAuth((state) => state.base);
    const allProducts = useProducts((state) => state.allProducts);
    const cart = useUser((state) => state.cart);
    // const setCartList = useUser((state) => state.setCartList);
    const cartItems = useUser((state) => state.cartItems);
    const setCartItems = useUser((state) => state.setCartItems);
    const finalPrice = useUser((state) => state.finalPrice);
    const setFinalPrice = useUser((state) => state.setFinalPrice);
    // const setAlert = useAlert((state) => state.setAlert);
    // const setShowAlert = useAlert((state) => state.setShowAlert);

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
        <div style={backgroundImageStyle} className = "pb-10 h-auto min-h-screen place-items-center flex flex-col"><NavigationBar />
          {cart.length === 0 && isLoggedIn ? 
          <Card className = "text-2xl font-extralight w-[80vw] mt-10 flex flex-col place-items-center text-center"><Flex direction={`column`}>
            Hmmm... seems like there's nothing here.
          <Link to = "/"><Button size={`3`} variant = "surface" className = "mt-5" >Return to Home</Button></Link></Flex></Card>
          :<Flex direction={`column`} className = {`mt-10 w-screen h-auto place-items-center`}>
           <Card className={`${isMobile ? `w-[90vw]` : `w-[80vw]`} h-auto px-3`}>
           <Text className = {`text-5xl`}>Cart</Text>
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
        </Flex>}
        <Footer />
        </div>
    )
}

export default Cart;