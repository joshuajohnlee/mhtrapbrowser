
export default function NameSearch({filters, setFilters}) {

    const handleTextSearch = (e) => {
        let searchText = e.target.value;
        setFilters({...filters, weapon_name: searchText});
    }

    return(
        <>
            <label htmlFor="name-search">Search by name: </label> 
            <input type="text" name="name-search" value={filters.weapon_name} onChange={handleTextSearch}/>
        </>
    )
}