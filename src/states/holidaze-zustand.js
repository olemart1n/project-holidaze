import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const useHolidaze = create((set) => ({
    venues: [],
    setVenues: (data) => {
        set(() => ({ loading: true }));
        set((state) => ({ venues: (state.venues = data) }));
    },
    filter: "",
    setFilter: (filter) =>
        set((state) => ({
            ...state,
            filter,
        })),
}));
// user: "Jack Herrington",
// homePageData: [],
// setHomePageData: (data) => set((state) => ({ products: (state.products = data)),
if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useHolidaze);
}

export default useHolidaze;
