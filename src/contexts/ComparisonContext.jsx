import { createContext, useState, useEffect, useContext } from "react";

const ComparisonContext = createContext(null);

export function ComparisonProvider({ children }) {
  const [weaponComparisonSlotOne, setWeaponComparisonSlotOne] = useState(() => {return JSON.parse(localStorage.getItem('weaponComparisonSlotOne') || null)});
  const [weaponComparisonSlotTwo, setWeaponComparisonSlotTwo] = useState(() => {return JSON.parse(localStorage.getItem('weaponComparisonSlotTwo') || null)});
  const [baseComparisonSlotOne, setBaseComparisonSlotOne] = useState(() => {return JSON.parse(localStorage.getItem('baseComparisonSlotOne') || null)});
  const [baseComparisonSlotTwo, setBaseComparisonSlotTwo] = useState(() => {return JSON.parse(localStorage.getItem('baseComparisonSlotTwo') || null)});

  useEffect(() => {
    localStorage.setItem('weaponComparisonSlotOne', JSON.stringify(weaponComparisonSlotOne));
    localStorage.setItem('weaponComparisonSlotTwo', JSON.stringify(weaponComparisonSlotTwo));
    localStorage.setItem('baseComparisonSlotOne', JSON.stringify(baseComparisonSlotOne));
    localStorage.setItem('baseComparisonSlotTwo', JSON.stringify(baseComparisonSlotTwo));
  }, [weaponComparisonSlotOne, weaponComparisonSlotTwo, baseComparisonSlotOne, baseComparisonSlotTwo]);

  function updateComparison(type, slot, item) {
    if (type === "weapons") {
      if (slot === "one") {
        setWeaponComparisonSlotOne(item);
      } else if (slot === "two") {
        setWeaponComparisonSlotTwo(item);
      }
    } else if (type === "bases") {
      if (slot === "one") {
        setBaseComparisonSlotOne(item);
      } else if (slot === "two") {
        setBaseComparisonSlotTwo(item);
      }
    }
  }

  return (
    <ComparisonContext.Provider value={{weaponComparisonSlotOne, weaponComparisonSlotTwo, baseComparisonSlotOne, baseComparisonSlotTwo, updateComparison}}>
      {children}
    </ComparisonContext.Provider>
  );
}

export const useComparison = () => useContext(ComparisonContext);