import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { allContext } from '../../context/AllContextProvider';
import MyOrder from '../my-order/MyOrder';

export default function MyOrders() {
    document.title = "Imperial Hotel - My Orders";

    const {
        SERVER_URL,
        getUserDbId
    } = React.useContext(allContext);

    const [myOrders, setMyOrders] = React.useState([]);
    // const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    const userDbId = getUserDbId();

    React.useEffect(() => {
        fetch(`${SERVER_URL}/orders/${userDbId}`)
            .then(response => response.json())
            .then(data => {
                setMyOrders(data);
                setIsLoading(false);
                // if (data.length === 0) {
                //     setError("There is no data in ");
                // }
            })
            .catch(err => {
                // setError(
                //     err.message +
                //     ": Server error in retrieving "
                // );
                setIsLoading(false);
            });
    }, [SERVER_URL, userDbId]);

    return (
        <div className="MyOrders">
            <Container>
                <h3 className="page-title">My Orders - <span style={{ fontStyle: "italic", color: "grey" }}>Total: {myOrders.length}</span></h3>

                <Row>
                    {isLoading ? <div className="loader">Loading...</div> :
                        (myOrders.length === 0 ?
                            (
                                <h3
                                    className="error-msg">You haven't placed any <span>order</span> yet!
                                </h3>
                            ) :
                            (
                                myOrders.map(
                                    (mo, i) => {
                                        return (
                                            <MyOrder
                                                key={mo._id}
                                                serviceId={mo.service}
                                                approved={mo.approved}
                                                serial={i + 1}
                                            />
                                        );
                                    }
                                )
                            )
                        )
                    }
                </Row>
            </Container>
        </div>
    );
}