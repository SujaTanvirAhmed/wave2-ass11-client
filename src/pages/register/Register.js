import * as React from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { allContext } from '../../context/AllContextProvider';

export default function Register() {
    document.title = "Imperial Hotel - Register";

    const navigate = useNavigate();
    const location = useLocation();
    const redirectUrl = location.state?.from || "/";
    const serviceId = location.state?.serviceId || "";

    const {
        SERVER_URL,
        setUser,
        handlePasswordSignUp,
        handleUpdateProfileName,
        setDbUser
    } = React.useContext(allContext);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [error, setError] = React.useState('');

    function setUserInDb(firebaseUser) {
        const backendUser = {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: "user",
            provider: firebaseUser.providerData[0].providerId
        };
        fetch(`${SERVER_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(backendUser)
        })
            .then(reply => reply.json())
            .then(data => {
                if (data.userId) {
                    setDbUser(data.userId, "user");
                    navigate(redirectUrl, { state: { serviceId } }, { replace: true });
                }
                else {
                    setError("Database connection error!");
                }
            })
            .catch(err => setError(err.message));
    }

    function implementPasswordSignUp(userName, email, pass) {
        handlePasswordSignUp(email, pass)
            .then(userCredential => {
                handleUpdateProfileName(userName)
                    .then(() => {
                        const loggedUser = userCredential.user;
                        setUser(loggedUser);
                        setUserInDb(loggedUser);
                    });
            })
            .catch(
                err => {
                    setError(err.message);
                }
            );
    }

    function handleNameInput(event) {
        setName(event.target.value);
    }

    function handleEmailInput(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInput1(event) {
        setPassword1(event.target.value);
    }

    function handlePasswordInput2(event) {
        setPassword2(event.target.value);
    }

    function handleRegister(event) {
        event.preventDefault();

        if (
            name &&
            email &&
            password1 &&
            password2 &&
            password1 === password2
        ) {
            implementPasswordSignUp(name, email, password1);
            setName("");
            setEmail("");
            setPassword1("");
            setPassword2("");
        }

    }

    function goLogin() {
        navigate("/login", { state: { from: redirectUrl, serviceId } });
    }

    return (
        <div>
            <Container>
                <h2 className="page-title">Register</h2>
                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6}>

                        <Form onSubmit={handleRegister} className="mt-5">

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    onChange={handleNameInput}
                                    value={name}
                                    placeholder="Name"
                                    required
                                />
                            </Form.Group>

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
                                    onChange={handlePasswordInput1}
                                    value={password1}
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    onChange={handlePasswordInput2}
                                    value={password2}
                                    placeholder="Re-enter Password"
                                    required
                                />
                            </Form.Group>

                            <h6 style={{ textAlign: "left", marginLeft: "10px" }}>Already Registered?<Button
                                variant="link"
                                style={{ marginTop: "-5px" }}
                                onClick={goLogin}
                            >Sign In</Button></h6>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Button
                                type="submit"
                                variant="primary"
                                className="mb-5 mt-3"
                            >Register</Button>

                        </Form>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}