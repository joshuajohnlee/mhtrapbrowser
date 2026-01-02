export default function Help() {
    return (
        <>
            <main>

                <h1>Welcome to the MHTrapBrowser!</h1>
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
                    <li>Wooden base is slightly out of place in the trap browser.</li>
                </ul>
                <h2>How do traps work?</h2>
                <p>Traps are a combination of a weapon and a base. Weapons and bases have statistics (see below) which decide whether you'll be able to catch a certain mouse or not. In addition to the trap, you will need to arm bait and (optionally) a charm.</p>

                <h1>FAQ</h1>

                <h2>What are power types?</h2>
                <p>Each weapon has a power type. There are currently ten power types: Arcane, Draconic, Forgotten, Hydro, Law, Parental, Physical, Rift, Shadow and Tactical. Mice have different power types to which they are weak. <em>(There is only one parental trap, and the parental power type will not be encountered in the game anymore, as it was part of a one time event.)</em></p>

                <h2>What are the statistics and how do they work?</h2>
                <p><strong>Power</strong> is the core strength of your trap. Greater power enables you to catch stronger mice.</p>
                <p><strong>Power bonus</strong> is a percentage based value which increases your traps power based on the weapon, base and charm all put together.</p>
                <p><strong>Attraction bonus</strong> increases the chases that a mouse will actually come to your trap at all when you sound the horn.</p>
                <p><strong>Luck</strong> increases your chance of catching mice as well as improving the amount or type of loot a mouse drops.</p>
                <p><strong>Cheese effect</strong> is a modifier that determines the likelihood that your cheese will go stale when you fail to catch a mouse.</p>

                <h2>How do I user the trap browser?</h2>
                <p>When you first click on "Weapons" or "Bases" in the navigation bar, you will be taken to the browser. By default it shows all possible traps. By clicking on the "Set Filters" button, you can then change the statistics of the weapon according to what you are looking for. The browser will update to show you the traps that meet your chosen criteria.</p>
                <p>Additionally, once you have set your filters, you can sort the resulting list by one of the criteria. You can also search by name by searching any part of the weapon or bases' name.</p>

                <h2>I've found a problem, or the page doesn't look right on my browser, what can I do?</h2>
                <p>You can raise issues by contacting me on Discord (JoystickJoshy#8283). If you have a GitHub account, you can also raise an issue on the project's <a rel="noreferrer" target="_blank" href="https://github.com/joshuajohnlee/mhtrapbrowser/issues">issue tracker</a>. Please be aware this is a pet project and issues will not necessarily be fixed immediately after reporting!</p>
            </main>
        </>)
}