//THIS IS AN ABSTRACTION LAYER FROM THE ZUSTAND STATE MANAGEMENT.
import useHolidaze from "./holidaze-zustand";

export const venues = () => useHolidaze((state) => state.venues);
export const setVenues = () => useHolidaze((state) => state.setVenues);
export const specificVenue = () => useHolidaze((state) => state.specificVenue);
export const setSpecificVenue = () => useHolidaze((state) => state.setSpecificVenue);
export const user = () => useHolidaze((state) => state.user);
export const setUser = () => useHolidaze((state) => state.setUser);
export const isLoading = () => useHolidaze((state) => state.isLoading);
export const setIsLoading = () => useHolidaze((state) => state.setIsLoading);
export const isModalOpen = () => useHolidaze((state) => state.isModalOpen);
export const setIsModalOpen = () => useHolidaze((state) => state.setIsModalOpen);
