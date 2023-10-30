import { } from "react";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router";

const Home = () => {
    const navigate = useNavigate(); 
    return <div>
        Home
        <Button onClick = {() => {
            navigate('/login')
        }}>Login</Button>
    </div>
}

export default Home