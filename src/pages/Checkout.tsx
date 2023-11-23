import { useState } from 'react';
import { Button, Callout, Flex, Table, Text } from '@radix-ui/themes';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Bg from '../assets/home-bg.jpg';
import NavigationBar from '../components/NavigationBar';
import useGeneral from '../store/general';
import useAlert from '../store/alert';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import useUser from '../store/user';
import useAuth from '../store/auth';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backGroundPosition: 'center',
};

const Checkout = () => {
    const isMobile = useGeneral((state) => state.isMobile);
    const setAlert = useAlert((state) => state.setAlert);
    const setShowAlert = useAlert((state) => state.setShowAlert);
    const base = useAuth((state: any) => state.base);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [country, setCountry] = useState<string>('India');
    const [fullName, setFullName] = useState<string>('John Doe');
    const [mobileNumber, setMobileNumber] = useState<string>('+910000000000');
    const [pincode, setPincode] = useState<string>('303007');
    const [houseNumber, setHouseNumber] = useState<string>('001');
    const [street, setStreet] = useState<string>('Dehmi Kalan');
    const [area, setArea] = useState<string>('Bagru');
    const [city, setCity] = useState<string>('Jaipur');
    const [state, setState] = useState<string>('Rajasthan');
    const [landmark, setLandmark] = useState<string>('Manipal University Jaipur');
    const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

    const finalPrice = useUser((state) => state.finalPrice);
    const cartItems = useUser((state) => state.cartItems);
    const cart = useUser((state) => state.cart);
    const orders = useUser((state) => state.orders)
    const setOrderList = useUser((state) => state.setOrderList);
    const setCartList = useUser((state) => state.setCartList);
    const setCartItems = useUser((state) => state.setCartItems);

    const [selectedPaymentMode, setSelectedPaymentMode] = useState('POD'); // Default to Pay On Delivery
    const [payViaCard, setPayViaCard] = useState<boolean>(false);
    const [payViaUpi, setPayViaUpi] = useState<boolean>(false);

    const handlePaymentModeChange = (e: any) => {
        const selectedMode = e.target.value;
        if (selectedMode === 'DEBIT_CARD' || selectedMode === 'CREDIT_CARD') {
            setPayViaCard(true);
            setPayViaUpi(false);
        } else if (selectedMode === 'UPI') {
            setPayViaCard(false);
            setPayViaUpi(true);
        } else {
            setPayViaCard(false);
            setPayViaUpi(false);
        }
        setSelectedPaymentMode(selectedMode);
    }

    const orderHandler = async () => {
        const response = await fetch(`${base}/user/address/add-shipping-address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `"Bearer ${token}"`,
            },
            body: JSON.stringify({
                fullName: fullName,
                mobileNumber: mobileNumber,
                pincode: pincode,
                houseNumber: houseNumber,
                street: street,
                area: area,
                city: city,
                state: state,
                landmark: landmark,
                country: country,
                defaultAddress: defaultAddress,
            })
        });

        let newOrders: any[] = cart.map((item: any) => {
            return {
                ...item,
                orderDate: new Date(Date.now()),
                paymentMode: selectedPaymentMode,
                arrivalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
        })

        if (response.status === 200) {
            const orderResponse = await fetch(`${base}/user/orders/add-to-orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                }, 
                body: JSON.stringify(newOrders)
            });

            if (orderResponse.status === 200) {
                const allOrders = [...orders, ...newOrders];
            const cartResponse = await fetch(`${base}/user/cart/empty`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                }
            });

            if (cartResponse.status === 204) {
                setOrderList(allOrders);
                setCartList([]);
                setCartItems([]);
                setAlert('Order placed successfully');
                setShowAlert(true);
                navigate('/');
            } else {
                setAlert('Error emptying cart');
                setShowAlert(true);
            }
            }

            
        } else {
            setAlert('Error adding address');
            setShowAlert(true);
        }
    }

    return (<div style = {backgroundImageStyle} className = "h-auto pb-5 min-h-screen">
        <NavigationBar />
        <div className={`flex flex-col w-screen place-items-center mt-3 mb-24`}>
            <Flex direction={`column`} className = {`${isMobile ? `w-[90vw]` : `w-[80vw]`}`}>
            <Accordion defaultActiveKey={['2']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Delivery Address</Accordion.Header>
                  <Accordion.Body>
                  <Flex direction={`column`} gap="4">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            onChange={(event) => {
                                setFullName(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter mobile number"
                            onChange={(event) => {
                                setMobileNumber(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            onChange={(event) => {
                                setCountry(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pincode"
                            onChange={(event) => {
                                setPincode(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicHouseNumber">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter house number"
                            onChange={(event) => {
                                setHouseNumber(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter street"
                            onChange={(event) => {
                                setStreet(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicArea">
                        <Form.Label>Area</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter area"
                            onChange={(event) => {
                                setArea(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            onChange={(event) => {
                                setCity(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter state"
                            onChange={(event) => {
                                setState(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicLandmark">
                        <Form.Label>Landmark</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter landmark"
                            onChange={(event) => {
                                setLandmark(event.target.value);
                            }}
                        />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicDefaultAddress">
                        <Form.Check
                            type="switch"
                            label="Set as Default Address"
                            onChange={(event) => {
                                setDefaultAddress(event.target.checked);
                            }}
                        />
                    </Form.Group>
                </Form>
            </Flex>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Payment Method</Accordion.Header>
                    <Accordion.Body>
                    <Form>
                        <Form.Group controlId="paymentMode">
                            <Form.Check
                                type="radio"
                                label="Pay On Delivery"
                                name="paymentMode"
                                value="POD"
                                checked={selectedPaymentMode === 'POD'}
                                onChange={handlePaymentModeChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Debit Card"
                                name="paymentMode"
                                value="DEBIT_CARD"
                                checked={selectedPaymentMode === 'DEBIT_CARD'}
                                onChange={handlePaymentModeChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Credit Card"
                                name="paymentMode"
                                value="CREDIT_CARD"
                                checked={selectedPaymentMode === 'CREDIT_CARD'}
                                onChange={handlePaymentModeChange}
                            />
                            <Form.Check
                                type="radio"
                                label="UPI"
                                name="paymentMode"
                                value="UPI"
                                checked={selectedPaymentMode === 'UPI'}
                                onChange={handlePaymentModeChange}
                            />
                        </Form.Group>
                    </Form>
                    {
                        payViaCard ? <Flex direction={`column`} gap="4" className = "mt-4">
                            <Callout.Root variant='soft'>
                              <Callout.Icon>
                                <InfoCircledIcon />
                              </Callout.Icon>
                              <Callout.Text>These forms are only for visual representation, they do not work. Please don't
                                enter any sensitive information
                              </Callout.Text>
                            </Callout.Root>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter card number"
                                />
                            </Form.Group>
        
                            <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                                <Form.Label>Card Holder Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter card holder name"
                                />
                            </Form.Group>
        
                            <Form.Group className="mb-3" controlId="formBasicCountry">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter expiry date"
                                />
                            </Form.Group>
        
                            <Form.Group className="mb-3" controlId="formBasicPincode">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter CVV"
                                />
                            </Form.Group>
                        </Form>
                        </Flex> : payViaUpi ? <Flex direction={`column`} gap="4" className = "mt-4">
                        <Callout.Root variant='soft'>
                              <Callout.Icon>
                                <InfoCircledIcon />
                              </Callout.Icon>
                              <Callout.Text>These forms are only for visual representation, they do not work. Please don't
                                enter any sensitive information
                              </Callout.Text>
                            </Callout.Root>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>UPI ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter UPI ID"
                                />
                            </Form.Group>
                        </Form>
                        </Flex> : <></>
                    }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Order Summary</Accordion.Header>
                    <Accordion.Body>
                        <Flex direction={`column`} gap="4" className = "mt-4">
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                            {cartItems.map((item: any) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell><img src = {item.image} className = "h-auto w-7" /></Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>{item.qty}</Table.Cell>
                                        <Table.Cell>${item.price}</Table.Cell>
                                        <Table.Cell>${item.qty * item.price}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell><Text size = "3" className = "font-semibold">${finalPrice}</Text></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell><Button size={`${isMobile ? `2` : `3`}`} variant = "surface" onClick = {orderHandler} className = "py-4">Place Order</Button></Table.Cell>
                            </Table.Row>
                            </Table.Body>
                            </Table.Root>
                        </Flex>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </Flex>
        </div><Footer /></div>
    )
}

export default Checkout;