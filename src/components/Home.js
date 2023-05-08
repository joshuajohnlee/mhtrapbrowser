export default function Home () {
    return(
        <>
        <div className="content-container">
            <h2>Welcome to the MHTrapBrowser!</h2>
            <p>This tool can be used to filter and sort 
                traps from <a href="https://mousehuntgame.com" target="_blank" rel="noreferrer">MouseHunt</a>. </p>

            <p>In MouseHunt, players pair a <strong>weapon</strong> with a <strong>base</strong>, stick
            some cheese on it (maybe a charm, too) and go hunting across the kingdom!</p>

            
            <p>This tool's data is derived from 
                the <a href="https://mhwiki.hitgrab.com/wiki/index.php/Main_Page" target="_blank" rel="noreferrer">MouseHunt Wiki</a>, made possible by the hard work of its contributors.</p>

            <h2>Known Issues</h2>
            <ul>
                <li>Accessibility is not properly implemented yet - apologies to any using screen readers, etc - it will be done as soon as possible.</li>
                <li>Some text or buttons may display in the wrong positions.</li>
            </ul>

        </div>
        </>
    );
}