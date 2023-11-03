import { } from "react";
import NavigationBar from "../components/NavigationBar";
// import useAuth from "../store/auth";
import Bg from "../assets/home-bg.jpg";
// import useProducts from "../store/products";

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: 'cover',
    // Other background properties (position, repeat, etc.) can be added here
};

const Home = () => {
    // const setAllProducts = useProducts((state: any) => state.setAllProducts);
    return <div style={backgroundImageStyle} className="w-screen h-screen">
        <NavigationBar />

    </div>
}

export default Home