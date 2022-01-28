import * as React from "react";
import { allContext } from "../../../context/AllContextProvider";
import { Row, Col, Image } from 'react-bootstrap';

export default function OrderService({ service }) {

    const { SERVER_URL } = React.useContext(allContext);
    const [serviceDoc, setServiceDoc] = React.useState({});

    React.useEffect(() => {
        fetch(`${SERVER_URL}/services/${service}`)
            .then(response => response.json())
            .then(data => setServiceDoc(data))
            .catch(err => console.log(err.message));
    }, [SERVER_URL, service]);

    return (
        <div>
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 6 }}>
                    <h5>{serviceDoc.title}</h5>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }}>
                    <Image
                        src={serviceDoc.image}
                        alt={serviceDoc.title}
                        className="mb-3" fluid
                    />
                </Col>
            </Row>
        </div>
    );
}