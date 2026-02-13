// Import libraries
import { useWishlist } from "../contexts/WishlistContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

// Import data
import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { weaponWishlist, baseWishlist, removeFromWishlist, toggleCompletedCostItem } = useWishlist();

  return (
    <main>
      <h1>Wishlist</h1>
      <section>
        <p>Below, you will find a list of weapons and bases you have added to your wishlist. These are shown with a list of the related costs for the item. You can tick off each cost as you acquire it to keep track of how you're doing. Please note, there may be additional requirements not listed - please check the wiki for these. These will be shown in the wishlist in a future update.</p>
        <p><strong>Important note:</strong> Your wishlist will reset if you clear your browser's cache.</p>
      </section>
      <section>
        <h2>Weapons</h2>

        {weaponWishlist.length === 0 ? (
          <p>Your weapon wishlist is empty. <Link to="/weapons">Add some weapons?</Link></p>
        ) : (
          <div className="wishlist-cards">
            {weaponWishlist.map((item) => {
              const weapon = weaponsList.find(w => w.name === item.name);
              const costs = weapon?.cost;
              return (
                <div className="wishlist-card" key={item.name}>
                  <div className="wishlist-card-title">{item.name}</div>
                  <div className="wishlist-card-costs">
                    {costs ? (
                      <ul className="cost-list">
                        {Array.isArray(costs) ? (
                          costs.map(cost => {
                            const isComplete = item.completedCostItems.includes(cost);
                            return (
                              <li key={cost}>
                                <button
                                  type="button"
                                  className="cost-toggle"
                                  aria-pressed={isComplete}
                                  onClick={() => toggleCompletedCostItem(item.name, "weapons", cost)}
                                >
                                  <FontAwesomeIcon icon={isComplete ? faCheck : faXmark} className={`cost-icon ${isComplete ? 'complete' : 'incomplete'}`} />
                                </button>
                                {cost}
                              </li>
                            );
                          })
                        ) : (
                          (() => {
                            const isComplete = item.completedCostItems.includes(costs);
                            return (
                              <li key="single-cost">
                                <button
                                  type="button"
                                  className="cost-toggle"
                                  aria-pressed={isComplete}
                                  onClick={() => toggleCompletedCostItem(item.name, "weapons", costs)}
                                >
                                  <FontAwesomeIcon icon={isComplete ? faCheck : faXmark} className={`cost-icon ${isComplete ? 'complete' : 'incomplete'}`} />
                                </button>
                                {costs}
                              </li>
                            );
                          })()
                        )}
                      </ul>
                    ) : 'N/A'}
                  </div>
                  <button className="wishlist-remove-button"onClick={() => removeFromWishlist(item.name, "weapons")}> <FontAwesomeIcon icon={faTrashCan} /> </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <section>
        <h2>Bases</h2>

        {baseWishlist.length === 0 ? (
          <p>Your base wishlist is empty. <Link to="/bases">Add some bases?</Link></p>
        ) : (
          <div className="wishlist-cards">
            {baseWishlist.map((item) => {
              const base = baseList.find(b => b.name === item.name);
              const costs = base?.cost;
              return (
                <div className="wishlist-card" key={item.name}>
                  <div className="wishlist-card-title">{item.name}</div>
                  <div className="wishlist-card-costs">
                    {costs ? (
                      <ul className="cost-list">
                        {Array.isArray(costs) ? (
                          costs.map(cost => {
                            const isComplete = item.completedCostItems.includes(cost);
                            return (
                              <li key={cost}>
                                <button
                                  type="button"
                                  className="cost-toggle"
                                  aria-pressed={isComplete}
                                  onClick={() => toggleCompletedCostItem(item.name, "bases", cost)}
                                >
                                  <FontAwesomeIcon icon={isComplete ? faCheck : faXmark} className={`cost-icon ${isComplete ? 'complete' : 'incomplete'}`} />
                                </button>
                                {cost}
                              </li>
                            );
                          })
                        ) : (
                          (() => {
                            const isComplete = item.completedCostItems.includes(costs);
                            return (
                              <li key="single-cost">
                                <button
                                  type="button"
                                  className="cost-toggle"
                                  aria-pressed={isComplete}
                                  onClick={() => toggleCompletedCostItem(item.name, "bases", costs)}
                                >
                                  <FontAwesomeIcon icon={isComplete ? faCheck : faXmark} className={`cost-icon ${isComplete ? 'complete' : 'incomplete'}`} />
                                </button>
                                {costs}
                              </li>
                            );
                          })()
                        )}
                      </ul>
                    ) : 'N/A'}
                  </div>
                  <button className="wishlist-remove-button" onClick={() => removeFromWishlist(item.name, "bases")}> <FontAwesomeIcon icon={faTrashCan} /> </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}