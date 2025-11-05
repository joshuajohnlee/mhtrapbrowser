import { Link } from 'react-router-dom';
import PageFooter from "./Footer";


export default function Home () {
    return(
        <>
        <nav className="home-container">
            <Link className="home-nav-item" to="/weapons">Browse Weapons <br /> </Link>
            <Link className="home-nav-item" to="/bases">Browse Bases</Link>
            <Link className="home-nav-item" to="/compare">Compare Weapons</Link>
        </nav>
        <PageFooter />
        </>
    );
}