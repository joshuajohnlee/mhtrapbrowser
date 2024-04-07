// Import libraries
import { useState } from "react";
import lodash from "lodash";
// Import weapon data
import weaponsList from '../../assets/weapons.json';
// Import other components
import WeaponCard from "./WeaponCard";
import FilterForm from "./WeaponFilterForm";
import SortButton from "../SortButton";
import NameSearch from "../weapons/WeaponNameSearch";
import ToTopButton from "../ToTopButton";

// Define default filters which will include all weapons
const DEFAULT_FILTERS = {
  weapon_name: "",
  power_type: {
    "Arcane": true,
    "Draconic": true,
    "Forgotten": true,
    "Hydro": true,
    "Law": true,
    "Parental": true,
    "Physical": true,
    "Rift": true,
    "Shadow": true,
    "Tactical": true,
  },
  min_power: 0,
  max_power: 20000,
  min_power_bonus: 0,
  max_power_bonus: 35,
  min_attr_bonus: 0,
  max_attr_bonus: 40,
  min_luck: 0,
  max_luck: 42,
  min_title_req: 0,
  max_title_req: 19,
  min_cheese_effect: 0,
  max_cheese_effect: 12,
  limited: 'any'
}

export default function WeaponApp() {

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Check the filters against each weapon
  let filteredList = weaponsList.filter(x => {

    let userSearchString = (filters.weapon_name).toLowerCase();
    let testString = (x.name).toLowerCase();

    if (filters.power_type[x.power_type] === false) {
      return false;
    } else if (x.power < filters.min_power || x.power > filters.max_power) {
      return false;
    } else if (x.power_bonus < (filters.min_power_bonus / 100) || x.power_bonus > (filters.max_power_bonus / 100)) {
      return false;
    } else if (x.attr_bonus < (filters.min_attr_bonus / 100) || x.attr_bonus > (filters.max_attr_bonus / 100)) {
      return false;
    } else if (x.luck < filters.min_luck || x.luck > filters.max_luck) {
      return false;
    } else if (x.title_req < filters.min_title_req || x.title > filters.max_title_req) {
      return false;
    } else if (x.cheese_effect < filters.min_cheese_effect || x.cheese_effect > filters.max_cheese_effect) {
      return false;
    } else if (filters.limited !== 'any' && filters.limited !== x.limited) {
      return false;
    } else if (!testString.includes(userSearchString)) {
      return false;
    } else {
      return true;
    }
  });

  // Create states for sorting
  const [currentSortField, setCurrentSortField] = useState(["power"])
  const [currentSortDirection, setCurrentSortDirection] = useState("asc")

  // Sort and filter the list
  let filteredWeaponList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);

  // Create states to use with the page selector
  const [currentPage, setCurrentPage] = useState(0);

  // Create the sliced list showing the results for the currently selected page
  let slicedList = filteredWeaponList.slice(currentPage * 20, (currentPage * 20) + 20);

  // Page turner functionality 

  function handlePreviousOrNext(direction) {
    if (direction === "previous" && currentPage > 0) {
      changePage(currentPage - 1);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } else if (direction === "next" && currentPage < (Math.ceil(filteredWeaponList.length / 20))) {
      changePage(currentPage + 1);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  let output = []

  for (let i = 0; i < (Math.ceil(filteredWeaponList.length / 20)); i++) {
    if (i === currentPage) {
      output.push(<button class="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
    } else {
      output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
    }
  }

  function changePage(pageNumber = 0) {
    setCurrentPage(pageNumber);

    for (let i = 0; i < (Math.ceil(filteredWeaponList.length / 20)); i++) {
      if (i === currentPage) {
        output.push(<button class="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
      } else {
        output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
      }
    }
  }

  return (
    <>
      <FilterForm
        setFilters={setFilters}
        filters={filters}
        DEFAULTS={DEFAULT_FILTERS}
      />

      <div className="filter-sort-container">
        <SortButton
          setCurrentSortDirection={setCurrentSortDirection}
          setCurrentSortField={setCurrentSortField}
        />
        <NameSearch
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>

      <div className="numberresults">{filteredWeaponList.length} results found.</div>

      <div className="card-container">
        {slicedList.map((weapon) => (
          <WeaponCard
            key={weapon.name}
            weapon={weapon}
          />
        ))}
      </div>

      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>



      <ToTopButton />
    </>
  );
}