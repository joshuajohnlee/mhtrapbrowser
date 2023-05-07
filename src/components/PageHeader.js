export default function PageHeader() {

    function comingSoon() {
        alert("Sorry, bases are coming soon - this link is just a placeholder!")
    }

    return (
        <>
        <div className="app-header">
            <h1>Joshy's MHTrapBrowser</h1>
            
            <nav>
                <a className="nav-link" href="#/">Home</a>
                <a className="nav-link" href="#/help">Help</a>
                <a className="nav-link" href="#/weapons">Weapons</a>
                <a className="nav-link" href="" onClick={comingSoon}>Bases</a>
            </nav>

            <button type="button" className="nav-button">Navigation Menu</button>
        </div>
        </>
    )
}