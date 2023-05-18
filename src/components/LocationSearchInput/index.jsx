import React, { useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationSearchInput = ({ setCity, setZip, setStreet, setCountry, setLatLng }) => {
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

    const inputDivStyling = {
        display: "flex",
        alignItems: "center",
        placeContent: "center",
    };

    const inputStyling = {
        paddingInlineStart: "10px",
        padding: "5px 5px",
        fontSize: "1rem",
        border: "2px solid rgba(220, 220, 221, 0.5)",
        margin: "5px 10px",
    };

    const inactiveStyle = { backgroundColor: "#ffffff", cursor: "pointer" };
    const activeStyle = { backgroundColor: "rgba(64, 200, 255, 0.15)", cursor: "pointer" };

    return (
        <PlacesAutocomplete value={initialState} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <div style={inputDivStyling}>
                        <BiSearch />
                        <input
                            style={inputStyling}
                            {...getInputProps({
                                placeholder: "Search Places",
                                className: "location-search-input",
                            })}
                        />
                    </div>
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                            const style = suggestion.active ? activeStyle : inactiveStyle;
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
