import {Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import Filter from '../filter/Filter';
import Ordering from '../ordering/Ordering';
import styles from './nav.module.css';
import earth from '../../tierraGirando.gif';

function Nav(){
    return(
       <div className = {styles.container}>
           <div className = {styles.containerImg}>
            <Link to="/">
           <img src = {earth} width = "60px" height="50px" className= {styles.img}/>
           </Link>
           </div>
           <SearchBar/>
           <Ordering/>
           <Filter/>

           <Link style = {{textDecoration:"none", color:"black"}} to = "/home">
            <h4 className = {styles.home}>Home</h4>
           </Link>
           <Link style = {{textDecoration:"none",color:"black"}} to = "/create-activity">
           <h4 className = {styles.activity}>Crear actividad</h4>
           </Link>

       </div> 
    )
}

export default Nav;