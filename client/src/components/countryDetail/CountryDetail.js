import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styles from './countryDetail.module.css';
import earth from '../../tierraGirando.gif';

function CountryDetail(){
    const {id} = useParams();
    // const[deleteActivity, setDeteleActivity] = React.useState(false);
    const[countryDetail,setCountryDetail] = React.useState(null);
    const [deleteId, setDeleteId] = React.useState(null);
    const [error,setError] = React.useState(false);

    // function handleOnClick(){
    //     setDeleteId(activity.id)
    // }
    useEffect(() =>{
        if(id){
        fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(json => {
            setCountryDetail(json);
        })
        .catch(() => setError(true));
        }
        if(deleteId){
            fetch(`http://localhost:3001/delete-activity/${deleteId}`, {
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            })
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
        }
    
    },[id,deleteId]);

    let touristActivities = (countryDetail)? countryDetail.touristActivities:"";
    return(
        <div className = {styles.containerCard}>

            {countryDetail && Object.keys(countryDetail).length > 0?
            <div className = {styles.containerData}>
            <h2>{countryDetail.name} ({countryDetail.id})</h2>
            <h3>{countryDetail.continent}</h3>

            <img src = {countryDetail.flagimage} width = "300px" height = "250px" alt = {countryDetail.flagimage}/>

            <h2>Capital: {countryDetail.capitalCity}</h2>
            <h2>Subregión: {countryDetail.subregion}</h2>
            <h2>Area: {countryDetail.area} KM²</h2>
            <h2>Población: {countryDetail.population}</h2>
            </div>:(error)?<h1 className={styles.error}>404<br/>No se encontró la página</h1>:<img src={earth}/>}
            

            {(!error && countryDetail)?<h1 className= {styles.activityText}>Actividades</h1>:""}
            <div className = {styles.containerActivities}>
            {(touristActivities && touristActivities.length > 0 && !error)
            ?touristActivities.map((activity,key) => {
                return <div key = {key} className = {styles.containerActivity}>
                    <button onClick = {() => setDeleteId(activity.id)} className = {styles.btn}>Eliminar</button>
                    <h4>Nombre: {activity.name}</h4>
                    <h4>Difficultad: {activity.difficulty}</h4>
                    <h4>Duración: {activity.duration}</h4>
                    <h4>Temporada: {activity.season}</h4>
                </div>
            }):(!error && touristActivities)?<h4 className={styles.error}>Aún no se han creado actividades</h4>:""}</div>
        </div>
    )};

export default (CountryDetail);