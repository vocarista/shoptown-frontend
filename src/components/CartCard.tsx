import { Button, Flex, Strong, Text } from '@radix-ui/themes';
import { PlusCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react';
import { Product } from './ProductCard';
import useGeneral from '../store/general';
import useAuth from '../store/auth';
import useUser from '../store/user';
import useAlert from '../store/alert';
import { useNavigate } from 'react-router';

export interface CartProduct extends Product {
  qty: number;
}

const categories: any = {
  "men's clothing": "Men's Clothing",
  "jewelery": "Jewelry",
  "electronics": "Electronics",
  "women's clothing": "Women's Clothing",
};

const CartCard = ({ data }: any) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isMobile = useGeneral((state) => state.isMobile);
  const { _id, title, price, category, image, qty }: CartProduct = data;
  const [count, setCount] = useState<number>(qty);
  const setCartList = useUser((state: any) => state.setCartList);
  const cart = useUser((state: any) => state.cart);
  const setAlert = useAlert((state: any) => state.setAlert);
  const setShowAlert = useAlert((state: any) => state.setShowAlert);
  const navigate = useNavigate();

  const quantityHandler = (newQuantity: number) => {
    async function updateCart() {
        const token = localStorage.getItem('token');
        const base = useAuth((state: any) => state.base);
        let response: any;
        if (newQuantity > 0) {
            response = await fetch(`${base}/user/cart/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify({ productId: _id, qty: newQuantity })
            })
        } else {
            response = await fetch(`${base}/user/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
                body: JSON.stringify({ productId: _id })
            })
        }

        if (response.status === 200) {
            if (newQuantity > 0) {
                let newCart = cart.forEach((item: any) => {
                    if (item._id === _id) {
                        item.qty = newQuantity;
                    }
                })
    
                setCartList(newCart);
            } else {
                let newCart = cart.filter((item: any) => item._id !== _id);
                setCartList(newCart);
            }
        } else {
            setAlert('Error updating cart');
            setShowAlert(true);
        }
    }

    updateCart();
    navigate(`/cart`)
  }

  return (
    <Flex direction="row" gap="5">
      <img src={image} className={`w-20 ${isMobile ? `h-24` : ``}`} />
      <Flex direction="column" className={`flex-1`}> {/* Use flex="1" to fill available space */}
        <Text size="4">{title}</Text>
        <Text>Category: <Strong>{categories[category]}</Strong></Text>
        <Flex direction={`row`} className = "mt-3" gap = "4">
            <Button variant={`ghost`} className={`ml-2`} onClick = {() => {
                setCount(() => {
                    quantityHandler(count+1);
                    return count + 1;
                });
            }}><PlusCircledIcon className = "h-auto w-7" /></Button><p className = "text-2xl">{count}</p>
            <Button variant={`ghost`} className={`ml-2`} onClick = {() => {
                setCount(() => {
                    quantityHandler(count-1);
                    return count - 1;
                });
            }}><MinusCircledIcon className = "h-auto w-7" /></Button>
        </Flex>
      </Flex>
      <Flex direction={`column`}>
      <Text className={`${isMobile ? `` : `text-xl`}`}><Strong>Price: $</Strong>{price}</Text> {/* Price at the right end */}
      </Flex>
    </Flex>
  );
};

export default CartCard;
