import * as yup from "yup";

const venueSchema = yup.object({
    name: yup.string().min(2).max(33),
    image: yup.string(),
    // perk: yup.boolean(),
    street: yup.string(),
    city: yup.string(),
    zip: yup.string().min(3),
    country: yup.string(),
    continent: yup.string(),
});

export default venueSchema;
