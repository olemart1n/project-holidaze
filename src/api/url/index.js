import { load } from "../../features/storage";
const venues = "https://api.noroff.dev/api/v1/holidaze/venues/";
const bookings = "https://api.noroff.dev/api/v1/holidaze/bookings/";
const ownerAndBookings = "?_owner=true&_bookings=true";
const login = "https://api.noroff.dev/api/v1/holidaze/auth/login";
const register = "https://api.noroff.dev/api/v1/holidaze/auth/register";
const profile = "https://api.noroff.dev/api/v1/holidaze/profiles/";
let auth;
if (load("user") || load("hostUser")) {
    load("user") ? (auth = load("user").accessToken) : (auth = load("hostUser").accessToken);
}

const getFetchHeader = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${auth}`,
    },
};
const authorization = `Bearer ${auth}`;
const deleteFetchHeader = {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${auth}`,
    },
};
const getMethod = {
    method: "GET",
};
let postMethod = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        authorization: "",
    },
    body: {},
};
let put = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        authorization: "",
    },
    body: {},
};
let post = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        authorization: "",
    },
    body: {},
};
export const url = {
    venues,
    bookings,
    ownerAndBookings,
    login,
    register,
    getFetchHeader,
    getMethod,
    postMethod,
    deleteFetchHeader,
    authorization,
    profile,
    put,
    post,
};
