// Import libraries
import { useWishlist } from "../context.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

// Import data
import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';

export default function Wishlist() {
  const { weaponWishlist, baseWishlist, removeFromWishlist, toggleCompletedCostItem } = useWishlist();

  return (
    <div>
      <h1>Wishlist</h1>

      <h2>Weapons</h2>
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

      <h2>Bases</h2>
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

    </div>
  );
}