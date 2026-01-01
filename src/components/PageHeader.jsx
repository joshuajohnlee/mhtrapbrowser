import { Link } from "react-router-dom";

export default function PageHeader() {

    return (
        <>
            <div className="app-header">
                <Link className="nav-link" to="/"><h1>Joshy's MHTrapBrowser</h1></Link>

                <nav className="header-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/bases">Bases</Link>
                    <Link className="nav-link" to="/weapons">Weapons</Link>
                    <Link className="nav-link" to="/help">Help</Link>
                </nav>
            </div>
        </>
    )
}