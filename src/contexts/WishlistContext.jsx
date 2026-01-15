import { createContext, useState, useEffect, useContext } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {

  // initialize wishlists from local storage or create blank array
  const [weaponWishlist, setWeaponWishlist] = useState(() => {return JSON.parse(localStorage.getItem('weaponWishlist') || '[]');
  });
  const [baseWishlist, setBaseWishlist] = useState(() => {return JSON.parse(localStorage.getItem('baseWishlist') || '[]')});

  // update local storage when wishlist changes
  useEffect(() => {
    localStorage.setItem('weaponWishlist', JSON.stringify(weaponWishlist));
    localStorage.setItem('baseWishlist', JSON.stringify(baseWishlist));
  }, [weaponWishlist, baseWishlist]);

  const isInWishlist = (name, list) => {
    if (list === "weapons") {
      return weaponWishlist.some(item => item.name === name);
    } else if (list === "bases") {
      return baseWishlist.some(item => item.name === name);
    }
    throw new Error("Invalid list type");
  };

  const addToWishlist = (name, list) => {
    if (list === "weapons") {
      if (!isInWishlist(name, list)) setWeaponWishlist(prev => [...prev, { name, completedCostItems: [] }]);
      return;
    } else if (list === "bases") {
      if (!isInWishlist(name, list)) setBaseWishlist(prev => [...prev, { name, completedCostItems: [] }]);
      return;
    }
    throw new Error("Invalid list type");
  };

  const removeFromWishlist = (name, list) => {
    if (list === "weapons") {
      setWeaponWishlist(prev => prev.filter(i => i.name !== name));
      return;
    } else if (list === "bases") {
      setBaseWishlist(prev => prev.filter(i => i.name !== name));
      return;
    }
    throw new Error("Invalid list type");
  };

  const toggleCompletedCostItem = (name, list, costItem) => {

    if (list === "weapons") {
      setWeaponWishlist(previousWeaponWishlist => previousWeaponWishlist.map(wishlistItem => {
        if (wishlistItem.name === name) {
          let completedCostItems;
          if (wishlistItem.completedCostItems.includes(costItem)) {
            completedCostItems = wishlistItem.completedCostItems.filter(i => i !== costItem);
          } else {
            completedCostItems = [...wishlistItem.completedCostItems, costItem];
          }
          return {
            ...wishlistItem,
            completedCostItems: completedCostItems
          };
        } else {
          return wishlistItem;
        }
      }));
    } 
    
    else if (list === "bases") {
      setBaseWishlist(previousBaseWishlist => previousBaseWishlist.map(wishlistItem => {
        if (wishlistItem.name === name) {
          let completedCostItems;
          if (wishlistItem.completedCostItems.includes(costItem)) {
            completedCostItems = wishlistItem.completedCostItems.filter(i => i !== costItem);
          } else {
            completedCostItems = [...wishlistItem.completedCostItems, costItem];
          }
          return {...wishlistItem, completedCostItems: completedCostItems};
        } else {
          return wishlistItem;
        }
      }));
    }

    throw new Error("Invalid list type");
  };

  return (
    <WishlistContext.Provider value={{ weaponWishlist, baseWishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleCompletedCostItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);