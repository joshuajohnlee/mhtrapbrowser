import PageFooter from "./Footer";

export default function Home () {
    return(
        <>
        <nav className="home-container">
            <a class="home-nav-item" href="#/weapons">Browse Weapons <br /> </a>
            <a class="home-nav-item" href="#/bases">Browse Bases</a>
            <a class="home-nav-item" href="#/compare">Compare Weapons</a>
        </nav>
        <PageFooter />
        </>
    );
}