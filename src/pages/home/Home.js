import * as React from 'react';
import ImageCarousel from './components/imagecarousel/ImageCarousel';
import Choose from './components/Choose';
import Reviews from './components/Reviews';
import Services from './components/services/Services';
import { allContext } from '../../context/AllContextProvider';
import './Home.css';

export default function Home() {
    document.title = "Imperial Hotel - Home";

    const { isAuthed, initializeLocalStorage } = React.useContext(allContext);
    if (!isAuthed()) {
        initializeLocalStorage();
    }

    return (
        <div>

            <ImageCarousel />

            <h2 className="page-title">Our Services</h2>

            <Services />

            <Choose />

            <Reviews />

        </div>
    );
}