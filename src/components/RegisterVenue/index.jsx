import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupInput from "../YupInput";
function RegisterVenue() {
    const venueSchema = yup.object({
        name: yup.string().min(2).max(33),
        image: yup.string(),
        perk: yup.boolean(),
        address: yup.string(),
        city: yup.string(),
        zip: yup.string().min(4),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(venueSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <YupInput
                placeholder="give your venue a name"
                errors={errors}
                register={register}
                inputName={"name"}
            />
            <YupInput errors={errors} register={register} inputName={"zip"} />
            <button>submit</button>
        </form>
    );
}

export default RegisterVenue;
