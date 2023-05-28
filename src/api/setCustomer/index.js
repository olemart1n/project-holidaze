export const fetchCustomer = async (bookingId, token, setState) => {
    const req = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${bookingId}?_customer=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const res = await req.json();

    setState(res.customer);
};
