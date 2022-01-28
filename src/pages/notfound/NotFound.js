import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './NotFound.css';
import Triangle from '../components/Triangle';
import Circle from '../components/Circle';

export default function NotFound() {
    return (
        <div>
            <Triangle rotation={180} />
            <h2>404 - Page Not Found</h2>
            <Link to="/">
                <Button
                    variant="danger"
                >Go Back to Home</Button>
            </Link>
            <Circle />
        </div>
    );
}