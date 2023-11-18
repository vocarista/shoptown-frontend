import { useEffect, useState } from 'react';
import useGeneral from '../store/general';
import useAlert from '../store/alert';
import useAuth from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { User, Address } from '../store/user';
import Bg from '../assets/home-bg.jpg';
import { Button, Card, Dialog, Flex, Heading, Table, Text, TextField } from '@radix-ui/themes';
import { Accordion, Form } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const backgroundImageStyle = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: 'cover',
    backGroundPosition: 'center',
    backgroundRepeat: "repeat",
    // Other background properties (position, repeat, etc.) can be added here
  };

const Profile = () => {
    const base = useAuth((state: any) => state.base);
    const token = localStorage.getItem('token');
    const setAlert = useAlert((state: any) => state.setAlert);
    const setShowAlert = useAlert((state: any) => state.setShowAlert);
    const navigate = useNavigate();
    const isMobile = useGeneral((state: any) => state.isMobile);

    const [updateFirstName, setUpdateFirstName] = useState<boolean>(false);
    const [updateLastName, setUpdateLastName] = useState<boolean>(false);
    const [updateEmail, setUpdateEmail] = useState<boolean>(false);
    const [updatePhone, setUpdatePhone] = useState<boolean>(false);
    const [updateDob, setUpdateDob] = useState<boolean>(false);
    const [user, setUser] = useState<any>();

    const [country, setCountry] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [pincode, setPincode] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [landmark, setLandmark] = useState<string>('');
    const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`${base}/user/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `"Bearer ${token}"`,
                },
            });

            if (response.status === 200) {
                const tempUser = await response.json();
                setUser(tempUser);
            } else {
                setAlert('An error occurred. Please try again later.');
                setShowAlert(true);
                navigate('/');
            }
        }
        fetchUser();
    }, [])

    async function updateHandler(field: string, value: string) {
        const response = await fetch(`${base}/user/update/${field}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `"Bearer ${token}"`,
            },
            body: value
        });

        if (response.status === 200) {
            setAlert('Updated successfully');
            setShowAlert(true);
        } else {
            setAlert('An error occurred. Please try again later.');
            setShowAlert(true);
        }
    }

    async function addShippingHandler() {
        let newAddress: Address = {
            fullName: fullName,
            mobileNumber: mobileNumber,
            country: country,
            pincode: pincode,
            houseNumber: houseNumber,
            street: street,
            area: area,
            city: city,
            state: state,
            landmark: landmark,
            defaultAddress: defaultAddress
        }

        const response = await fetch(`${base}/user/address/add-shipping-address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `"Bearer ${token}"`
            },
            body: JSON.stringify(newAddress)
        })

        if (response.status === 200) {
            setAlert('Address added successfully');
            setShowAlert(true);
        } else {
            setAlert('An error occurred. Please try again later.');
            setShowAlert(true);
        }
    }

    async function addBillingHandler() {
        let newAddress: Address = {
            fullName: fullName,
            mobileNumber: mobileNumber,
            country: country,
            pincode: pincode,
            houseNumber: houseNumber,
            street: street,
            area: area,
            city: city,
            state: state,
            landmark: landmark,
            defaultAddress: defaultAddress
        }

        const response = await fetch(`${base}/user/address/add-billing-address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `"Bearer ${token}"`
            },
            body: JSON.stringify(newAddress)
        })

        if (response.status === 200) {
            setAlert('Address added successfully');
            setShowAlert(true);
        } else {
            setAlert('An error occurred. Please try again later.');
            setShowAlert(true);
        }
    }
 
    return (
        <div className="profile h-screen" style={backgroundImageStyle}>
            <NavigationBar />
            <Card>
                <Accordion defaultActiveKey={'0'}>
                    <Accordion.Item eventKey={'0'}>
                        <Accordion.Header>Basic Details</Accordion.Header>
                        <Accordion.Body>
                            <Table.Root>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.RowHeaderCell><span className="font-semibold">First Name:</span></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {updateFirstName ? (
                                                <Flex>
                                                    <TextField.Root>
                                                        <TextField.Input
                                                            placeholder="First Name"
                                                            defaultValue={user?.firstname}
                                                            onChange={(e) => {
                                                                setUser((oldUser: User) => ({ ...oldUser, firstname: e.target.value }));
                                                            }}
                                                        />
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text>{user?.firstname}</Text>
                                                </Flex>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {updateFirstName ? (
                                                <Button variant="solid" onClick={() => {
                                                    updateHandler('firstname', user?.firstname);
                                                    setUpdateFirstName(false);
                                                }}>Confirm</Button>
                                            ) : (
                                                <Button variant='solid' onClick={() => {
                                                    setUpdateFirstName(true);
                                                }}>Update</Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell><span className="font-semibold">Last Name:</span></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {updateLastName ? (
                                                <Flex>
                                                    <TextField.Root>
                                                        <TextField.Input
                                                            placeholder="Last Name"
                                                            defaultValue={user?.lastname}
                                                            onChange={(e) => {
                                                                setUser((oldUser: User) => ({ ...oldUser, lastname: e.target.value }));
                                                            }}
                                                        />
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text>{user?.lastname}</Text>
                                                </Flex>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {updateLastName ? (
                                                <Button variant="solid" onClick={() => {
                                                    updateHandler('lastname', user?.lastname);
                                                    setUpdateLastName(false);
                                                }}>Confirm</Button>
                                            ) : (
                                                <Button variant='solid' onClick={() => {
                                                    setUpdateLastName(true);
                                                }}>Update</Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell><span className="font-semibold">Email:</span></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {updateEmail ? (
                                                <Flex>
                                                    <TextField.Root>
                                                        <TextField.Input
                                                            placeholder="Email"
                                                            defaultValue={user?.email}
                                                            onChange={(e) => {
                                                                setUser((oldUser: User) => ({ ...oldUser, email: e.target.value }));
                                                            }}
                                                        />
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text>{user?.email}</Text>
                                                </Flex>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {updateEmail ? (
                                                <Button variant="solid" onClick={() => {
                                                    updateHandler('email', user?.email);
                                                    setUpdateEmail(false);
                                                }}>Confirm</Button>
                                            ) : (
                                                <Button variant='solid' onClick={() => {
                                                    setUpdateEmail(true);
                                                }}>Update</Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell><span className="font-semibold">Phone:</span></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {updatePhone ? (
                                                <Flex>
                                                    <TextField.Root>
                                                        <TextField.Input
                                                            placeholder="Phone"
                                                            defaultValue={user?.phone}
                                                            onChange={(e) => {
                                                                setUser((oldUser: User) => ({ ...oldUser, phone: e.target.value }));
                                                            }}
                                                        />
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text>{user?.phone}</Text>
                                                </Flex>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {updatePhone ? (
                                                <Button variant="solid" onClick={() => {
                                                    updateHandler('phone', user?.phone);
                                                    setUpdatePhone(false);
                                                }}>Confirm</Button>
                                            ) : (
                                                <Button variant='solid' onClick={() => {
                                                    setUpdatePhone(true);
                                                }}>Update</Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.RowHeaderCell><span className="font-semibold">Date of Birth:</span></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {updateDob ? (
                                                <Flex>
                                                    <TextField.Root>
                                                        <TextField.Input
                                                            placeholder="Date of Birth"
                                                            type="date"
                                                            defaultValue={user?.dob}
                                                            onChange={(e) => {
                                                                setUser((oldUser: User) => ({ ...oldUser, dob: e.target.value }));
                                                            }}
                                                        />
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text>{user?.dob}</Text>
                                                </Flex>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                                {updateDob ? (
                                                    <Button variant="solid" onClick={() => {
                                                        updateHandler('dob', user?.dob);
                                                        setUpdateDob(false);
                                                    }}>Confirm</Button>
                                                ) : (
                                                    <Button variant='solid' onClick={() => {
                                                        setUpdateDob(true);
                                                    }}>Update</Button>
                                                )}
                                            </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={'1'}>
                        <Accordion.Header>Addresses</Accordion.Header>
                        <Accordion.Body>
                            <Flex gap = "3" direction = "column">
                            <Heading size = "5">Shipping Addresses</Heading>
                            <Flex direction = {isMobile ? 'column' : 'row'} gap = "4">
                                
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button size = "4" variant = "surface">Add new</Button>
                                </Dialog.Trigger>

                                <Dialog.Content style={{ maxWidth: 450 }}>
                                  <Dialog.Title>Add Shipping Address</Dialog.Title>
                                  <Dialog.Description size="2" mb="4">
                                    Fill out this form.
                                  </Dialog.Description>

                                  <Flex direction="column" gap="3">
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

                                  <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                      <Button variant="soft" color="gray">
                                        Cancel
                                      </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                      <Button onClick = {addShippingHandler}>Save</Button>
                                    </Dialog.Close>
                                  </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                                
                                {
                                    user?.shippingList !== null ? 
                                    user?.shippingList?.map((address: Address) => {
                                        return (
                                            <Card variant="classic" className={`shadow-md shadow-white ${isMobile ? 'w-[80vw]' : 'w-auto'}`}>
                                                <Flex direction={'column'}>
                                                    <Text className="font-semibold">{address.fullName}</Text>
                                                    <Text>{address.houseNumber}</Text>
                                                    <Text>
                                                        <Text>{address.street}</Text>
                                                        <Text>{address.area}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text>{address.city}</Text>
                                                        <Text>{address.state}</Text>
                                                        <Text>{address.pincode}</Text>
                                                    </Text>
                                                    <Text>Landmark: {address.landmark}</Text>
                                                    <Text>{address.country}</Text>
                                                    <Text className="font-semibold">Phone: {address.mobileNumber}</Text>
                                                </Flex>
                                            </Card>
                                        );
                                    }) : null
                                }
                            </Flex>
                            <Heading size ="5">Billing Addresses</Heading>
                            
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button size = "4" variant = "surface">Add/Edit</Button>
                                </Dialog.Trigger>

                                <Dialog.Content style={{ maxWidth: 450 }}>
                                  <Dialog.Title>Add Shipping Address</Dialog.Title>
                                  <Dialog.Description size="2" mb="4">
                                    Fill out this form.
                                  </Dialog.Description>

                                  <Flex direction="column" gap="3">
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

                                  <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                      <Button variant="soft" color="gray">
                                        Cancel
                                      </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                      <Button onClick = {addBillingHandler}>Save</Button>
                                    </Dialog.Close>
                                  </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                            
                            {user?.billingAddress !== null ? 
                            <Card variant = "classic" className = {`shadow-md shadow-white ${isMobile ? `w-[80vw]`: `w-auto`}`}>
                            <Flex direction={'column'}>
                                <Text className = "font-semibold">{user?.billingAddress.fullName}</Text>
                                <Text>{user?.billingAddress.houseNumber}</Text>
                                <Text><Text>{user?.billingAddress.street}</Text><Text>{user?.billingAddress.area}</Text></Text>
                                <Text><Text>{user?.billingAddress.city}</Text><Text>{user?.billingAddress.state}</Text><Text>{user?.billingAddress.pincode}</Text></Text>
                                <Text>Landmark: {user?.billingAddress.landmark}</Text>
                                <Text>{user?.billingAddress.country}</Text>
                                <Text className = "font-semibold">Phone: {user?.billingAddress.mobileNumber}</Text>
                            </Flex>
                        </Card> : null}
                            </Flex>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </div>
    )
}

export default Profile;