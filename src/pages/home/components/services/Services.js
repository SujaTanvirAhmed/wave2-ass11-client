import * as React from 'react';
import { allContext } from '../../../../context/AllContextProvider';
import { Container, Row, Col } from 'react-bootstrap';
import SingleService from '../singleservice/SingleService';
import './Services.css';

export default function Services() {

    const { SERVER_URL } = React.useContext(allContext);
    const [services, setServices] = React.useState([]);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(
        () => {
            fetch(`${SERVER_URL}/services`)
                .then(response => response.json())
                .then(data => {
                    setServices(data);
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
        <Container>
            <Row>
                {
                    isLoading ?
                        <Col>
                            <div className="loader">Loading...</div>
                        </Col> :
                        (services.length ?
                            services.map(service => <SingleService
                                key={service._id}
                                serviceId={service._id}
                                title={service.title}
                                description={service.description}
                                image={service.image}
                            />
                            ) : <h3
                                className="error-msg">{error}<span>services data!</span>
                            </h3>
                        )
                }
            </Row>
        </Container>
    );
}