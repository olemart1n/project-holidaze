import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const useHolidaze = create((set) => ({
    venues: [],
    filter: "",
    specificVenue: [],
    setSpecificVenue: (data) => {
        set((state) => ({ venues: (state.specificVenue = data) }));
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
