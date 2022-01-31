import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { allContext } from '../../context/AllContextProvider';
import OrderService from '../../pages/components/order-service/OrderService';
import './ManageOrder.css';

export default function ManageOrder({ orderId, userId, serviceId, approved }) {

    const { SERVER_URL, user } = React.useContext(allContext);
    const [theUser, setTheUser] = React.useState({});
    const [orderStatus, setOrderStatus] = React.useState(approved);
    console.log(user);

    React.useEffect(() => {
        fetch(`${SERVER_URL}/users/${userId}`)
            .then(res => res.json())
            .then(data => setTheUser(data))
            .catch(err => console.log(err.message));
    }, [SERVER_URL, userId]);

    function handleApproval(order_id) {
        if (orderStatus === "true") {
            fetch(`${SERVER_URL}/cancel-order/${order_id}`)
                .then((reply) => {
                    if (reply) {
                        setOrderStatus("false");
                        console.log("Order cancelled");
                    }
                })
                .catch(err => console.log(err.message));
        }
        if (orderStatus === "false") {
            fetch(`${SERVER_URL}/approve-order/${order_id}`)
                .then((reply) => {
                    if (reply) {
                        setOrderStatus("true");
                        console.log("Order approved");
                    }
                })
                .catch(err => console.log(err.message));
        }
    }

    return (
        <div className="ManageOrder">
            <Container>
                <Row style={{ border: "2px solid gray", padding: "10px", margin: "10px" }}>
                    <Col xs={{ span: 12 }} md={{ span: 3 }}>
                        <div>
                            <p style={{ backgroundColor: "#efefef", color: "#555", padding: "7px 12px", borderRadius: "3px", fontSize: "14px" }}>{theUser.name}<br />{theUser.email}</p>
                        </div>
                    </Col>
                    <Col xs={{ span: 12 }} md={{ span: 6 }}>
                        <OrderService service={serviceId} />
                    </Col>
                    <Col xs={{ span: 12 }} md={{ span: 3 }}>
                        {
                            <>
                                <p style={{ marginBottom: "3px" }}><em>{orderStatus === false ? "Pending..." : "Approved..."}</em></p>
                                <Button
                                    variant={orderStatus === false ? "success" : "danger"}
                                    onClick={() => handleApproval(orderId)}
                                >
                                    {orderStatus === false ? "Approve" : "Cancel"}
                                </Button>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}