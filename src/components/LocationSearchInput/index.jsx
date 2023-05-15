import styles from "../../styles/components/LocationSearchInput.module.css";
import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import YupInput from "../YupInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LocationSearchInput = () => {
    const [address, setAddress] = useState("");
    const registerSchema = yup.object({
        city: yup.string(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log("Success", latLng))
            .catch((error) => console.error("Error", error));
    };
    return (
        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    {/* <input
                        {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input",
                        })}
                    /> */}
                    <YupInput
                        register={register}
                        inputName={"city"}
                        errors="not sure about errors"
                        placeholder="adress"
                        {...getInputProps({})}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: "#faface", cursor: "pointer" }
                                : { backgroundColor: "#ffffff", cursor: "pointer" };
                            return (
                                <div
                                    key={suggestion.index}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;
