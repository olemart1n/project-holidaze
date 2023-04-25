import styles from "../../styles/components/Home.module.css";
import VenueCard from "../../components/VenueCard";
import { filter, setFilter, setVenues, venues } from "../../states/state-functions";
import { useFetch } from "../../features/useFetch";
import url from "../../url/index";

const FilterInput = () => {
    const initial = filter();
    const setInitial = setFilter();
    return (
        <div>
            <input value={initial} onChange={(e) => setInitial(e.target.value)}></input>
            <div>{initial}</div>
        </div>
    );
};

function Home() {
    const setInitial = setVenues();
    const initial = venues();
    useFetch(url.venues, setInitial);
    // VenueCards is displaying the initial state, instead of state provided by the fetch function!!
    return !initial ? (
        <div>loading</div>
    ) : (
        <main className={styles.home_div}>
            <h1>Venues</h1>
            <FilterInput />
            <VenueCard json={initial} />
        </main>
    );
}
export default Home;
