import { useNavigate } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';
import './SingleService.css';

export default function SingleService(props) {
    const { serviceId, title, description, image } = props;
    const navigate = useNavigate();

    function handleExplore(id) {
        navigate("/book-service", { state: { serviceId: id } })
    }

    return (
        <Col xs={12} md={4} style={{ marginTop: "20px" }}>
            <Card>
                <Card.Img variant="top" src={image} alt="" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <br />
                    <Button variant="dark"
                        onClick={() => handleExplore(serviceId)}
                    >Explore</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}