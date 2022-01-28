import { Container, Row, Col } from 'react-bootstrap';
import Circle from '../components/Circle';
import Triangle from '../components/Triangle';

export default function LoggedIn() {

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>
                    <Circle />
                    <div className="warning-msg-box">
                        <h5 className="msg-1">This is Login page</h5>
                        <h2 className="msg-2">
                            <span style={{ color: "purple" }}>
                                And you are already
                            </span>
                            <br />
                            LOGGED-IN!
                        </h2>
                    </div>
                    <Triangle />
                </Col>
            </Row>
        </Container>
    );
}