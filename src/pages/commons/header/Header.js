import * as React from 'react';
import { allContext } from '../../../context/AllContextProvider';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import defaultAvatar from './images/default-avatar.jpg';
import logo from './images/logo.jpg';
import './Header.css';

export default function Header() {

    const { user, logOut, initializeLocalStorage } = React.useContext(allContext);
    const navigate = useNavigate();

    function handleLogOut() {
        logOut();
        initializeLocalStorage();
        navigate("/");
    }

    return (
        <div className="Header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <Image src={logo} alt="" style={{
                                width: "120px",
                                height: "auto",
                                border: "1px solid #555",
                                borderRadius: "3px"
                            }} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" style={{ margin: "auto" }}>
                            <NavLink to="/" className="menu-item">Home</NavLink>
                            <NavLink to="/about" className="menu-item">About</NavLink>

                            {
                                Object.keys(user).length > 0 ? <>

                                    <NavLink to="/manage-all-orders" className="menu-item">Manage All Orders</NavLink>

                                    <NavLink to="/add-new-service" className="menu-item">Add New Service</NavLink>

                                    {
                                        (user.email === "admin@admin.com") ||
                                        <NavLink to="/my-orders" className="menu-item">My Orders</NavLink>
                                    }
                                </> : null
                            }

                            {
                                Object.keys(user).length ||
                                <NavLink to="/login" className="menu-item">Login</NavLink>
                            }
                        </Nav>
                        <Nav>
                            {
                                Object.keys(user).length > 0 ?
                                    <div>
                                        <Image
                                            src={user.photoURL ? user.photoURL : defaultAvatar}
                                            alt="user"
                                            style={{
                                                width: "36px", height: "36px", marginRight: "5px"
                                            }}
                                            fluid
                                            onClick={() => console.log(user)}
                                        />
                                        <span style={{ color: "#fff" }}>
                                            <em>{
                                                user.displayName ? user.displayName : user.email
                                            }</em>
                                            <Link
                                                to="/"
                                                className="signout-btn"
                                                onClick={handleLogOut}
                                            >Sign Out &nbsp;<FontAwesomeIcon icon={faSignOutAlt} /></Link>
                                        </span>
                                    </div> : <p></p>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}