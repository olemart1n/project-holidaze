import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const useHolidaze = create((set) => ({
    isModalOpen: false,
    isLoading: false,
    venues: [],
    filter: "",
    specificVenue: {},
    setIsModalOpen: (data) => set((state) => ({ isModalOpen: (state.isModalOpen = data) })),
    setIsLoading: (data) => set((state) => ({ isLoading: (state.isLoading = data) })),
    setSpecificVenue: (data) => {
        set((state) => ({ specificVenue: (state.specificVenue = data) }));
    },
    setVenues: (data) => {
        set((state) => ({ venues: (state.venues = data) }));
    },
    setFilter: (filter) =>
        set((state) => ({
            ...state,
            filter,
        })),
}));
if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useHolidaze);
}

export default useHolidaze;
