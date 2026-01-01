// Import libraries
import { useState } from "react";
import lodash from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

// Import weapon data
import weaponsList from '../../assets/weapons.json';
import data from "../../assets/data.json";

// Import other components
import FilterForm from "./WeaponFilterForm.jsx";
import { DEFAULT_WEAPON_FILTERS as DEFAULT_FILTERS } from "../../assets/default_filters.json";

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

    return (
      filters.power_type[x.power_type] !== false &&
      x.power >= filters.min_power &&
      x.power <= filters.max_power &&
      x.power_bonus >= filters.min_power_bonus / 100 &&
      x.power_bonus <= filters.max_power_bonus / 100 &&
      x.attraction_bonus >= filters.min_attraction_bonus / 100 &&
      x.attraction_bonus <= filters.max_attraction_bonus / 100 &&
      x.luck >= filters.min_luck &&
      x.luck <= filters.max_luck &&
      x.title_required >= filters.min_title_required &&
      x.title_required <= filters.max_title_required &&
      x.cheese_effect >= filters.min_cheese_effect &&
      x.cheese_effect <= filters.max_cheese_effect &&
      (filters.limited_edition === 'any' || filters.limited_edition === x.limited_edition) &&
      testString.includes(userSearchString)
    );
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
  const totalPages = Math.ceil(filteredWeaponList.length / 20);

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
      <main>
        <FilterForm
          setFilters={setFilters}
          filters={filters}
          DEFAULTS={DEFAULT_FILTERS}
        />

        <div className="filter-sort-container">
          <label htmlFor="name-search">Search by name: </label>
          <input type="text" name="name-search" value={filters.weapon_name} onChange={handleTextSearch} />
        </div>

        {totalPages > 1 &&
          <>
            <div className="pagebuttons">
              <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
              {output}
              <button onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }

        <div className="numberresults">{filteredWeaponList.length} results found.<br /></div>

        <table className="traptable">
          <thead>
            <tr>
              <th onClick={() => changeSort("name")}>Weapon Name {currentSortField === "name" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("power_type")}>Power Type {currentSortField === "power_type" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("power")}>Power {currentSortField === "power" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("power_bonus")}>Power Bonus {currentSortField === "power_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("attraction_bonus")}>Attraction Bonus {currentSortField === "attraction_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("luck")}>Luck {currentSortField === "luck" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("cheese_effect")}>Cheese Effect {currentSortField === "cheese_effect" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => changeSort("title_required")}>Title Required {currentSortField === "title_required" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            </tr>
          </thead>
          <tbody>
            {slicedList.map((weapon) => (
              <tr key={weapon.id}>
                <td>{weapon.name} {weapon.limited_edition === 1 && <span className="limited"><FontAwesomeIcon icon={faShield} /></span>}</td>
                <td>{weapon.power_type}</td>
                <td>{weapon.power}</td>
                <td>{(weapon.power_bonus * 100).toFixed(0) + "%"}</td>
                <td>{(weapon.attraction_bonus * 100).toFixed(0) + "%"}</td>
                <td>{weapon.luck}</td>
                <td>{data.freshness[weapon.cheese_effect]}</td>
                <td>{data.title_required[weapon.title_required]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 &&
          <>
            <div className="pagebuttons">
              <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
              {output}
              <button onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }
      </main>
    </>
  );
}