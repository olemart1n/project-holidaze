import url from "../url";
import * as storage from "../../features/storage";
export const cancelBooking = (stateToUpdate, bookingId, updateState) => {
    const bookingToDelete = stateToUpdate.find((booking) => booking.id === bookingId);
    const indexOfBooking = stateToUpdate.indexOf(bookingToDelete);
    const clone = [...stateToUpdate];
    const newValue = clone.splice(indexOfBooking, 1);
    console.log(newValue);
    storage.save("bookedByUser", clone);
    updateState(clone);

    fetch(url.bookings + "/" + bookingId, url.deleteFetFetchHeader)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
};
