import * as storage from "../../features/storage";

const setHostedVenuesFunction = async (setState) => {
    const req = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${
            storage.load("hostUser").name
        }?_bookings=true&_venues=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${storage.load("hostUser").accessToken}`,
            },
        }
    );
    const res = await req.json();
    setState(res);
};

export default setHostedVenuesFunction;
