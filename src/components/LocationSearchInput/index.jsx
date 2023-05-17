import React, { useState, useRef, useEffect } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import YupInput from "../YupInput";
const LocationSearchInput = ({
    register,
    error,
    setCity,
    setZip,
    setStreet,
    setCountry,
    setLatLng,
}) => {
    const [initialState, setInitialState] = useState("");
    const listItem = useRef(null);
    const handleChange = (initialState) => {
        setInitialState(initialState);
    };

    const handleSelect = async (initialState) => {
        const req = await geocodeByAddress(initialState);
        const latLng = await getLatLng(req[0]);
        const place = req[0];
        const addressComponents = place.address_components.reduce((acc, component) => {
            const componentType = component.types[0];
            acc[componentType] = component.long_name;
            return acc;
        }, {});

        const zip = addressComponents.postal_code || "";
        const street = addressComponents.route || "";
        const city = addressComponents.locality || "";
        const country = addressComponents.country || "";
        setCity(city);
        setZip(zip);
        setStreet(street);
        setCountry(country);
        setLatLng(latLng);
    };

    const changeFocus = (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            listItem.current.focus();
        } else return;
    };

    const keyAccessibility = (e) => {
        let currentItem = e.currentTarget;
        if (e.keyCode === 40 && currentItem.nextElementSibling) {
            currentItem.tabIndex = 0;
            currentItem.nextElementSibling.setAttribute("tabIndex", 1);
            currentItem.nextElementSibling.focus();
        }
        if (e.keyCode === 38 && !currentItem.previousElementSibling) {
            const parent = currentItem.parentNode;
            const parentSibling = parent.previousElementSibling;
            parentSibling.children[1].focus();
        }
        if (e.keyCode === 38 && currentItem.previousElementSibling) {
            currentItem.tabIndex = 0;
            currentItem.previousElementSibling.setAttribute("tabIndex", 1);
            currentItem.previousElementSibling.focus();
        }
        if (e.keyCode === 13) {
            currentItem.click();
        }
    };
    const inputStyling = {
        paddingInlineStart: "10px",
        padding: "10px",
        fontSize: "1rem",
        border: "2px solid rgba(220, 220, 221, 0.5)",
        margin: "auto",
    };

    return (
        <PlacesAutocomplete value={initialState} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <YupInput
                        register={register}
                        inputName={"street"}
                        errors={error}
                        {...getInputProps({})}
                        onKeyDown={(e) => changeFocus(e)}
                        inputId="place-search-input"
                    />
                    <ul className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            return (
                                <div
                                    tabIndex={suggestion.index === 0 ? "1" : null}
                                    ref={suggestion.index === 0 ? listItem : null}
                                    onKeyDown={(e) => keyAccessibility(e)}
                                    key={suggestion.index}
                                    // className={className}

                                    {...getSuggestionItemProps(suggestion, {})}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;
