import * as storage from "../../features/storage";

const ifHostSetVenues = async (name, token, setState, apiQuery) => {
    const req = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const res = await req.json();
    setState(res[apiQuery]);
};

export default ifHostSetVenues;
