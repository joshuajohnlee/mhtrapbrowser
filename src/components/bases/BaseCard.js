import dataList from '../../assets/data.json';

// Individual card component that displays a base's picture and stats

export default function BaseCard({ base }) {

    let imglink = process.env.PUBLIC_URL + "/images/bases/" + base.name + ".png";
    let weppowerbonus = (base.power_bonus * 100).toFixed(0) + "%";
    let attrbonus = (base.attr_bonus * 100).toFixed(0) + "%";
    let cheese_effect = (dataList.freshness[(base.cheese_effect)]);
    let title_req = (dataList.title_req[base.title_req - 1]);
    let wiki_link = "https://mhwiki.hitgrab.com/wiki/index.php/" + base.name;

    return (
        <>
            <div className="card">

                <img className="base-image" src={imglink} alt={base.name} />

                <div className="base-name-container">
                    <h4>{base.name}</h4>
                </div>

                <div className="stats-container">
                    <div className="stats-header">
                        <p>Power</p>
                    </div>
                    <div className="stats-value">
                        <p>{base.power}</p>
                    </div>
                    <div className="stats-header">
                        <p>Power Bonus</p>
                    </div>
                    <div className="stats-value">
                        <p>{weppowerbonus}</p>
                    </div>
                    <div className="stats-header">
                        <p>Attraction <br />Bonus</p>
                    </div>
                    <div className="stats-value">
                        <p>{attrbonus}</p>
                    </div>
                    <div className="stats-header">
                        <p>Luck</p>
                    </div>
                    <div className="stats-value">
                        <p>{base.luck}</p>
                    </div>
                    <div className="stats-header" style={{"gridColumn": "1 / span 2"}}>
                        <p>Cheese effect</p>
                    </div>
                    <div className="stats-value" style={{"gridColumn": "3 / span 2"}}>
                        <p>{cheese_effect}</p>
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
                    <div className="stats-value" style={{"gridColumn": "3 / span 2"}}>
                        <p>{base.limited}</p>
                    </div>
                </div>

                <a href={wiki_link} target="_blank" rel="noreferrer">
                    <button className="wiki-button">Find on MHWiki</button>
                </a>
            </div>

        </>
    )
}