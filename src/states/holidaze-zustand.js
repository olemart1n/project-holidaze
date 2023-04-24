import { create } from "zustand";

const useHolidaze = create((set) => ({
    user: "Jack Herrington",
    venues: [],
    setVenues: (venues) =>
        set((state) => ({
            ...state,
            venues,
        })),
    filter: "",
    pokemon: [],
    setFilter: (filter) =>
        set((state) => ({
            ...state,
            filter,
        })),
    setPokemon: (pokemon) =>
        set((state) => ({
            ...state,
            pokemon,
        })),
}));
// user: "Jack Herrington",
// homePageData: [],
// setHomePageData: (data) => set((state) => ({ products: (state.products = data)),

export default useHolidaze;
