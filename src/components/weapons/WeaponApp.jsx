// Import libraries
import { useState } from "react";
import lodash from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

// Import weapon data
import weaponsList from '../../assets/weapons.json';

// Import other components
import FilterForm from "./WeaponFilterForm.jsx";

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

const dataList = {
  freshness: [
    "Über Stale",
    "Ultimately Stale",
    "Insanely Stale",
    "Extremely Stale",
    "Very Stale",
    "Stale",
    "No cheese effect",
    "Fresh",
    "Very Fresh",
    "Extremely Fresh",
    "Insanely Fresh",
    "Ultimately Fresh",
    "Über Fresh",
  ],
  title_req: [
    "Novice",
    "Recruit",
    "Apprentice",
    "Initiate",
    "Journeyman/Journeywomen",
    "Master",
    "Grandmaster",
    "Legendary",
    "Hero",
    "Knight",
    "Lord/Lady",
    "Baron/Baroness",
    "Count/Countess",
    "Duke/Duchess",
    "Grand Duke/Duchess",
    "Archduke/Archduchess",
    "Viceroy",
    "Elder",
    "Sage",
    "Fabled",
  ]
}

export default function WeaponApp() {

  const handleTextSearch = (e) => {
    let searchText = e.target.value;
    setFilters({ ...filters, weapon_name: searchText });
  }

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

  function changeSort(field) {
    if (field === currentSortField) {
      if (currentSortDirection === "asc") {
        setCurrentSortDirection("desc");
      } else {
        setCurrentSortDirection("asc");
      }
    } else {
      setCurrentSortField(field);
      setCurrentSortDirection("asc");
    }
  }

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
      output.push(<button className="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
    } else {
      output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
    }
  }

  function changePage(pageNumber = 0) {
    setCurrentPage(pageNumber);

    for (let i = 0; i < (Math.ceil(filteredWeaponList.length / 20)); i++) {
      if (i === currentPage) {
        output.push(<button className="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
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
        <label htmlFor="name-search">Search by name: </label>
        <input type="text" name="name-search" value={filters.weapon_name} onChange={handleTextSearch} />
      </div>

      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>

      <div className="numberresults">{filteredWeaponList.length} results found.<br /></div>

      <table className="traptable">
        <thead>
          <tr>
            <th onClick={() => changeSort("name")}>Weapon Name {currentSortField === "name" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("power_type")}>Power Type {currentSortField === "power_type" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("power")}>Power {currentSortField === "power" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("power_bonus")}>Power Bonus {currentSortField === "power_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("attr_bonus")}>Attraction Bonus {currentSortField === "attr_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("luck")}>Luck {currentSortField === "luck" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("cheese_effect")}>Cheese Effect {currentSortField === "cheese_effect" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("title_req")}>Title Required {currentSortField === "title_req" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
          </tr>
        </thead>
        <tbody>
          {slicedList.map((weapon) => (
            <tr key={weapon.id}>
              <td>{weapon.name} {weapon.limited === "yes" && <span className="limited"><FontAwesomeIcon icon={faShield} /></span>}</td>
              <td>{weapon.power_type}</td>
              <td>{weapon.power}</td>
              <td>{(weapon.power_bonus * 100).toFixed(0) + "%"}</td>
              <td>{(weapon.attr_bonus * 100).toFixed(0) + "%"}</td>
              <td>{weapon.luck}</td>
              <td>{dataList.freshness[weapon.cheese_effect]}</td>
              <td>{dataList.title_req[weapon.title_req - 1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>

    </>
  );
}