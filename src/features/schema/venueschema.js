import * as yup from "yup";

const venueSchema = yup.object({
    name: yup.string().min(2).max(33),
    image: yup.string(),
    // perk: yup.boolean(),
    street: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    description: yup.string().required(),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    maxGuests: yup.number(),
    price: yup.number(),
});

export default venueSchema;
