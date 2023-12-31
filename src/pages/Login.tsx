import { useState } from 'react';
import authBg from '../assets/auth-bg.jpg';
import { Button, Card, Flex, Heading, Link, TextField } from '@radix-ui/themes';
import useAuth from '../store/auth';
import useGeneral from '../store/general';
import { useNavigate, Navigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import useAlert from '../store/alert';


const Login = () => {
    const isMobile = useGeneral((state: any) => state.isMobile);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const base = useAuth((state: any) => state.base);
    const navigate = useNavigate();
    const setAlert = useAlert((state: any) => state.setAlert);
    const setShowAlert = useAlert((state: any) => state.setShowAlert);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const backgroundImageStyle = {
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        // Other background properties (position, repeat, etc.) can be added here
    };


    async function loginHandler() {
        if (username === '' || password === '') {
            setAlert('Please enter all fields');
            setShowAlert(true);
            return;
        } else {
            const response = await fetch(`${base}/user/auth/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username.trim(), password: password.trim() })
            })
    
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                setAlert('Invalid username or password');
                setShowAlert(true);
            }
        }
        
    }

    return (
        <>{isLoggedIn ? <Navigate to = "/"/> : <div className={`h-[100vh] w-[100vw] grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`} style={backgroundImageStyle}>
        <Flex direction="column" gap="4" className='place-self-center'>
            <img src={logo} className={`${isMobile ? `h-auto w-[70vw]` : `h-auto w-[20vw] ml-10`} place-self-center`} />
            <Card size="1" className={`${isMobile ? `w-[85vw] h-auto place-self-center` : `w-[30vw] h-auto place-self-center ml-20`} opacity-80 border-1 border-gray-400`}>
                <Flex direction="column" gap="8">
                    <Flex direction="column" gap="6">
                        <Heading align="center" size="8">Login</Heading>
                        <TextField.Input placeholder='Username' size="3"
                            onChange={(event: any) => {
                                setUsername(event.target.value);
                            }} />
                        <TextField.Input placeholder='Password' size="3"
                            onChange={(event: any) => {
                                setPassword(event.target.value);
                            }} type="password" />
                    </Flex>
                    <Flex direction="column" gap="3">
                        <Link href='#'>Forgot Password?</Link>
                        <Button size="4" onClick={loginHandler}>Login</Button>
                        <Button size="4" onClick={() => {
                            navigate("/signup");
                        }}>Not Registered? Signup</Button>
                        <Button size="4" variant="surface"
                        onClick={() => {
                            navigate("/");
                        }}>Continue as Guest</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    </div>}</>
    );
};

export default Login;
