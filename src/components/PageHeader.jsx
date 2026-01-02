import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

export default function PageHeader() {

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsNavMenuOpen(false);
    }, [location]);

    return (
        <>
            <header>
                <h1><Link to="/">Joshy's MHTrapBrowser</Link></h1>
                <button id="hamburger-button" onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                    <FontAwesomeIcon icon={faBars} /> Menu
                </button>
            </header>

            <Modal
                id="header-nav-modal"
                className="header-nav-modal-content"
                overlayClassName="header-nav-modal-overlay"
                isOpen={isNavMenuOpen}
                onRequestClose={() => setIsNavMenuOpen(false)}
                shouldCloseOnEsc={true}
            >
                <nav>
                    <button onClick={() => setIsNavMenuOpen(false)}>Close</button>
                    <ul id="hamburger-nav-list">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/bases"><li>Bases</li></Link>
                        <Link to="/weapons"><li>Weapons</li></Link>
                        <Link to="/help"><li>Help</li></Link>
                    </ul>
                </nav>
            </Modal>
        </>
    )
}