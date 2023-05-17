import * as yup from "yup";
import studNoroff from "../../constants/mailregex";
const registerSchema = yup.object({
    email: yup
        .string()
        .email()
        .required("Required")
        .matches(studNoroff, "Must be a @stud.noroff.no mail"),
    password: yup.string().min(8).required("Required"),
    name: yup.string().min(2).max(33),
    avatar: yup.string(),
    venueManager: yup.boolean(),
});

export default registerSchema;
