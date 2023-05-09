import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const useHolidaze = create((set) => ({
    user: {},
    isModalOpen: false,
    isLoading: false,
    venues: [],
    specificVenue: {},
    setUser: (data) => set((state) => ({ user: (state.user = data) })),
    setIsModalOpen: (data) => set((state) => ({ isModalOpen: (state.isModalOpen = data) })),
    setIsLoading: (data) => set((state) => ({ isLoading: (state.isLoading = data) })),
    setSpecificVenue: (data) => {
        set((state) => ({ specificVenue: (state.specificVenue = data) }));
    },
    setVenues: (data) => {
        set((state) => ({ venues: (state.venues = data) }));
    },
}));
if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useHolidaze);
}

export default useHolidaze;
