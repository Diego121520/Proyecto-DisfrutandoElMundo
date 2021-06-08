import React, {useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import styles from './ordering.module.css';

function OrderingResults(){
    const [results,setResults] = React.useState([]);
    const [currentPage,setCurrentPage] = React.useState(null);
    const [error, setError] = React.useState(false);
    const {ordering,page} = useParams();

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
        if(ordering && currentPage){
        fetch(`http://localhost:3001/order-by/${ordering}?page=${currentPage}`)
        .then(response => response.json())
        .then(json => {
            setResults(json);
        })
        .catch(() => setError(true))
    }
    },[ordering,page,currentPage]);

    return(
        <div>
            {results.count && <h2>Total de paises: {results.count}</h2> }
            <div className = {styles.containerCards}>
                {(results.rows && results.rows.length > 0)? results.rows.map((country,key) => {
                    return <div className = {styles.containerCard} key = {key}>
                         <Link to = {`/country/${country.id}`} style = {{textDecoration: "none",color:"black"}}>
                         <h2>{country.name}</h2>
                         <h3>{country.continent}</h3>
                         <img className={styles.image} src = {country.flagimage} width="250px" height="200px" alt = {country.flagimage}/>
                         </Link>
                    </div>
                }):(error)?<h1>404<br/>No se encontró la página</h1>:<h1>Cargando...</h1>}  
            </div>
       
        {(Math.ceil(results.count/10) >= currentPage)? <div>
        <a href = {`/order-by/${ordering}/${currentPage}`}>
        {currentPage > 1 &&<button onClick = {() => setCurrentPage(currentPage - 1)}>Anterior</button>}

        <button onClick = {() => setCurrentPage(5)}>5</button>
        <button onClick = {() => setCurrentPage(10)}>10</button>
        <button onClick = {() => setCurrentPage(15)}>15</button>
        <button onClick = {() => setCurrentPage(20)}>20</button>

        {currentPage < Math.ceil(results.count/10) &&<button onClick = {() => setCurrentPage(currentPage + 1)}>Siguiente</button>}
        </a>
        </div>:""}
        
        </div>
    )
}

export default OrderingResults;
