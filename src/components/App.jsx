// Import libraries
import { useState, useEffect } from "react";
import { useResourceType } from "../context.jsx";
import lodash from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

// Import data
import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';
import data from "../assets/data.json";

// Import other components
import FilterForm from "./FilterForm.jsx";
import { DEFAULT_WEAPON_FILTERS, DEFAULT_BASE_FILTERS } from "../assets/default_filters.json";

export default function App() {
  const resource = useResourceType();

  const handleTextSearch = (e) => {
    let searchText = e.target.value;
    setFilters({ ...filters, name: searchText });
  }

  const [filters, setFilters] = useState(resource === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
  const [currentSortField, setCurrentSortField] = useState("power")
  const [currentSortDirection, setCurrentSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(0);
  
  // Reset state when resource changes
  useEffect(() => {
    setFilters(resource === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
    setCurrentSortField("power");
    setCurrentSortDirection("asc");
    setCurrentPage(0);
  }, [resource]);
  
  // Check the filters against each weapon
  let currentList = resource === "weapons" ? weaponsList : baseList;
  let filteredList = currentList.filter(item => {
    let userSearchString = (filters.name || "").toLowerCase();
    let testString = (item.name || "").toLowerCase();

    return (
      (resource === "weapons" ? (filters.power_type?.[item.power_type] !== false) : true) &&
      item.power >= (filters.min_power ?? -Infinity) &&
      item.power <= (filters.max_power ?? Infinity) &&
      item.power_bonus >= ((filters.min_power_bonus ?? 0) / 100) &&
      item.power_bonus <= ((filters.max_power_bonus ?? 100) / 100) &&
      item.attraction_bonus >= ((filters.min_attraction_bonus ?? 0) / 100) &&
      item.attraction_bonus <= ((filters.max_attraction_bonus ?? 100) / 100) &&
      item.luck >= (filters.min_luck ?? -Infinity) &&
      item.luck <= (filters.max_luck ?? Infinity) &&
      item.title_required >= (filters.min_title_required ?? -Infinity) &&
      item.title_required <= (filters.max_title_required ?? Infinity) &&
      item.cheese_effect >= (filters.min_cheese_effect ?? -Infinity) &&
      item.cheese_effect <= (filters.max_cheese_effect ?? Infinity) &&
      (filters.limited_edition === 'any' || parseInt(filters.limited_edition, 10) === item.limited_edition) &&
      testString.includes(userSearchString)
    );
  });

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
  let sortedList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);
  const totalPages = Math.ceil(sortedList.length / 20);

  // Create the sliced list showing the results for the currently selected page
  let slicedList = sortedList.slice(currentPage * 20, (currentPage * 20) + 20);

  // Page turner functionality 
  function handlePreviousOrNext(direction) {
    if (direction === "previous" && currentPage > 0) {
      changePage(currentPage - 1);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else if (direction === "next" && currentPage < (totalPages - 1)) {
      changePage(currentPage + 1);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  function changePage(pageNumber = 0) {
    setCurrentPage(pageNumber);
  }
  
  const pageButtons = Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      className={i === currentPage ? "activepage" : ""}
      onClick={() => changePage(i)}
    >
      {i + 1}
    </button>
  ));
  
  return (
    <>
      <main>
        <FilterForm
          setFilters={setFilters}
          filters={filters}
          DEFAULTS={resource === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS}
        />

        <div className="filter-sort-container">
          <label htmlFor="name-search">Search by name: </label>
          <input type="text" name="name-search" value={filters.name || ""} onChange={handleTextSearch} />
        </div>

        {totalPages > 1 &&
          <>
            <div className="pagebuttons">
              <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
              {pageButtons}
              <button onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }

        <div className="numberresults">{sortedList.length} results found.<br /></div>

        <table className="traptable">
          <thead>
            <tr>
              <th onClick={() => changeSort("name")}>Weapon Name {currentSortField === "name" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              {resource === "weapons" &&
                <th onClick={() => changeSort("power_type")}>Power Type {currentSortField === "power_type" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
              }
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
                {resource === "weapons" &&
                  <td>{weapon.power_type}</td>
                }
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
              {pageButtons}
              <button onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }
      </main>
    </>
  );
}