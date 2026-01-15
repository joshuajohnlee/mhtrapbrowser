import { createContext, useContext } from "react";

// Trap type selection (weapon or base)
export const TrapTypeContext = createContext("weapons");
export const TrapTypeProvider = TrapTypeContext.Provider;
export const useTrapType = () => useContext(TrapTypeContext);