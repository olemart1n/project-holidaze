//THIS IS AN ABSTRACTION LAYER FROM THE ZUSTAND STATE MANAGEMENT.
import useHolidaze from "./holidaze-zustand";

export const venues = () => useHolidaze((state) => state.venues);
export const setVenues = () => useHolidaze((state) => state.setVenues);
export const filter = () => useHolidaze((state) => state.filter);
export const setFilter = () => useHolidaze((state) => state.setFilter);
