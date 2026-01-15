import { createContext, useContext, useEffect, useState } from "react";

export const ResourceTypeContext = createContext("weapons");
export const ResourceTypeProvider = ResourceTypeContext.Provider;
export const useResourceType = () => useContext(ResourceTypeContext);

// Wishlist context & provider
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {

  const [weaponWishlist, setWeaponWishlist] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem('weaponWishlist') || '[]'); 
    } catch {
      return [];
    }
  });

  const [baseWishlist, setBaseWishlist] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem('baseWishlist') || '[]');
    } catch {
      return [];
    }
  });

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
    return false;
  };

  const addToWishlist = (name, list) => {
    if (list === "weapons") {
      if (!isInWishlist(name, list)) setWeaponWishlist(prev => [...prev, { name, completedCostItems: [] }]);
    } else if (list === "bases") {
      if (!isInWishlist(name, list)) setBaseWishlist(prev => [...prev, { name, completedCostItems: [] }]);
    }
  };

  const removeFromWishlist = (name, list) => {
    if (list === "weapons") {
      setWeaponWishlist(prev => prev.filter(i => i.name !== name));
    } else if (list === "bases") {
      setBaseWishlist(prev => prev.filter(i => i.name !== name));
    }
  };

  const toggleCompletedCostItem = (name, list, costItem) => {
    if (list === "weapons") {
      setWeaponWishlist(prev => prev.map(item => 
        item.name === name 
          ? {
              ...item,
              completedCostItems: item.completedCostItems.includes(costItem)
                ? item.completedCostItems.filter(i => i !== costItem)
                : [...item.completedCostItems, costItem]
            }
          : item
      ));
    } else if (list === "bases") {
      setBaseWishlist(prev => prev.map(item => 
        item.name === name 
          ? {
              ...item,
              completedCostItems: item.completedCostItems.includes(costItem)
                ? item.completedCostItems.filter(i => i !== costItem)
                : [...item.completedCostItems, costItem]
            }
          : item
      ));
    }
  };

  return (
    <WishlistContext.Provider value={{ weaponWishlist, baseWishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleCompletedCostItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);