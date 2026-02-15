// Import libraries
import { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";

// Import contexts
import { useTrapType } from "../contexts/TrapTypeContext.jsx";
import { useWishlist } from "../contexts/WishlistContext.jsx";

// Import data
import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';
import data from "../assets/data.json";

// Import other components
import FilterForm from "./FilterForm.jsx";
import ImageViewer from "./ImageViewer.jsx";
import { DEFAULT_WEAPON_FILTERS, DEFAULT_BASE_FILTERS } from "../assets/default_filters.json";

export default function App() {
  // Load contexts
  const trapType = useTrapType();
  const wishlist = useWishlist();

  // Create states
  const [filters, setFilters] = useState(trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
  const [currentSortField, setCurrentSortField] = useState("power")
  const [currentSortDirection, setCurrentSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(0);

  // Reset filters to default when changing between weapon/base
  useEffect(() => {
    setFilters(trapType === "weapons" ? DEFAULT_WEAPON_FILTERS : DEFAULT_BASE_FILTERS);
    setCurrentSortField("power");
    setCurrentSortDirection("desc");
    setCurrentPage(0);
  }, [trapType]);

  // Filtering
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

  function changeSort(field, direction) {
    setCurrentSortField(field);
    setCurrentSortDirection(direction);
  }

  const handleTextSearch = (e) => {
    let searchText = e.target.value;
    setFilters({ ...filters, name: searchText });
  }

  // Sorting
  let sortedList = orderBy(filteredList, [currentSortField, "power"], [currentSortDirection, currentSortDirection]);
  const totalPages = Math.ceil(sortedList.length / 20);

  // Pagination, 20 per page
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
    if (wishlist.isInWishlist(itemName, trapType)) {
      wishlist.removeFromWishlist(itemName, trapType);
    } else {
      wishlist.addToWishlist(itemName, trapType);
    }
  }

  // Image modal functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

          {/* Text search */}
          <input id="text-search-input" type="text" name="name-search" placeholder="Search by name..." value={filters.name || ""} onChange={handleTextSearch} />

          {/* Sort selector */}
          <select id="sorting-select" value={currentSortField + "_" + currentSortDirection} onChange={(e) => {
            let valueParts = e.target.value.split("_");
            let direction = valueParts.pop();
            let field = valueParts.join("_");
            changeSort(field, direction);
          }}>
            <option value="power_asc">Power - Ascending</option>
            <option value="power_desc">Power - Descending</option>
            <option value="power_bonus_asc">Power Bonus - Ascending</option>
            <option value="power_bonus_desc">Power Bonus - Descending</option>
            <option value="attraction_bonus_asc">Attraction Bonus - Ascending</option>
            <option value="attraction_bonus_desc">Attraction Bonus - Descending</option>
            <option value="luck_asc">Luck - Ascending</option>
            <option value="luck_desc">Luck - Descending</option>
            <option value="cheese_effect_asc">Cheese Effect - Ascending</option>
            <option value="cheese_effect_desc">Cheese Effect - Descending</option>
          </select>

          {/* Top page buttons - not shown on mobile */}
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

        <ul id="results-list">
          {slicedList.map((weapon) => (
            <li className="results-card" key={"card_" + weapon.name}>

              {/* Name, power type, rank and whether limited or not */}
              <div className="card-info">
                <span className="trap-name"><a href={weapon.custom_wiki_name ? `https://mhwiki.hitgrab.com/wiki/index.php/${weapon.custom_wiki_name}` : `https://mhwiki.hitgrab.com/wiki/index.php/${weapon.name}`} target="_blank" rel="noopener noreferrer">{weapon.name}</a></span>
                {trapType === "weapons" && <span className="subtitle">{weapon.power_type}</span>}
                <span className="subtitle">{data.title_required[weapon.title_required]}</span>
                {weapon.limited_edition === 1 && <span className="subtitle">Limited Edition</span>}
              </div>

              {/* Stats table */}
              <table className="card-stats-table">
                <thead>
                  <tr>
                    <th><img className="stat-image" src="../images/trapstats/stat_power.png" alt="Power" /></th>
                    <th><img className="stat-image" src="../images/trapstats/stat_power_bonus.png" alt="Power Bonus" /></th>
                    <th><img className="stat-image" src="../images/trapstats/stat_attraction_bonus.png" alt="Attraction Bonus" /></th>
                    <th><img className="stat-image" src="../images/trapstats/stat_luck.png" alt="Luck" /></th>
                    <th><img className="stat-image" src="../images/trapstats/stat_cheese_effect.png" alt="Cheese Effect" /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>{weapon.power}</span></td>
                    <td><span>{(weapon.power_bonus * 100).toFixed(0) + "%"}</span></td>
                    <td><span>{(weapon.attraction_bonus * 100).toFixed(0) + "%"}</span></td>
                    <td><span>{weapon.luck}</span></td>
                    <td><span>{data.freshness[weapon.cheese_effect]}</span></td>
                  </tr>
                </tbody>
              </table>

              {/* Images */}
              {trapType === "weapons" && (
                <img
                  src={`../images/weapons/thumbs/${encodeURIComponent(weapon.name)}.png`}
                  srcSet={`../images/weapons/thumbs/${encodeURIComponent(weapon.name)}.png 320w, ../images/weapons/${encodeURIComponent(weapon.name)}.png 1024w`}
                  sizes="(max-width:900px) 100vw, 45vw"
                  alt={weapon.name}
                  className="weapon-image"
                  loading="lazy"
                  decoding="async"
                  onClick={() => { setSelectedItem(weapon.name); setIsModalOpen(true); }}
                />
              )}
              {trapType === "bases" && (
                <img
                  src={`../images/bases/thumbs/${encodeURIComponent(weapon.name)}.png`}
                  srcSet={`../images/bases/thumbs/${encodeURIComponent(weapon.name)}.png 320w, ../images/bases/${encodeURIComponent(weapon.name)}.png 1024w`}
                  sizes="(max-width:900px) 100vw, 45vw"
                  alt={weapon.name}
                  className="base-image"
                  loading="lazy"
                  decoding="async"
                  onClick={() => { setSelectedItem(weapon.name); setIsModalOpen(true); }}
                />
              )}

              {/* Wishlist button */}
              <button className="wishlist-add-button" onClick={() => handleWishlistAdd(weapon.name)}>
                <img
                  className="star-icon"
                  src={wishlist.isInWishlist(weapon.name, trapType) ? "../images/trapstats/star_favorite.png" : "../images/trapstats/star_empty.png"}
                  alt="Wishlist"
                />
              </button>
            </li>
          ))}
        </ul >

        {/* Image viewer modal */}
        < ImageViewer
          itemName={selectedItem}
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* {Bottom page buttons} */}
        {totalPages > 1 &&
          <>
            <div id="page-buttons-bottom" className="page-buttons">
              <button id="previous-button-bottom" className="previous-button" onClick={() => handlePreviousOrNext("previous")}>Previous</button>
              {pageButtons}
              <button id="next-button-bottom" className="next-button" onClick={() => handlePreviousOrNext("next")}>Next</button>
            </div>
          </>
        }
      </main>
    </>
  );
}