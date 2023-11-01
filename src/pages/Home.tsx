import { } from "react";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import NavigationBar from "../components/NavigationBar";
import useAuth from "../store/auth";
import Bg from "../assets/home-bg.jpg";

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: 'cover',
    // Other background properties (position, repeat, etc.) can be added here
};

const Home = () => {
    const navigate = useNavigate(); 
    return <div style={backgroundImageStyle} className="w-screen h-screen">
        <NavigationBar />
    </div>
}

export default Home