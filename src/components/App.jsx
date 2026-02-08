// Import libraries
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import lodash from "lodash";

// Import contexts
import { useTrapType } from "../contexts/TrapTypeContext.jsx";
import { useWishlist } from "../contexts/WishlistContext.jsx";

// Import data
import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';
import data from "../assets/data.json";

// Import other components
import FilterForm from "./FilterForm.jsx";
import { DEFAULT_WEAPON_FILTERS, DEFAULT_BASE_FILTERS } from "../assets/default_filters.json";

export default function App() {
  // load contexts
  const trapType = useTrapType();
  const wishlist = useWishlist();

  const handleTextSearch = (e) => {
    let searchText = e.target.value;
    setFilters({ ...filters, name: searchText });
  }

  const [filters, setFilters] = useState(trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
  const [currentSortField, setCurrentSortField] = useState("power")
  const [currentSortDirection, setCurrentSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(0);

  // change filters and sorting when trapType changes
  useEffect(() => {
    setFilters(trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
    setCurrentSortField("power");
    setCurrentSortDirection("asc");
    setCurrentPage(0);
  }, [trapType]);

  // filter the weapons list
  let currentList = trapType === "weapons" ? weaponsList : baseList;
  let filteredList = currentList.filter(item => {
    let userSearchString = (filters.name || "").toLowerCase();
    let testString = (item.name || "").toLowerCase();

    return (
      (trapType === "weapons" ? (filters.power_type?.[item.power_type] !== false) : true) &&
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

  // sort the filtered list
  let sortedList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);
  const totalPages = Math.ceil(sortedList.length / 20);

  // paging functionality 
  let slicedList = sortedList.slice(currentPage * 20, (currentPage * 20) + 20);

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
      className={i === currentPage ? "activepage" : "page-number-button"}
      onClick={() => changePage(i)}
    >
      {i + 1}
    </button>
  ));

  // wishlist functionality
  function handleWishlistAdd(itemName) {
    wishlist.addToWishlist(itemName, trapType);
  }

  // return the component
  return (
    <>
      <main>
        <section id="filters-sorting">
          <FilterForm
            setFilters={setFilters}
            filters={filters}
            DEFAULTS={trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS}
          />

          <div id="name-search">
            <input className="text-search-input" type="text" name="name-search" placeholder="Search by name..." value={filters.name || ""} onChange={handleTextSearch} />
          </div>

          {totalPages > 1 &&
            <>
              <div id="page-buttons-top" className="page-buttons">
                <button className="previous-button" onClick={() => handlePreviousOrNext("previous")}>Previous</button>
                {pageButtons}
                <button className="next-button" onClick={() => handlePreviousOrNext("next")}>Next</button>
              </div>
            </>
          }
        </section>

        {sortedList.length === 0 &&
          <>
            <div id="no-results">No results were found, try changing your filters.</div>
            <button id="reset-filters-button" onClick={() => {
              setFilters(trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
              setCurrentPage(0);
            }}>Reset filters?</button>
          </>
        }

        {sortedList.length > 0 &&
          <table className="traptable">
            <thead>
              <tr>
                <th></th>
                <th onClick={() => changeSort("name")}>Weapon Name {currentSortField === "name" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
                {trapType === "weapons" &&
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
                  <td><button className="wishlist-add-button" onClick={() => handleWishlistAdd(weapon.name)}><FontAwesomeIcon icon={faCirclePlus} /></button></td>
                  <td>{weapon.name} {weapon.limited_edition === 1 && <span className="limited"><FontAwesomeIcon icon={faShield} /></span>}</td>
                  {trapType === "weapons" &&
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

        }

        {totalPages > 1 &&
          <>
            <div className="page-buttons">
              <button className="previous-button" onClick={() => handlePreviousOrNext("previous")}>Previous</button>
              {pageButtons}
              <button className="next-button" onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }
      </main>
    </>
  );
}