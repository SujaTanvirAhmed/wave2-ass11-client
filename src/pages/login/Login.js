import * as React from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { allContext } from '../../context/AllContextProvider';

export default function Login() {
    document.title = "Imperial Hotel - Login";

    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.from || "/";
    const serviceId = location.state?.serviceId || "";

    const {
        SERVER_URL,
        setUser,
        handlePasswordSignIn,
        setDbUser
    } = React.useContext(allContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    function getUserFromDb(firebaseUser) {
        const dbUser = {
            email: firebaseUser.email,
            name: firebaseUser.displayName
        };
        fetch(`${SERVER_URL}/connect/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbUser)
        })
            .then(reply => reply.json())
            .then(data => {
                if (data.userId && data.userRole) {
                    setDbUser(data.userId, data.userRole);
                    navigate(redirectUrl, { state: { serviceId } }, { replace: true });
                }
                else {
                    setError("DB Connection error!");
                }
            })
            .catch(err => setError("DB Connection error: " + err.message));
    }

    function implementPasswordSignIn(email, pass) {
        handlePasswordSignIn(email, pass)
            .then(userCredential => {
                const loggedUser = userCredential.user;
                // console.log(loggedUser);
                setUser(loggedUser);
                getUserFromDb(loggedUser);
            })
            .catch(err => setError(err.message));
    }

    function handleEmailInput(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        if (
            email &&
            password
        ) {
            implementPasswordSignIn(email, password);
            setEmail("");
            setPassword("");
        }
    }

    function goRegister() {
        navigate("/register", { state: { from: redirectUrl, serviceId } });
    }

    return (
        <div>
            <Container>
                <h2 className="page-title">Login</h2>
                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6}>

                        <Form onSubmit={handleLoginSubmit} className="mt-5">

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    onChange={handleEmailInput}
                                    value={email}
                                    placeholder="Email"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    onChange={handlePasswordInput}
                                    value={password}
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <h6 style={{ textAlign: "left", marginLeft: "10px" }}>New User?<Button
                                variant="link"
                                style={{ marginTop: "-5px" }}
                                onClick={goRegister}
                            >Sign Up</Button></h6>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Button
                                type="submit"
                                variant="primary"
                                className="mb-5 mt-3"
                            >Login</Button>

                        </Form>

                    </Col>
                </Row>
            </Container>
        </div >
    );
}