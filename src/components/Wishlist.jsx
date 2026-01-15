// Import libraries
import { useWishlist } from "../contexts/WishlistContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

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
        <p><strong>Important note:</strong> Your wishlist will reset if you clear your browser's cache.</p>
      </section>
      <section>
        <h2>Weapons</h2>

        {weaponWishlist.length === 0 ? (<p>Your weapon wishlist is empty. <Link to="/weapons">Add some weapons?</Link></p>) :
          <>
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Weapon</th>
                  <th>Item Cost</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {weaponWishlist.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                      {weaponsList.find(weapon => weapon.name === item.name)?.cost ? (
                        <ul className="cost-list">
                          {Array.isArray(weaponsList.find(weapon => weapon.name === item.name).cost) ?
                            weaponsList.find(weapon => weapon.name === item.name).cost.map((cost) => (
                              <li key={cost}>
                                <input
                                  type="checkbox"
                                  checked={item.completedCostItems.includes(cost)}
                                  onChange={() => toggleCompletedCostItem(item.name, "weapons", cost)}
                                />
                                {cost}
                              </li>
                            ))
                            : (
                              <li key="single-cost">
                                <input
                                  type="checkbox"
                                  checked={item.completedCostItems.includes(weaponsList.find(weapon => weapon.name === item.name).cost)}
                                  onChange={() => toggleCompletedCostItem(item.name, "weapons", weaponsList.find(weapon => weapon.name === item.name).cost)}
                                />
                                {weaponsList.find(weapon => weapon.name === item.name).cost}
                              </li>
                            )
                          }
                        </ul>
                      ) : 'N/A'}
                    </td>
                    <td>
                      <button onClick={() => removeFromWishlist(item.name, "weapons")}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      </section>
      <section>
        <h2>Bases</h2>

        {baseWishlist.length === 0 ? (<p>Your base wishlist is empty. <Link to="/bases">Add some bases?</Link></p>) :
          <>
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Base</th>
                  <th>Cost</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {baseWishlist.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                      {baseList.find(base => base.name === item.name)?.cost ? (
                        <ul className="cost-list">
                          {Array.isArray(baseList.find(base => base.name === item.name).cost) ?
                            baseList.find(base => base.name === item.name).cost.map((cost) => (
                              <li key={cost}>
                                <input
                                  type="checkbox"
                                  checked={item.completedCostItems.includes(cost)}
                                  onChange={() => toggleCompletedCostItem(item.name, "bases", cost)}
                                />
                                {cost}
                              </li>
                            ))
                            : (
                              <li key="single-cost">
                                <input
                                  type="checkbox"
                                  checked={item.completedCostItems.includes(baseList.find(base => base.name === item.name).cost)}
                                  onChange={() => toggleCompletedCostItem(item.name, "bases", baseList.find(base => base.name === item.name).cost)}
                                />
                                {baseList.find(base => base.name === item.name).cost}
                              </li>
                            )
                          }
                        </ul>
                      ) : 'N/A'}
                    </td>
                    <td>
                      <button onClick={() => removeFromWishlist(item.name, "bases")}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      </section>
    </main>
  );
}