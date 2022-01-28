import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { allContext } from '../../context/AllContextProvider';
import ManageOrder from '../manage-order/ManageOrder';
import './ManageAllOrders.css';

export default function ManageAllOrders() {
    document.title = "Imperial Hotel - Manage Orders";

    const { SERVER_URL } = React.useContext(allContext);
    const [allOrders, setAllOrders] = React.useState([]);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`${SERVER_URL}/all-orders`)
            .then(response => response.json())
            .then(data => {
                setAllOrders(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(
                    err.message +
                    ": Server error in retrieving "
                );
                setIsLoading(false);
            });
    }, [SERVER_URL]);

    return (
        <div className="MyOrders">
            <Container>
                <h2 className="page-title">Manage All Orders - <span style={{ fontStyle: "italic", color: "grey" }}>Total: {allOrders.length}</span></h2>
                {
                    isLoading ? (
                        <div className="loader"
                        >Loading...</div>
                    ) :
                        (
                            allOrders.length > 0 ?
                                (
                                    <>
                                        <Row style={{ padding: "10px", margin: "10px" }}>
                                            <Col className="d-none d-md-block" xs={{ span: 12 }} md={{ span: 3 }}>
                                                <h6>Orders Placed By</h6>
                                            </Col>
                                            <Col className="d-none d-md-block" xs={{ span: 12 }} md={{ span: 6 }}>
                                                <h6>Services Ordered</h6>
                                            </Col>
                                            <Col className="d-none d-md-block" xs={{ span: 12 }} md={{ span: 3 }}>
                                                <h6>Orders Status</h6>
                                            </Col>
                                        </Row>
                                        {allOrders.map(
                                            ao => <ManageOrder
                                                key={ao._id}
                                                orderId={ao._id}
                                                userId={ao.user}
                                                serviceId={ao.service}
                                                approved={ao.approved}
                                            />)
                                        }
                                    </>
                                ) : (
                                    <h3 className="error-msg"
                                    >{error}<span>all orders data!</span>
                                    </h3>
                                )
                        )
                }
            </Container>
        </div>
    );
}