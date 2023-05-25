import url from "../url";
import { save } from "../../features/storage";
const header = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: "",
    },
    body: {},
};
export const updateVenue = async (data, id, token, setError, setSuccess, venues, setVenues) => {
    const { name, description, location, meta, price, maxGuests, media } = data;
    const { wifi, pets, breakfast, parking } = meta;
    const { street, city, zip } = location;
    try {
        const arr = [...venues];
        const venueToUpdate = arr.find((venue) => venue.id === id);
        const index = arr.indexOf(venueToUpdate);
        arr.splice(index, 1);
        venueToUpdate.description = description;
        venueToUpdate.name = name;
        venueToUpdate.location.city = city;
        venueToUpdate.location.address = street;
        venueToUpdate.location.zip = zip;
        venueToUpdate.meta.wifi = wifi;
        venueToUpdate.meta.pets = pets;
        venueToUpdate.meta.breakfast = breakfast;
        venueToUpdate.meta.parking = parking;
        venueToUpdate.price = price;
        venueToUpdate.maxGuests = maxGuests;
        venueToUpdate.media = media;

        const newArr = [...arr, venueToUpdate];
        setVenues(newArr);
        save("hostedVenues", newArr);
    } catch (error) {
        console.log(error);
    }
    try {
        header.body = JSON.stringify(data);
        header.headers.Authorization = "Bearer " + token;
        fetch(url.venues + id, header)
            .then((data) => data.json())
            .then((data) => {
                if (data.errors) {
                    setError(data.errors[0].message);
                    console.log(data.errors[0].message);
                    return;
                }
                setSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
};
