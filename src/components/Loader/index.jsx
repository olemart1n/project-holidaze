import styles from "../../styles/components/Loader.module.css";
function Loader() {
    return (
        <div className={styles.loading_container}>
            <div className={styles.loading_text}>
                <svg viewBox="0 -10.43 47.856 47.856" xmlns="http://www.w3.org/2000/svg">
                    <g id="_4" data-name="4" transform="translate(-533.889 -162.466)">
                        <path
                            id="Path_207"
                            data-name="Path 207"
                            d="M581.745,181.466s0-11.137-8.378-11.137c-5.709,0-30.838,3.292-30.838,3.292l-3.748-5.155h-4.892l5.5,13h11.558l-4.766,8h4.42l8.512-8Z"
                            fill="#59bdff"
                        />
                        <path
                            id="Path_208"
                            data-name="Path 208"
                            d="M563.587,169.2l-11.262-6.737H547.15l7.653,7.569Z"
                            fill="#59bdff"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default Loader;
