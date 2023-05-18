import React, { useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationSearchInput = ({
    setCity,
    setZip,
    setStreet,
    setCountry,
    setLatLng,
    setContinent,
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
        try {
            fetch("https://ulcxpfjjujtdnmvvzzuz.supabase.co/rest/v1/continents?select=*", {
                method: "GET",
                headers: {
                    apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
                    Authorization: "Bearer " + import.meta.env.VITE_SUPABASE_AUTHORIZATION,
                },
            })
                .then((data) => data.json())
                .then((result) => {
                    const match = result.filter((element) => {
                        return element.country === addressComponents.country;
                    });
                    setContinent(match[0].continent);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const inputDivStyling = {
        display: "flex",
        alignItems: "center",
    };

    const inputStyling = {
        paddingInlineStart: "10px",
        padding: ".4rem 1rem",
        fontSize: "1rem",
        border: "2px solid rgba(220, 220, 221, 0.5)",
        margin: "5px 10px",
    };

    const searchIcon = {
        fontSize: "1.3rem",
    };

    const inactiveStyle = { backgroundColor: "#ffffff", cursor: "pointer" };
    const activeStyle = { backgroundColor: "rgba(64, 200, 255, 0.15)", cursor: "pointer" };

    return (
        <PlacesAutocomplete value={initialState} onChange={handleChange} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <div style={inputDivStyling}>
                        <BiSearch style={searchIcon} />
                        <input
                            style={inputStyling}
                            {...getInputProps({
                                placeholder: "Find address",
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
