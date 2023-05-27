import url from "../url";

import { save } from "../../features/storage";
import setBookingsByUser from "../setBookingsByUser";
import ifHostSetVenues from "../setHostedVenues";

const header = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {},
};
export const login = async (
    data,
    setErr,
    setSuccess,
    setLoading,
    setUser,
    setHostUser,
    setHostVenues,
    setUserBookings
) => {
    setLoading(true);
    header.body = JSON.stringify(data);
    fetch(url.login, header)
        .then((data) => data.json())
        .then((data) => {
            if (data.errors) {
                setErr(data.errors[0].message);
                return;
            }
            if (data.venueManager === true) {
                save("hostUser", data);
                setHostUser(data);
                ifHostSetVenues(data.name, data.accessToken, setHostVenues);
                setBookingsByUser(data.name, data.accessToken, setUserBookings);
                setSuccess(true);
                setErr(false);
            } else {
                setErr(false);
                save("user", data);
                setUser(data);
                setBookingsByUser(data.name, data.accessToken, setUserBookings);
                setSuccess(true);
                setErr(false);
            }
        })
        .catch((error) => console.log(error));
};
