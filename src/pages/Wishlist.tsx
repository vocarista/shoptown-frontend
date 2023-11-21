import useUser from "../store/user";
import useAlert from "../store/alert";
import useGeneral from "../store/general";
import useAuth from "../store/auth";
import { useEffect, useState } from "react";
import Bg from "../assets/home-bg.jpg";
import { Button, Card, Flex, Heading, Strong, Text } from "@radix-ui/themes";
import useProducts from "../store/products";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backGroundPosition: 'center',
};

const Wishlist = () => {
    const base = useAuth((state) => state.base);
    const token = localStorage.getItem('token');
    const setWishlist = useUser((state) => state.setWishlist);
    const setAlert = useAlert((state) => state.setAlert);
    const setShowAlert = useAlert((state) => state.setShowAlert);
    const allProducts = useProducts((state) => state.allProducts);
    const isMobile = useGeneral((state) => state.isMobile);
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchWishlist() {
            const response = await fetch(`${base}/user/wishlist`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setWishlist(data);
                const finalWishlistItems: any[] = data.map((wishlistItem: any) => {
                    const product = allProducts.find((product: any) => product._id === wishlistItem.productId);
                    return {
                        ...product
                    }
                });
                setWishlistItems(finalWishlistItems);
            } else {
                console.log('Error fetching wishlist');
                setAlert('Error fetching wishlist');
                setShowAlert(true);
            }
        }
        fetchWishlist();
    }, [])

  return (
    <div style = {backgroundImageStyle} className = {`min-h-screen h-auto flex flex-col gap-3 place-items-center`}>
        <NavigationBar />
        <Card className = {`w-[90vw] h-auto pb-3 mb-28`}>
            <Heading className = "text-center mb-3" size = "5">Wishlist</Heading>
            <Flex direction = "column" gap = "4">
                {
                    wishlistItems.map((item: any) => {
                        return (
                            <Card className = "h-auto w-[85vw] shadow-sm shadow-slate-700">
                                <Flex direction = "row" gap = "3">
                                    <img src = {item.image} className = {`${isMobile ? `w-10` : `w-[100px]`} h-fit`} />
                                    <Flex direction = "column" gap = "1">
                                        <Text className = "font-semibold">{item.title}</Text>
                                        <Text><Text className = "font-semibold">Description: </Text>{item.description.substring(0, 80)}</Text>
                                        <Text className = "font-thin">Category: <Text className = "font-semibold">{item.category}</Text></Text>
                                        <Text>{`Rating: `}<Strong  className={`${item.rating.rate > 4 ? `text-green-600` : item.rating.rate > 3 ? `text-green-400` : item.rating.rate > 2 ? `text-yellow-600` : 'text-red-600'}`}>{item.rating.rate}/5 </Strong>({item.rating.count})</Text>
                                        <Text className = "font-thin">Price: <Text className = "font-semibold">${item.price}</Text></Text>
                                    </Flex>
                                </Flex>
                            </Card>
                        )
                    })
                }
            <Link className= "place-self-center mt-3" to = "/"><Button size = "4" variant = "surface">Home</Button></Link>
            </Flex>
        </Card>
        <Footer />
    </div>
  )
}

export default Wishlist