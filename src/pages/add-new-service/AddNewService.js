import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

export default function AddNewService() {
    document.title = "Imperial Hotel - Add Service";

    const { SERVER_URL } = useAuth();
    const [serverResponse, setServerResponse] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    function handleServiceTitleInput(e) {
        setTitle(e.target.value);
    }

    function handleServiceDescriptionInput(e) {
        setDescription(e.target.value);
    }

    function handleServiceImageInput(e) {
        setImage(e.target.value);
    }

    function resetForm() {
        setTitle('');
        setDescription('');
        setImage('');
        setServerResponse('');
    }

    function handleServiceSubmit(e) {
        e.preventDefault();
        const dbService = { image, title, description };

        fetch(`${SERVER_URL}/services`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbService)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.reply === "SUCCESS") {
                    setServerResponse("A new service added successfully!");
                    setTitle('');
                    setDescription('');
                    setImage('');
                }
                else if (data?.reply === "FAILURE") {
                    setServerResponse("Failed to add a service to the database. Please try again later!");
                }
            })
            .catch(err => setServerResponse(err.message));
    }

    return (
        <div className="MyOrders">
            <Container>
                <h3 className="page-title">Add New Service</h3>

                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6}>

                        <Form onSubmit={handleServiceSubmit}>
                            <p>{serverResponse}</p>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    onChange={handleServiceTitleInput}
                                    value={title}
                                    placeholder="Service title"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    onChange={handleServiceDescriptionInput}
                                    value={description}
                                    placeholder="Service description"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    onChange={handleServiceImageInput}
                                    value={image}
                                    placeholder="Service image link"
                                    required
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                style={{ marginBottom: "50px" }}
                            >Add Service</Button>

                            <Button
                                variant="secondary"
                                onClick={resetForm}
                                style={{ marginTop: "-50px", marginLeft: "15px" }}
                            >Reset</Button>

                        </Form>

                    </Col>
                </Row>


            </Container>
        </div>
    );
}