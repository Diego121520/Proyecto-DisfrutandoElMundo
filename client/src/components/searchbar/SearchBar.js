import React from 'react';
import {Link} from 'react-router-dom';
import styles from './searchbar.module.css';

function SearchBar(){
    const[country,setCountry] = React.useState("");

    function handleInput(e){
        setCountry(e.target.value);
    }

    return(
        <div className = {styles.containerSearch}>
            <div className ={styles.containerReset}>
            {country.length > 0 && <Link to ={`/home`}><input onClick = {() => setCountry("")} type= "button" className={styles.inputButton} value="Limpiar"/></Link>}
            </div>
            <div className= {styles.containerInput}>
            <input value = {country} className= {styles.inputSearch} name = "country" placeholder = "Buscar Pais" onChange = {handleInput}/>
            </div>
            <div className= {styles.containerButton}>
            {(country !== "")?<Link className = {styles.button} to ={`/search/${country}`}>
            Buscar
            </Link>:""}
            </div>
        </div>
    )
}

export default SearchBar;