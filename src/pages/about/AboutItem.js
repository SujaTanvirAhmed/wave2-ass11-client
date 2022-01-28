import { Row, Col, Image } from 'react-bootstrap';

export default function AboutItem(props) {
    return (
        <Row style={{ margin: "50px 0" }}>
            <Col xs={12} md={6} className={props.first}>
                <p style={{ textAlign: `${props.align}` }}>{props.description}</p>
            </Col>
            <Col xs={12} md={6} className={props.second}>
                <Image src={props.image} alt="" fluid />
            </Col>
        </Row>
    );
}