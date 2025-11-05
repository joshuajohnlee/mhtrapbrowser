import dataList from '../../assets/data.json';

// Individual card component that displays a weapon's picture and stats

export default function WeaponCard({ weapon }) {

    // Use Vite's import.meta.env for env vars, but for public assets use relative paths
    let imglink = `/images/weapons/${weapon.name}.png`;
    let weaponPowerBonus = (weapon.power_bonus * 100).toFixed(0) + "%";
    let attractionBonus = (weapon.attr_bonus * 100).toFixed(0) + "%";
    let cheeseEffect = (dataList.freshness[(weapon.cheese_effect)]);
    let title_req = (dataList.title_req[weapon.title_req - 1]);
    let wiki_link = "https://mhwiki.hitgrab.com/wiki/index.php/" + weapon.name;

    return (
        <>
            <div className="card">

                <div className="trap-image">
                    <img src={imglink} alt={weapon.name} />
                </div>

                <div className="weapon-name-container">
                    <h4>{weapon.name}</h4>
                    <h6>{weapon.power_type}</h6>
                </div>

                <div className="stats-container">
                    <div className="stats-header">
                        <p>Power</p>
                    </div>
                    <div className="stats-value">
                        <p>{weapon.power}</p>
                    </div>
                    <div className="stats-header">
                        <p>Power Bonus</p>
                    </div>
                    <div className="stats-value">
                        <p>{weaponPowerBonus}</p>
                    </div>
                    <div className="stats-header">
                        <p>Attraction <br />Bonus</p>
                    </div>
                    <div className="stats-value">
                        <p>{attractionBonus}</p>
                    </div>
                    <div className="stats-header">
                        <p>Luck</p>
                    </div>
                    <div className="stats-value">
                        <p>{weapon.luck}</p>
                    </div>
                    <div className="stats-header" style={{"gridColumn": "1 / span 2"}}>
                        <p>Cheese effect</p>
                    </div>
                    <div className="stats-value" style={{"gridColumn": "3 / span 2"}}>
                        <p>{cheeseEffect}</p>
                    </div>
                    <div className="stats-header" style={{"gridColumn": "1 / span 2"}}>
                        <p>Title Required</p>
                    </div>
                    <div className="stats-value" style={{"gridColumn": "3 / span 2"}}>
                        <p>{title_req}</p>
                    </div>
                    <div className="stats-header" style={{"gridColumn": "1 / span 2"}}>
                        <p>Limited Edition</p>
                    </div>
                    <div className="stats-value limited" style={{"gridColumn": "3 / span 2"}}>
                        <p>{weapon.limited}</p>
                    </div>
                </div>

                <a href={wiki_link} target="_blank" rel="noreferrer">
                    <button className="wiki-button">Find on MHWiki</button>
                </a>
            </div>

        </>
    )
}