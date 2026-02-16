import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <main className="text-page">
                <h2>Welcome to Joshy's MHTrapBrowser</h2>
                <p>These tools allow you to browse and search for traps from <a href="https://mousehuntgame.com">MouseHunt</a>, the browser and mobile game where we hunt for mice in the Kingdom of Gnawnia!</p>
                <p>Use the navigation menu to explore trap bases and weapons, or head to the <Link to="/help">Help</Link> page for more information on how to use this site.</p>
            </main>
        </>
    );
}