export default function SortButton ({setCurrentSortField, setCurrentSortDirection}) {

    const sortUpdate = (e) => {
        switch(e.target.value) {
            case "power_asc":
                setCurrentSortField("power")
                setCurrentSortDirection("asc")
                break;
            
            case "power_desc":
                setCurrentSortField("power")
                setCurrentSortDirection("desc")
                break;

            case "power_bonus_asc":
                setCurrentSortField("power_bonus")
                setCurrentSortDirection("desc")
                break;
                
            case "power_bonus_desc":
                setCurrentSortField("power_bonus")
                setCurrentSortDirection("desc")
                break;

            case "attr_bonus_asc":
                setCurrentSortField("attr_bonus")
                setCurrentSortDirection("asc")
                break;

            case "attr_bonus_desc":
                setCurrentSortField("attr_bonus")
                setCurrentSortDirection("desc")
                break;

            case "luck_asc":
                setCurrentSortField("luck")
                setCurrentSortDirection("asc")
                break;

            case "luck_desc":
                setCurrentSortField("luck")
                setCurrentSortDirection("desc")
                break;

            case "title_asc":
                setCurrentSortField("title_req")
                setCurrentSortDirection("asc")
                break;

            case "title_desc":
                setCurrentSortField("title_req")
                setCurrentSortDirection("desc")
                break;

            case "cheese_effect_asc":
                setCurrentSortField("cheese_effect")
                setCurrentSortDirection("asc")
                break;

            case "cheese_effect_desc":
                setCurrentSortField("cheese_effect")
                setCurrentSortDirection("desc")
                break;
            
            default:
                setCurrentSortField("power")
                setCurrentSortDirection("desc")
                break;
        }    
    }

    return (
        <>
        <div className="sorter">
            <label htmlFor="">Sort: </label>
            <select name="sortdirection" defaultValue={"power_asc"} onChange={sortUpdate}>
                <option value="power_asc">Power - Ascending</option>
                <option value="power_desc">Power - Descending</option>
                <option value="power_bonus_asc">Power Bonus - Ascending</option>
                <option value="power_bonus_desc">Power Bonus - Descending</option>
                <option value="attr_bonus_asc">Attraction Bonus - Ascending</option>
                <option value="attr_bonus_desc">Attraction Bonus - Descending</option>
                <option value="luck_asc">Luck - Ascending</option>
                <option value="luck_desc">Luck - Descending</option>
                <option value="title_asc">Title Required - Ascending</option>
                <option value="title_desc">Title Required - Descending</option>
                <option value="cheese_effect_asc">Cheese Effect - Ascending</option>
                <option value="cheese_effect_desc">Cheese Effect - Descending</option>
            </select>
            </div>
        </>
    )
}