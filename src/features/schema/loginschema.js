import * as yup from "yup";
import studNoroff from "../../constants/mailregex";
const loginSchema = yup.object({
    email: yup
        .string()
        .email()
        .required("Required")
        .matches(studNoroff, "Must be a @stud.noroff.no mail"),
    password: yup.string().min(3).required("Required"),
});

export default loginSchema;
