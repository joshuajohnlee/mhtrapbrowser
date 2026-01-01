import { createContext, useContext } from "react";

export const ResourceTypeContext = createContext("weapons");
export const ResourceTypeProvider = ResourceTypeContext.Provider;
export const useResourceType = () => useContext(ResourceTypeContext);