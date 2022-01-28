import { useState, useEffect } from 'react';
import { Container, Carousel } from 'react-bootstrap';

export default function ImageCarousel() {

    const [carousel, setCarousel] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            fetch(`./database/carousel.json`)
                .then(response => response.json())
                .then(data => {
                    setCarousel(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(
                        err.message +
                        ": Server error in retrieving "
                    );
                    setIsLoading(false);
                });
        }, []);

    return (
        <Container>
            <Carousel>
                {
                    isLoading ? <div className="loader">Loading...</div> :
                        (
                            carousel.length > 0 ?
                                (carousel.map(
                                    crs => (
                                        <Carousel.Item key={crs.slide_image}>
                                            <img
                                                className="d-block w-100"
                                                src={"./images/carousel/" + crs.slide_image}
                                                alt={crs.label}
                                            />
                                        </Carousel.Item>
                                    )
                                )) : <h3
                                    className="error-msg">{error}<span>carousel data!</span>
                                </h3>
                        )
                }
            </Carousel>
        </Container>
    );
}