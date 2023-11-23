import { useState } from 'react';
import authBg from '../assets/auth-bg.jpg';
import { Button, Card, Flex, Heading, Link, TextField } from '@radix-ui/themes';
import useAuth from '../store/auth';
import useGeneral from '../store/general';
import { useNavigate, Navigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import useAlert from '../store/alert';

const Signup = () => {
    const isMobile = useGeneral((state: any) => state.isMobile);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const base = useAuth((state: any) => state.base);
    const setShowAlert = useAlert((state: any) => state.setShowAlert);
    const setAlert = useAlert((state: any) => state.setAlert);
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
    };

    async function signupHandler() {
        if (username === '' || password === '' || firstName === '' || lastName === '') {
            setAlert('Please enter all fields');
            setShowAlert(true);
            return;
        } else {
            const checkResponse = await fetch(`${base}/user/auth/is-username-available`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username)
            })
    
            if (checkResponse.status === 200) {
                const isAvailable = await checkResponse.text()
                let isUsernameAvailable: boolean = isAvailable === 'true';
    
                if (isUsernameAvailable) {
                    const response = await fetch(`${base}/user/auth/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: username, password: password, firstname: firstName, lastname: lastName })
                    });
    
                    if (response.status === 200) {
                        const data = await response.json();
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('username', username);
                        localStorage.setItem('isLoggedIn', 'true');
                        navigate('/');
                    } else {
                        setShowAlert(true);
                        setAlert('An error occurred. Please try again later.');
                    }
                } else {
                    setShowAlert(true);
                    setAlert('Username is not available');
                }
            }
        }
    }

    return (
        <>{isLoggedIn ? <Navigate to="/" /> : (
            <div className={`h-[100vh] grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`} style={backgroundImageStyle}>
                <Flex direction="column" gap="4" className='place-self-center'>
                    <img src={logo} className={`${isMobile ? `h-auto w-[70vw]` : `h-auto w-[20vw] ml-10`} place-self-center`} />
                    <Card size="1" className={`${isMobile ? `w-[85vw] h-auto place-self-center` : `w-[30vw] h-auto place-self-center ml-20`} opacity-80 border-1 border-gray-400`}>
                        <Flex direction="column" gap="8">
                            <Flex direction="column" gap="6">
                                <Heading align="center" size="8">Register</Heading>
                                <Flex gap="2">
                                    <TextField.Input placeholder='First Name' size="3" onChange={(event: any) => setFirstName(event.target.value)} />
                                    <TextField.Input placeholder='Last Name' size="3" onChange={(event: any) => setLastName(event.target.value)} />
                                </Flex>
                                <TextField.Input placeholder='Username' size="3" onChange={(event: any) => setUsername(event.target.value)} />
                                <TextField.Input placeholder='Password' size="3" onChange={(event: any) => setPassword(event.target.value)} type="password" />
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Link href='#'>Forgot Password?</Link>
                                <Button size="4" onClick={signupHandler}>Register</Button>
                                <Button size="4" onClick={() => {
                                    navigate("/login");
                                }}>Already a user? Login</Button>
                                <Button size="4" variant="surface" onClick={() => {
                                    navigate("/");
                                }}>Continue as Guest</Button>
                            </Flex>
                        </Flex>
                    </Card>
                </Flex>
            </div>
        )}</>
    );
};

export default Signup;
