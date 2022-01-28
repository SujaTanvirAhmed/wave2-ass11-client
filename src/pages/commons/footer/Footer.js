import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import Cert1 from './cert-1.jpg';
import Cert2 from './cert-2.jpg';
import './Footer.css';

export default function Footer() {
    return (
        <div className="Footer">
            <Container>
                <Row>
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 1 }} className="footer-part">
                        <h3 className="footer-title">Be in Touch</h3>
                        <div className="social">
                            <Button
                                className="btn-social"
                                variant="dark"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </Button><span>facebook</span>
                        </div>
                        <div className="social">
                            <Button
                                className="btn-social"
                                variant="success"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </Button><span>twitter</span>
                        </div>
                        <div className="social">
                            <Button
                                className="btn-social"
                                variant="danger"
                            >
                                <FontAwesomeIcon icon={faYoutube} />
                            </Button><span>youtube</span>
                        </div>
                    </Col>
                    <Col xs={{ span: 12, order: 3 }} md={{ span: 4, order: 2 }} className="footer-part">
                        <div className="copy-right">
                            <p>&copy;2021. All Rights Reserved.<br />
                                Developed by <span>Suja Tanvir Ahmed</span></p>
                        </div>
                    </Col>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 3 }} className="footer-part">
                        <h3 className="footer-title">Certifications</h3>
                        <Row>
                            <Col className="mb-3" xs={{ span: 6, offset: 3 }} md={{ span: 6, offset: 0 }} ><Image src={Cert1} alt="" fluid /></Col>
                            <Col xs={{ span: 6, offset: 3 }} md={{ span: 6, offset: 0 }}><Image src={Cert2} alt="" fluid /></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}