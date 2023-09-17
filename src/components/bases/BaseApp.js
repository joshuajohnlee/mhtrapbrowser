import { useState } from "react";
import basesList from '../../assets/bases.json';
import BaseCard from "./BaseCard";
import FilterForm from "./BaseFilterForm";
import SortButton from "../SortButton";
import lodash from "lodash";
import ToTopButton from "../ToTopButton";
import BaseNameSearch from '../bases/BaseNameSearch'
import PageTurner from "../PageTurner";
import { useEffect } from "react";

export default function BaseApp() {

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

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  let filteredList = basesList.filter(x => {

    if (x.power < filters.min_power || x.power > filters.max_power) {
      return false;
    }

    if (x.power_bonus < (filters.min_power_bonus / 100) || x.power_bonus > (filters.max_power_bonus / 100)) {
      return false;
    }

    if (x.attr_bonus < (filters.min_attr_bonus / 100) || x.attr_bonus > (filters.max_attr_bonus / 100)) {
      return false;
    }

    if (x.luck < filters.min_luck || x.luck > filters.max_luck) {
      return false;
    }

    if (x.title_req < filters.min_title_req || x.title > filters.max_title_req) {
      return false;
    }

    if (x.cheese_effect < filters.min_cheese_effect || x.cheese_effect > filters.max_cheese_effect) {
      return false;
    }

    if (filters.limited !== 'any' && filters.limited !== x.limited) {
      return false;
    }

    let userString = (filters.base_name).toLowerCase();
    let testString = (x.name).toLowerCase();

    if (!testString.includes(userString)) {
      return false;
    }

    return true;
  });

  // create a sort (can take multiple columns)
  const [currentSortField, setCurrentSortField] = useState(["power"])
  const [currentSortDirection, setCurrentSortDirection] = useState("asc")

  let sortedAndFilteredList = lodash.orderBy(filteredList, [currentSortField, "power"], currentSortDirection);

  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfResults, setNumberofResults] = useState(sortedAndFilteredList.length);
  const [numberOfPages, setNumberofPages] = useState(Math.ceil(sortedAndFilteredList.length / 20));
  //eslint-disable-next-line
  useEffect(() => { setNumberofPages(Math.ceil(sortedAndFilteredList.length / 20)) }, [filters])
  useEffect(() => setCurrentPage(0), [filters])

  let slicedList = sortedAndFilteredList.slice(currentPage * 20, (currentPage * 20) + 20);

  // return the page
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

      <PageTurner
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        numberOfResults={numberOfResults}
      />

      <div className="card-container">
        {slicedList.map((base) => (
          <BaseCard key={base.name} base={base} />
        ))}
      </div>

      <PageTurner
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        numberOfResults={numberOfResults}
      />

      <ToTopButton />
    </>

  );

}