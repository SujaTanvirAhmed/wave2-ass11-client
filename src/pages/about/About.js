import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AboutItem from './AboutItem';
import './About.css';

export default function About() {
    document.title = "Imperial Hotel - About";

    const [about, setAbout] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { SERVER_URL } = useAuth();

    useEffect(
        () => {
            fetch(`${SERVER_URL}/about`)
                .then(response => response.json())
                .then(data => {
                    setAbout(data);
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

    let i = 0;

    return (
        <div className="About">
            <Container>
                <h2 className="page-title">About</h2>
                {
                    isLoading ?
                        <div className="loader">Loading...</div> :
                        (about.length ?
                            about.map(abt => {
                                i++;
                                return (
                                    <AboutItem
                                        key={abt.key}
                                        align={i % 2 === 0 ? "right" : "left"}
                                        description={abt.description}
                                        image={abt.image}
                                        first={i % 2 === 0 ? "order-1" : "order-2"}
                                        second={i % 2 === 0 ? "order-2" : "order-1"}
                                    />
                                );
                            }) : <h3
                                className="error-msg">{error}<span>about data!</span>
                            </h3>
                        )
                }
            </Container>
        </div>
    );
}