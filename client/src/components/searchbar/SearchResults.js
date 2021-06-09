import React,{useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import styles from './searchbar.module.css';
import earth from '../../tierraGirando.gif';

function SearchResults(){
    const[results,setResults] = React.useState([]);
    const[currentPage,setCurrentPage] = React.useState(null);
    const [error,setError] = React.useState(false);
    const {country,page} = useParams();

    useEffect(() =>{
        if(!isNaN(parseInt(page)) && parseInt(page) >= 1){
            setCurrentPage(parseInt(page))}
        else{
            if(!page){
                setCurrentPage(1);
            }
            else{
                setError(true);
            }
        }
        if(!country){
            setError(true)
        }
        if(country && currentPage){
            fetch(`http://localhost:3001/countries?name=${country}&page=${currentPage}`)
            .then((response) => response.json())
            .then(json => {
                setResults(json)
            })
            .catch(() => setError(true));
        }
    },[country,page,currentPage]);

    return(
    <div>
        {results.count && <h2 className= {styles.totalCountries}>Total de paises: {results.count}</h2> }
        <div className = {styles.containerCards}>
            {(results.rows && results.rows.length > 0)? results.rows.map((country,key) => {
                return <div className = {styles.containerCard} key = {key}>
                         <Link to = {`/country/${country.id}`} style = {{textDecoration: "none",color:"black"}}>
                         <h2>{country.name}</h2>
                         <h3>{country.continent}</h3>
                         <img className={styles.image} src = {country.flagimage} width="250px" height="200px" alt = {country.flagimage}/>
                         </Link>
                    </div>
            }):(error)?<h1 className ={styles.error}>404<br/>No se encontró la página</h1>:<img src={earth}/>}
        </div>

        {Math.ceil(results.count/10) >= currentPage?<div>
        <a href = {`/search/${country}/${currentPage}`}>
        {currentPage > 1 &&<button className ={styles.prev} onClick = {() => setCurrentPage(currentPage - 1)}>Anterior</button>}
        {currentPage < Math.ceil(results.count/10) && <button className ={styles.next} onClick = {() => setCurrentPage(currentPage + 1)}>Siguiente</button>}
        </a>
        </div>:""}

    </div>
    )
}

export default SearchResults;