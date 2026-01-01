import { createContext, useContext, useEffect, useState } from "react";

export const ResourceTypeContext = createContext("weapons");
export const ResourceTypeProvider = ResourceTypeContext.Provider;
export const useResourceType = () => useContext(ResourceTypeContext);

// Wishlist context & provider
const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id) => wishlist.some(i => i.id === id);
  const addToWishlist = (item) => { if (!isInWishlist(item.id)) setWishlist(prev => [...prev, item]); };
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.id !== id));
  const toggleWishlist = (item) => isInWishlist(item.id) ? removeFromWishlist(item.id) : addToWishlist(item);

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);