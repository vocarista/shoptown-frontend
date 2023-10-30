import { useState, useEffect, useRef } from 'react';
import authBg from '../assets/auth-bg.jpg'
import { Button, Card, Flex, Heading, Link, TextField } from '@radix-ui/themes';
import useAuth from '../store/auth';
import useGeneral from '../store/general';
import useUser from '../store/user';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as Toast from '@radix-ui/react-toast';
import * as Form from '@radix-ui/react-form';

const Login = () => {
    const isMobile = useGeneral((state: any) => state.isMobile);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toggleIsLoggedIn = useAuth((state: any) => state.toggleIsLoggedIn);
    const setToken = useAuth((state: any) => state.setToken);
    const base = useAuth((state: any) => state.base);
    const [showError, setShowError] = useState(false);
    const setLocalUsername = useUser((state: any) => state.setUsername);
    const isLoggedIn = useAuth((state: any) => state.logg)
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover', // You can adjust this property as needed
        // Other background properties (position, repeat, etc.) can be added here
      };

      const ErrorToast = () => {
        const eventDateRef = useRef(new Date());
        const timerRef = useRef(0);
      
        useEffect(() => {
          return () => clearTimeout(timerRef.current);
        }, []);
      
        return (
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              className="bg-white opacity-95 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
              open={showError}
              onOpenChange={setShowError}
            >
              <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                Error Logging in
              </Toast.Title>
              <Toast.Description asChild>
                <time
                  className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                  dateTime={eventDateRef.current.toISOString()}
                >
                  Incorrect Username or Password
                </time>
              </Toast.Description>
              <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
                <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                  OK
                </button>
              </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
          </Toast.Provider>
        );
      };

    
      async function loginHandler() {
        axios.post(`${base}/user/auth/authenticate`, {
            username: username,
            password: password
        })
        .then((response: AxiosResponse) => {
            if (response.status === 200) {
                setToken(response.data.token);
                localStorage.setItem('token', JSON.stringify(response.data.token));
                setLocalUsername(username);
                toggleIsLoggedIn();
                navigate("/home");
            } else {
                setShowError(true);
            }
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 403) {
                setShowError(true);
            } else {
                console.log(error);
            }
        });
    }

    return (
        <>{!isLoggedIn && <div className= {`h-[100vh] w-[100vw] grid ${isMobile ? 'grid-cols-1': 'grid-cols-3'} `} style={backgroundImageStyle}>
        <Flex direction="column" gap="4" className='place-self-center'>
            <img src = {logo} className = {`${isMobile ? `h-auto w-[70vw]` : `h-auto w-[20vw] ml-10`} place-self-center`}/>
        <Card  size= "1" className = {`${isMobile ? `w-[85vw] h-auto place-self-center` :`w-[30vw] h-auto place-self-center ml-20`} opacity-80 border-1 border-gray-400`}>
            <Flex direction="column" gap = "8">
            <Flex direction= "column" gap="6">
            <Heading align="center" size="8">Login</Heading>
            <TextField.Input placeholder='Username' size="3"
            onChange = {(event: any) => {
                setUsername(event.target.value);
            }}></TextField.Input>
            <TextField.Input placeholder='Password' size="3"
            onChange = {(event: any) => {
                setPassword(event.target.value);
            }}></TextField.Input>
            </Flex>
            <Flex direction="column" gap="3">
                <Link href='#'>Forgot Password?</Link>
                <Button size="4" onClick={loginHandler}>Login</Button>
                <Button size = "4"><RouterLink to = "/signup" className="flex-grow text-center">Already a User? Signup</RouterLink></Button>
                <Button size = "4" variant="surface"><RouterLink to = "/home" className="flex-grow text-center">Continue as Guest</RouterLink></Button>
            </Flex>
            </Flex>
        </Card>
        </Flex>
        <ErrorToast />
    </div>}</>
    )
}

export default Login;