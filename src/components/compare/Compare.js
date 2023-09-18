import weaponsList from '../../assets/weapons.json';

let trapNames = []
for (let i = 0; i < weaponsList.length; i++) {
    trapNames.push(weaponsList[i].name);
}

export default function Compare() {

    // figure out how to use material for autocomplete

    return (
        <>
            <h1>Comparison</h1>

            <form>
                <input id="firstComparison" type="text" placeholder="First weapon name"></input>
                <input id="secondComparison" type="text" placeholder="First weapon name"></input>
            </form>
        </>
    )
}