import useUser from '../store/user';
import useAlert from '../store/alert';
import useAuth from '../store/auth';
import useGeneral from '../store/general';
import { useEffect, useState } from 'react';
import Bg from '../assets/home-bg.jpg';
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import useProducts from '../store/products';
import NavigationBar from '../components/NavigationBar';
import { Link } from 'react-router-dom';

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backGroundPosition: 'center',
};

const Orders = () => {
    const base = useAuth((state) => state.base);
    const token = localStorage.getItem('token');
    const setOrderList = useUser((state) => state.setOrderList);
    const setAlert = useAlert((state) => state.setAlert);
    const setShowAlert = useAlert((state) => state.setShowAlert);
    const allProducts = useProducts((state) => state.allProducts);
    const [orderItems, setOrderItems] = useState<any[]>([]);
    const isMobile = useGeneral((state) => state.isMobile);

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch(`${base}/user/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setOrderList(data);
                const finalOrderItems: any[] = data.map((order: any) => {
                    const product = allProducts.find((product: any) => product._id === order.productId);
                    return {
                        ...order,
                        image: product.image,
                        title: product.title,
                        price: product.price,
                        category: product.category,
                    }
                })
                setOrderItems(finalOrderItems);
            } else {
                console.log('Error fetching orders');
                setAlert('Error fetching orders');
                setShowAlert(true);
            }
        }
        fetchOrders();


    }, [])


    return (
        <div style = {backgroundImageStyle} className="orders w-screen h-auto min-h-screen flex flex-col place-items-center gap-3">
            <NavigationBar />
            <Card className = "w-[90vw] h-auto pb-4">
                <Flex direction = "column" gap = "4">
                    <Heading>Orders</Heading>
                    <Flex direction = "column" gap = "4" >
                        {orderItems.map((order: any) => {
                            return (
                                <Card className = {`shadow-black shadow-sm w-[85vw] h-auto`} >
                                   <Flex direction={`row`} gap = "3">
                                        <img src = {order.image} className = {`${isMobile ? `w-10 h-10` : `w-[100px] h-auto`}`} />
                                        <Flex direction = "column" className = "flex-1">
                                            <Text>{order.title}</Text>
                                            <Text className = "font-thin">Category: <Text className = "font-semibold">{order.category}</Text></Text>
                                            <Text className = "font-thin">Price: <Text className = "font-semibold">${order.price}</Text></Text>
                                            <Text className = "font-thin">Quantity: <Text className = "font-semibold">{order.qty}</Text></Text>
                                        </Flex>
                                        <Text className = "font-thin">Total: <Text className = "font-semibold">${order.qty * order.price}</Text></Text>
                                   </Flex>
                                </Card>
                            )
                        })}
                    </Flex>
                    <Link className= "place-self-center" to = "/"><Button size = "4" variant = "surface">Home</Button></Link>
                </Flex>
            </Card>
        </div>
    )
}

export default Orders;