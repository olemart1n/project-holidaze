import * as storage from "../../features/storage";

export const ifHostSetVenues = async (name, token, setState) => {
    const req = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues?_bookings=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const res = await req.json();
    setState(res);
    storage.save("hostedVenues", res);
};
