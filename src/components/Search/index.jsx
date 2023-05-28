import styles from "../../styles/components/Search.module.css";
import { venues, setVenues, filteredVenues, setFilteredVenues } from "../../states/state-functions";
import { GoSearch } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { filterVenuesByName } from "../../features/search";
import FilteredVenue from "../FilteredVenue";
function Search() {
    const buttonRef = useRef(null);
    const initialVenues = venues();
    const filterVenues = filteredVenues();
    const setFilterVenues = setFilteredVenues();
    const [inputValue, setInputValue] = useState("");
    const [searching, setSearching] = useState(false);
    useEffect(() => {
        if (inputValue.length === 1) {
            setSearching(true);
        }
        if (inputValue.length > 0) {
            filterVenuesByName(inputValue, initialVenues, setFilterVenues);
        }
    }, [inputValue]);
    let startY;
    let endY;
    const touchStart = (e) => {
        startY = e.touches[0].clientY;
    };
    const touchEnd = (e) => {
        endY = e.changedTouches[0].clientY;

        let distanceY = endY - startY;
        if (distanceY < 0) {
            buttonRef.current.focus();
        }
    };
    return (
        <div className={searching ? styles.search_div_active : styles.search_div}>
            <div className={searching ? styles.search_div_div_active : styles.search_div_div}>
                {!searching && <GoSearch />}
                <input
                    className={styles.search_input}
                    type="textbox"
                    name="search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                ></input>
            </div>
            {searching && (
                <button
                    ref={buttonRef}
                    className={styles.search_input_stop_button}
                    onClick={() => {
                        setSearching(false);
                        setInputValue("");
                    }}
                >
                    <RxCross1 className={styles.search_input_stop_icon} />
                    clear search
                </button>
            )}
            {searching && (
                <div
                    className={styles.search_div_results}
                    onTouchStart={(e) => touchStart(e)}
                    onTouchEnd={(e) => touchEnd(e)}
                >
                    {filterVenues.map((venue) => {
                        return <FilteredVenue data={venue} key={venue.id} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default Search;
