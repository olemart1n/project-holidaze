import { save, load } from "../../features/storage";
const venues = "https://api.noroff.dev/api/v1/holidaze/venues/";
const bookings = "https://api.noroff.dev/api/v1/holidaze/bookings";
const ownerAndBookings = "?_owner=true&_bookings=true";
const login = "https://api.noroff.dev/api/v1/holidaze/auth/login";
const register = "https://api.noroff.dev/api/v1/holidaze/auth/register";
const hostData =
    "https://api.noroff.dev/api/v1/holidaze/profiles/Brousard?_bookings=true&_venues=true";
let auth;
load("user") ? (auth = load("user").accessToken) : (auth = load("hostUser").accessToken);
const getFetchHeader = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${auth}`,
    },
};
const getMethod = {
    method: "GET",
};
const postMethod = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "",
    },
    body: {},
};
const url = {
    venues,
    bookings,
    ownerAndBookings,
    login,
    register,
    getFetchHeader,
    getMethod,
    postMethod,
};
export default url;
