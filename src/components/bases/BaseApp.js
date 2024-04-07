// Import libraries
import { useState } from "react";
import lodash from "lodash";
// Import base data
import basesList from '../../assets/bases.json';
// Import other components
import BaseCard from "./BaseCard";
import FilterForm from "./BaseFilterForm";
import SortButton from "../SortButton";
import ToTopButton from "../ToTopButton";
import BaseNameSearch from '../bases/BaseNameSearch'
// Define default filters which will include all bases
const DEFAULT_FILTERS = {
  base_name: "",
  min_power: 0,
  max_power: 16500,
  min_power_bonus: 0,
  max_power_bonus: 35,
  min_attr_bonus: 0,
  max_attr_bonus: 40,
  min_luck: 0,
  max_luck: 40,
  min_title_req: 0,
  max_title_req: 19,
  min_cheese_effect: 0,
  max_cheese_effect: 12,
  limited: 'any'
}

export default function BaseApp() {

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Check the filters against each base
  let filteredList = basesList.filter(x => {

    let userSearchString = (filters.base_name).toLowerCase();
    let testString = (x.name).toLowerCase();

    if (x.power < filters.min_power || x.power > filters.max_power) {
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
  let filteredBaseList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);

  // Create state to use with the page selector
  const [currentPage, setCurrentPage] = useState(0);

  let slicedList = filteredBaseList.slice(currentPage * 20, (currentPage * 20) + 20);

  // Page turner functionality 

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
      output.push(<button class="activepage" onClick={() => changePage(i)}>{i + 1}</button>)
    } else {
      output.push(<button onClick={() => changePage(i)}>{i + 1}</button>)
    }
  }

  function changePage(pageNumber = 0) {
    setCurrentPage(pageNumber);

    for (let i = 0; i < (Math.ceil(filteredBaseList.length / 20)); i++) {
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
        <BaseNameSearch
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="pagebuttons">
        <button onClick={() => handlePreviousOrNext("previous")}>Previous</button>
        {output}
        <button onClick={() => handlePreviousOrNext("next")}>Next</button>
      </div>

      <div className="numberresults">{filteredBaseList.length} results found.</div>
      <div className="card-container">
        {slicedList.map((base) => (
          <BaseCard
            key={base.name}
            base={base}
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