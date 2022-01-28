import * as React from 'react';
import { allContext } from '../../context/AllContextProvider';
import { Image, Button, Col } from 'react-bootstrap';
import './MyOrder.css';

export default function MyOrder({ serviceId, approved, serial }) {

    const { SERVER_URL, getUserDbId } = React.useContext(allContext);
    const [service, setService] = React.useState({});
    const userId = getUserDbId();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/services/${serviceId}`)
            .then(response => response.json())
            .then(data => setService(data))
            .catch(err => console.log(err.message));
    }, [SERVER_URL, serviceId]);

    function handleRemoveService() {
        const userResponse = window.confirm("Do you really want to cancel this service?");
        if (userResponse) {
            fetch(`${SERVER_URL}/services/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, serviceId: serviceId })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "SUCCESS") {
                        console.log("Removed a service successfully!");
                    }
                    else if (data.message === "FAILURE") {
                        console.log("Failed to remove your order. Try again later!");
                    }
                })
                .catch(err => console.log("AN ERROR OCCURED:", err.message));
        }
    }

    return (
        <>
            <hr />
            <Col xs={12} md={{ span: 4, offset: 3 }}>
                <h5 style={{
                    backgroundColor: "dodgerblue",
                    width: "40px",
                    height: "40px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    color: "white",
                    marginBottom: "15px"
                }}>{serial}</h5>
                <h5>{service.title}</h5>
                <Image src={service.image} alt="" fluid className="my-3" />
                <p>{service.description}</p>

            </Col>
            <Col xs={12} md={{ span: 2 }}>
                <h6
                    style={{
                        textAlign: "left",
                        marginTop: "103px",
                        marginBottom: "15px",
                        fontStyle: "italic",
                        backgroundColor: "lightseagreen",
                        color: "white",
                        padding: "7px 12px",
                        borderRadius: "3px",
                        display: "inline-block"
                    }}
                >Status: {approved ? "Approved" : "Pending"}</h6>
                <Button
                    onClick={handleRemoveService}
                    variant="danger"
                >Cancel Order</Button>
            </Col>
        </>
    );
}