export const filterVenuesByName = (inputValue, venues, setFilterVenues) => {
    const filtered = venues.filter((venue) => {
        return venue.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilterVenues(filtered);
};
