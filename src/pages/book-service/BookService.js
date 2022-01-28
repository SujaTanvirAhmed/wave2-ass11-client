import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Image, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { allContext } from '../../context/AllContextProvider';

export default function BookService() {

    const {
        SERVER_URL,
        user,
        isAuthed,
        getUserDbId
    } = React.useContext(allContext);

    const location = useLocation();
    const serviceId = location.state?.serviceId || "";

    const navigate = useNavigate();
    if (!isAuthed()) {
        navigate("/login", { state: { from: "/book-service", serviceId } });
    }

    if (!serviceId) {
        navigate("/");
    }

    const [service, setService] = React.useState({});
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [serverResponse, setServerResponse] = React.useState('');

    React.useEffect(
        () => {
            fetch(`${SERVER_URL}/services/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    setService(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(
                        err.message +
                        ": Server error in retrieving "
                    );
                    setIsLoading(false);
                });
        }, [serviceId, SERVER_URL]
    );

    function handlePhoneInput(event) {
        setPhone(event.target.value);
    }

    function handleAddressInput(event) {
        setAddress(event.target.value);
    }

    function handleBooking(event) {
        event.preventDefault();

        const userId = getUserDbId();
        const newOrder = { userId, serviceId, phone, address };
        fetch(`${SERVER_URL}/book-a-service`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "SUCCESS") {
                    setServerResponse("An order placed successfully!");
                } else if (data.message === "FAILURE") {
                    setServerResponse("Failed to place an order!");
                }
            })
            .catch(err => setServerResponse(err.message));

    }

    return (
        <div className="BookService">
            <Container>
                <h2 className="page-title">Book this Service</h2>
                <Row className="mt-5">

                    <Col xs={12} md={6}>
                        <Form onSubmit={handleBooking}>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={user.displayName}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    value={user.email}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={phone}
                                    onChange={handlePhoneInput}
                                    placeholder="Phone"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={handleAddressInput}
                                    placeholder="Address"
                                    required
                                />
                            </Form.Group>

                            {serverResponse && <Alert variant="info">{serverResponse}</Alert>}

                            <Form.Group className="mb-3">
                                <Button type="submit" variant="dark">Book Now</Button>
                            </Form.Group>

                        </Form>
                    </Col>

                    <Col xs={12} md={6}>
                        {
                            isLoading ? (<div className="loader">Loading...</div>) :
                                (
                                    Object.keys(service).length > 0 ? (
                                        <div>
                                            <Image src={service.image} alt={service.image} fluid />
                                            <h4 className="mt-3">{service.title}</h4>
                                            <p className="mt-3">{service.description}</p>
                                        </div>
                                    ) : (<h3 className="error-msg">{error} <span>order data!</span></h3>)
                                )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}