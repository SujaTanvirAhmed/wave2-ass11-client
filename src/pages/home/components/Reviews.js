import * as React from 'react';
import { allContext } from '../../../context/AllContextProvider';
import ReviewItem from './ReviewItem';
import { Container } from 'react-bootstrap';

export default function Reviews() {

    const { SERVER_URL } = React.useContext(allContext);
    const [reviews, setReviews] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(true);

    React.useEffect(() => {
        fetch(`${SERVER_URL}/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setIsLoading(false);
                setError(false);
            })
            .catch(() => {
                setError(true);
                setIsLoading(false);
            });
    }, [SERVER_URL]);

    return (
        <div style={{ marginTop: "50px" }}>
            <Container>
                {
                    isLoading ? <div className="loader">Loading...</div> :
                        error ? <h3
                            className="error-msg">{error}<span>Error loading reviews data!</span>
                        </h3> : <div
                            style={{ backgroundColor: "#F3F2F1" }}
                        >
                            <h3 style={{ padding: "30px 15px" }}>What Our Customers Say About Us</h3>
                            {reviews.map(rev =>
                                <ReviewItem key={rev._id} review={rev} />
                            )}
                        </div>
                }
            </Container >
        </div>
    );
}