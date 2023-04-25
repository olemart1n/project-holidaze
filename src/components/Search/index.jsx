import styles from "../../styles/components/Search.module.css";
import { venues, setVenues } from "../../states/state-functions";
function Search() {
    const remove = setVenues();
    function clearHome() {
        remove([]);
    }
    return (
        <div className={styles.search_div}>
            <input
                onChange={clearHome}
                className={styles.search_input}
                type="textbox"
                placeholder="search"
                name="search"
            ></input>
        </div>
    );
}

export default Search;
