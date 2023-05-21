import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const useHolidaze = create((set) => ({
    user: {},
    error: [],
    isLoading: false,
    hostUser: {},
    venues: [],
    specificVenue: {},
    hostedVenues: [],
    bookedByUser: [],
    setHostedVenues: (data) => set((state) => ({ hostedVenues: (state.hostedVenues = data) })),
    setBookedByUser: (data) => set((state) => ({ bookedByUser: (state.bookedByUser = data) })),
    setHostUser: (data) => set((state) => ({ hostUser: (state.hostUser = data) })),
    setUser: (data) => set((state) => ({ user: (state.user = data) })),
    setIsLoading: (data) => set((state) => ({ isLoading: (state.isLoading = data) })),
    setSpecificVenue: (data) => {
        set((state) => ({ specificVenue: (state.specificVenue = data) }));
    },
    setVenues: (data) => {
        set((state) => ({ venues: (state.venues = data) }));
    },
    setError: (data) => {
        set((state) => ({ error: (state.error = data) }));
    },
}));
if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useHolidaze);
}

export default useHolidaze;
