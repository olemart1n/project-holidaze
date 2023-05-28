import * as storage from "../../features/storage";
export const setBookingsByUser = async (name, token, setState) => {
    const req = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings?_venue=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const res = await req.json();
    setState(res);
    storage.save("bookedByUser", res);
};
