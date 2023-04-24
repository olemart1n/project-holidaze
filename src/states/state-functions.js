//THIS IS AN ABSTRACTION LAYER FROM THE ZUSTAND STATE MANAGEMENT.
import useHolidaze from "./holidaze-zustand";

export const venues = () => useHolidaze((state) => state.venues);
export const setVenues = () => useHolidaze((state) => state.setVenues);
export const useUser = () => useHolidaze((state) => state.user);
export const filter = () => useHolidaze((state) => state.filter);
export const setFilter = () => useHolidaze((state) => state.setFilter);
export const setPokemon = () => useHolidaze((state) => state.setPokemon);
export const pokemon = () => useHolidaze((state) => state.pokemon);
