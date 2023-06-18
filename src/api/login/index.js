import { url } from "../url";

import { save } from "../../features/storage";
import { setBookingsByUser } from "../setBookingsByUser";
import { ifHostSetVenues } from "../setHostedVenues";

export const login = async (
    data,
    setErr,
    setSuccess,
    setLoading,
    setUser,
    setHostUser,
    setHostVenues,
    setUserBookings,
    setAvatar
) => {
    setLoading(true);
    url.post.headers = { "Content-Type": "application/json" };
    url.post.body = JSON.stringify(data);
    fetch(url.login, url.post)
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
                setAvatar(data.avatar);
                save("avatar", data.avatar);
            } else {
                setErr(false);
                save("user", data);
                setUser(data);
                setBookingsByUser(data.name, data.accessToken, setUserBookings);
                setSuccess(true);
                setErr(false);
                setAvatar(data.avatar);
                save("avatar", data.avatar);
            }
        })
        .catch((error) => console.log(error));
};
