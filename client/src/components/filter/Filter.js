import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './filter.module.css';

function Filter() {
    const [continents, setContinents] = React.useState([]);
    const [showFilters, setShowFilters] = React.useState(false);
    const [showContinents, setShowContinents] = React.useState(false);

    useEffect(() => {
        if (showContinents) {
            fetch(`http://localhost:3001/continents`)
                .then(response => response.json())
                .then(json => {
                    setContinents(json);
                })
                .catch(err => console.log(err));
        }
    }, [showContinents])

    return (
        <div className={styles.containerFilterOptions}>
            <button className={styles.btnFilter} onClick={() => setShowFilters(!showFilters)}>Filtros</button>
            
            {showFilters &&
                <div className={styles.filterOptions}>
                    <ul id="ulContainer" className={styles.containerUl}>
                        <li className={styles.continent} onClick={(e) => setShowContinents(!showContinents)}>Continente</li>
                        <Link style={{ textDecoration: "none", color: "black" }} to={"/filter-by/activity"}><li className={styles.activity}>Actividad</li></Link>
                    </ul>
                </div>}

            {showFilters && showContinents &&
                <div className={styles.containerList}>
                    <ul className={styles.ulList}>
                        {continents.map((continent, key) => {
                            return <Link key={key} style={{ textDecoration: "none", color: "black" }} to={`/filter-by-continent/${continent}`}>
                                <li className={styles.list}>{continent}</li></Link>
                        })}
                    </ul>
                </div>}
        </div>
    )
}

export default Filter;