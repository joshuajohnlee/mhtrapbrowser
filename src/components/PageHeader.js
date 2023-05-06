export default function PageHeader() {
    return (
        <>
        <div className="app-header">
            <h1>Joshy's MHTrapBrowser</h1>
            
            <nav>
                <a className="nav-link" href="/weapons">Weapons</a>
                <a className="nav-link" href="/bases">Bases</a>
                <a className="nav-link" href="/">Home</a>
                <a className="nav-link" href="/help">Help</a>
            </nav>

            <button className="nav-button">NAV</button>
        </div>
        </>
    )
}