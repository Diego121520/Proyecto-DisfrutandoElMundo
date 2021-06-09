import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './filter.module.css';
import earth from '../../tierraGirando.gif';

function FilterResults() {
    const { continent, page, activity } = useParams();
    const [results, setResults] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(null);

    useEffect(() => {
        if (!isNaN(parseInt(page)) && parseInt(page) >= 1) {
            setCurrentPage(parseInt(page))
        }
        else {
            if (!page) {
                setCurrentPage(1);
            }
            else {
                setError(true);
            }
        }
        if (continent && currentPage) {
            fetch(`http://localhost:3001/filter-by-continent/${continent}?page=${currentPage}`)
                .then(response => response.json())
                .then(json => {
                    setResults(json);
                })
                .catch(() => setError(true))
        }
        else {
            if (activity) {
                fetch(`http://localhost:3001/filter-by-activity?page=${currentPage}`)
                    .then(response => response.json())
                    .then(json => {
                        setResults(json)
                    })
                    .catch(() => setError(true))
            }
        }
    }, [continent, currentPage, page, activity]);
    console.log(continent)

    if (activity === "activity" || continent === "Asia" || continent === "Americas" || continent === "Europe" || continent === "Africa" || continent === "Oceania" || continent === "Polar") {
        return (
            <div>
                {results.count && (!activity) ? <h2 className={styles.totalCountries}>Total de resultados: {results.count}</h2> : (results.count && activity) ?
                    <h2 className={styles.totalCountries}>Total de actividades creadas: {results.count}</h2> : ""}
                <div className={styles.containerCards}>
                    {(results.rows && results.rows.length > 0) ? results.rows.map((country, key) => {
                        return <div className={styles.containerCard} key={key}>
                            <Link to={`/country/${country.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <h2>{country.name}</h2>
                                <h3>{country.continent}</h3>
                                <img className={styles.image} src={country.flagimage} width="250px" height="200px" alt={country.flagimage} />
                            </Link>
                        </div>
                    }) : (error) ? <h1 className={styles.error}>404<br />No se encontró la página</h1> : (!activity) ? <img src={earth} /> : (activity && results.count === 0) ? <h1>Aún no se han creado actividades</h1> : ""}

                </div>
                {((Math.ceil(results.count / 10) >= currentPage) && continent) ? <div>
                    <a href={(continent) ? `/filter-by-continent/${continent}/${currentPage}` : `/filter-by/activity`}>
                        {currentPage > 1 && <button className={styles.prev} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>}
                        {currentPage < Math.ceil(results.count / 10) && <button className={styles.next} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>}
                    </a>
                </div> : ""}
            </div>
        )
    }
    else {
        return (
            <h1 className={styles.error}>404<br />No se encontró la página</h1>
        )
    }
}

export default FilterResults;