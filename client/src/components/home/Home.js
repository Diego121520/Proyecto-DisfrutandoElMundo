import React from 'react';
import {useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import styles from './home.module.css';
import earth from '../../tierraGirando.gif';

function Home(){
    const [currentPage,setCurrentPage] = React.useState(null);
    const [countries, setCountries] = React.useState([]);
    const [error, setError] = React.useState(false);
    const {page} = useParams();

    useEffect(() => {
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
        if(currentPage){
            fetch(`http://localhost:3001/countries?page=${currentPage}`)
            .then(response => response.json())
            .then(json => {
                setCountries(json);
            })
            .catch(() => setError(true));
        
        }
    },[page,currentPage])

    return(
    <div>
        {countries.count && <h2 className ={styles.totalCountries}>Total de paises: {countries.count}</h2> }
        <div className = {styles.containerCards}>
            {countries.rows && countries.rows.length > 0 ? countries.rows.map((country,key) => {
                return <div className = {styles.containerCard} key={key}>
                        <Link to = {`/country/${country.id}`} style = {{textDecoration: "none",color:"black"}}>
                        <h2 className ={styles.countryName}>{country.name}</h2>
                        <h3 className ={styles.continentName}>{country.continent}</h3>
                        <img className={styles.image} src = {country.flagimage} width="250px" height="200px" alt = {country.flagimage}/>
                        </Link>
                       </div>
            }):(error)?<h1 className={styles.error}>404<br/>No se encontró la página</h1>:<img src = {earth} width ="250px" height="200px"/>}  

        </div>
        <div className = {styles.containerButtons}>
        {(Math.ceil(countries.count/10) >= currentPage)
        ?<a href = {`/home/${currentPage}`}>
        
        { currentPage > 1 && <button className ={styles.prev} onClick = {() => setCurrentPage(currentPage - 1)}>Anterior</button>}
        
        <button className ={styles.buttons} onClick = {() => setCurrentPage(5)}>5</button>
        <button className ={styles.buttons} onClick = {() => setCurrentPage(10)}>10</button>
        <button className ={styles.buttons} onClick = {() => setCurrentPage(15)}>15</button>
        <button className ={styles.buttons} onClick = {() => setCurrentPage(20)}>20</button>
        
        {currentPage < Math.ceil(countries.count/10) && <button className ={styles.next} onClick = {() => setCurrentPage(currentPage + 1)}>Siguiente</button>}
        </a>:""}
        </div>
    </div>
    )
}

export default Home;