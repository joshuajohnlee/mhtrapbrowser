// Import libraries
import { useState } from "react";
import lodash from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

// Import base data
import basesList from '../../assets/bases.json';
import data from "../../assets/data.json";
import { DEFAULT_BASE_FILTERS as DEFAULT_FILTERS } from "../../assets/default_filters.json";

// Import other components
import FilterForm from "./BaseFilterForm";

export default function BaseApp() {

  // Always start with the default filters
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Check the filters against each base
  let filteredList = basesList.filter(x => {

    let userSearchString = (filters.base_name).toLowerCase();
    let testString = (x.name).toLowerCase();

    return (
      x.power >= filters.min_power &&
      x.power <= filters.max_power &&
      x.power_bonus >= filters.min_power_bonus / 100 &&
      x.power_bonus <= filters.max_power_bonus / 100 &&
      x.attr_bonus >= filters.min_attr_bonus / 100 &&
      x.attr_bonus <= filters.max_attr_bonus / 100 &&
      x.luck >= filters.min_luck &&
      x.luck <= filters.max_luck &&
      x.title_req >= filters.min_title_req &&
      x.title_req <= filters.max_title_req &&
      x.cheese_effect >= filters.min_cheese_effect &&
      x.cheese_effect <= filters.max_cheese_effect &&
      (filters.limited === 'any' || filters.limited === x.limited) &&
      testString.includes(userSearchString)
    );
  });

  // Sorting functionality
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
  let filteredBaseList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);

  // Page turner functionality 

  const [currentPage, setCurrentPage] = useState(0);
  let slicedList = filteredBaseList.slice(currentPage * 20, (currentPage * 20) + 20);

  function handlePreviousOrNext(direction) {
    if (direction === "previous" && currentPage > 0) {
      changePage(currentPage - 1);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } else if (direction === "next" && currentPage < (Math.ceil(filteredBaseList.length / 20))) {
      changePage(currentPage + 1);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  let output = []

  for (let i = 0; i < (Math.ceil(filteredBaseList.length / 20)); i++) {
    if (i === currentPage) {
      output.push(<button className="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
    } else {
      output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
    }
  }

  function changePage(pageNumber = 0) {
    setCurrentPage(pageNumber);

    for (let i = 0; i < (Math.ceil(filteredBaseList.length / 20)); i++) {
      if (i === currentPage) {
        output.push(<button className="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
      } else {
        output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
      }
    }
  }

  const handleTextSearch = (e) => {
    let searchText = e.target.value;
    setFilters({ ...filters, base_name: searchText });
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
        <input type="text" name="name-search" value={filters.base_name} onChange={handleTextSearch} />
      </div>

      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>

      <div className="numberresults">{filteredBaseList.length} results found.</div>

      <table className="traptable">
        <thead>
          <tr>
            <th onClick={() => changeSort("name")}>Base Name {currentSortField === "name" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("power")}>Power {currentSortField === "power" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("power_bonus")}>Power Bonus {currentSortField === "power_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("attr_bonus")}>Attraction Bonus {currentSortField === "attr_bonus" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("luck")}>Luck {currentSortField === "luck" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("cheese_effect")}>Cheese Effect {currentSortField === "cheese_effect" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => changeSort("title_req")}>Title Required {currentSortField === "title_req" && (currentSortDirection === "asc" ? "↑" : "↓")}</th>
          </tr>
        </thead>
        <tbody>
          {slicedList.map((base) => (
            <tr key={base.id}>
              <td>{base.name} {base.limited === "yes" && <span className="limited"><FontAwesomeIcon icon={faShield} /></span>}</td>
              <td>{base.power}</td>
              <td>{(base.power_bonus * 100).toFixed(0) + "%"}</td>
              <td>{(base.attr_bonus * 100).toFixed(0) + "%"}</td>
              <td>{base.luck}</td>
              <td>{data.freshness[base.cheese_effect]}</td>
              <td>{data.title_req[base.title_req - 1]}</td>
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