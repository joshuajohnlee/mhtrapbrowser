
export default function NameSearch({filters, setFilters}) {

    const handleTextSearch = (e) => {
        let searchText = e.target.value;
        setFilters({...filters, weapon_name: searchText});
    }

    function clearTextSearch() {
        setFilters({...filters, weapon_name: ""})
    }

    return(
        <>
        <div className="name-search-container">
            <label htmlFor="name-search">Search by name: </label> 
            <input type="text" name="name-search" value={filters.weapon_name} onChange={handleTextSearch}/>
            <button type="button" onClick={clearTextSearch}>Clear</button>
        </div>
        </>
    )
}