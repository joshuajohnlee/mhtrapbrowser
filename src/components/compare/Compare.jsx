import { useState } from 'react';
import weaponsList from '../../assets/weapons.json';
import CompareCard from './CompareCard.jsx';

let trapNames = []
for (let i = 0; i < weaponsList.length; i++) {
    trapNames.push(weaponsList[i].name);
}

export default function Compare() {

    const[firstComparisonWeapon, setFirstComparisonWeapon] = useState();
    // figure out how to use material for autocomplete

    return (
        <>
            <h1>Compare Weapons</h1>
            <p>Start typing a name and a list of options will be shown. Select one option for each box to compare weapons.</p>

            <div class="comparison-container">
                <input id="firstComparison" type="text" placeholder="First weapon name"></input>
                <input id="secondComparison" type="text" placeholder="Second weapon name"></input>

                    <CompareCard
                        key={weaponsList[0].name}
                        weapon={weaponsList[0]}
                    />
                    <CompareCard
                        key={weaponsList[1].name}
                        weapon={weaponsList[1]}
                    />

            </div>
        </>
    )
}