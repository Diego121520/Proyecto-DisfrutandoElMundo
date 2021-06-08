import {useState} from 'react';
import styles from './activityForm.module.css';
import {useEffect} from 'react';

function ActivityForm(){
    const[activityData,setActivityData] = useState({
        name:"",
        difficulty:0,
        duration:"",
        season:"",
        countries:[]
    });
    const[countries,setCountries] = useState([]);
    const [showCountries,setShowCountries] = useState(false);
    const[submit,setSubmit] = useState(false);

    function countriesAdded(){
        let select = document.getElementById("select")

        if(select){
            if(activityData.countries.length >= 5){
                alert("solo puede seleccionar un maximo de 5 paises")
            }
            
            else{
                let countrySelected = select.options[select.selectedIndex].value;
                if(activityData.countries.find(country => country === countrySelected)){
                    alert("Pais ya seleccionado")
                }
                else{
                setActivityData({...activityData,
                countries: activityData.countries.concat(countrySelected)})
                }
            }
        }
    }

    function setDificulty(){
        let select = document.getElementById("selectDifficulty");

        if(select){
            let difficulty = select.options[select.selectedIndex].value;
            setActivityData({...activityData,
                difficulty: difficulty})
        }
    }

    function setSeason(){
        let select = document.getElementById("selectSeason");

        if(select){
            let season = select.options[select.selectedIndex].value;
            setActivityData({...activityData,
                season: season})
        }
    }

    function handleInput(e){
        setActivityData({...activityData,
        [e.target.name]:e.target.value})
    }
    //lista de todos los paises
    const AddCountries = () =>{
        return (
        <select id = "select"  multiple className = {styles.select} onClick = {countriesAdded}>
            {countries && countries.length >0 ?countries.map((country,key) => {
                return <option key = {country.name}>{country.name}</option>
            }):""}
        </select>)
    }
    //elimino pais que se selecciono
    function deleteCountrySelected(e){
        let span = document.getElementById(e.target.id);
        e.target.onClick = span.remove();
        setActivityData({...activityData,
            countries: activityData.countries.filter(country => country !== span.innerText.slice(1))})
    }
    //muestro los paises que se seleccionan
    const ShowCountrySelected = () =>{
        return(
            <div >
                {activityData.countries.length > 0?activityData.countries.map((country,key) => {
                    return<div id ={key} className = {styles.containerSpan} key = {key}><button  className = {styles.btn} onClick = {deleteCountrySelected} type ="button" id = {key}>x</button>
                        <p className = {styles.span} >{country}</p></div>
                }):""}
            </div>
        )
    }

    function validateData(){
        if(activityData.name.trim() === ""){
             alert("El campo nombre no puede quedar vacío")}
       else if(activityData.difficulty === 0 || activityData.difficulty === "Seleccionar"){
             alert("Debe seleccionar una difficultad")}
       else if(activityData.duration.trim() === ""){
             alert("el campo duración no puede quedar vacío")}
       else if(activityData.season === "Seleccionar"){
             alert("Debe seleccionar una temporada")}
       else if(activityData.countries.length === 0){
             alert("debe seleccionar almenos 1 pais");
        }
        else{
            return setSubmit(true);
        }
        return setSubmit(false);
    }

    function handleSubmit(){
        validateData();
    }

    useEffect(() => {
        if(showCountries){
        fetch('http://localhost:3001/allCountries')
        .then((response) => response.json())
        .then((json) => {
            setCountries(json);
        })
        .catch(error => console.log(error))
    }
    if(submit && activityData){
        fetch('http://localhost:3001/activity',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData)
        })
        .then(() => {
            console.log(submit, activityData)
            return alert("Actividad creada exitosamente");})
        .catch((error) => {
            return console.log(error);
        })
    }
    },[showCountries,submit,activityData]);

return(
    <div>
        <div id = "containerForm" className = {styles.containerForm}>
            <form className = {styles.containerData}>
            
            <button type = "submit" className = {styles.create} onClick = {handleSubmit}>Crear</button><br/>
            <label>Nombre</label><br/>
            <input name="name" onChange = {handleInput}/><br/>
            
            <label>Difficultad</label><br/>
            <select id = "selectDifficulty" onChange = {setDificulty}>
                <option>Seleccionar</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select><br/>
            
            <label>Duración</label><br/>
            <input name="duration" onChange = {handleInput}/><br/>
            
            <label>Temporada</label><br/>
            <select id = "selectSeason" onChange = {setSeason}>
                <option>Seleccionar</option>
                <option>Invierno</option>
                <option>Primavera</option>
                <option>Verano</option>
                <option>Otoño</option>
            </select><br/>
            
            <button type = "button" onClick = {() => setShowCountries(!showCountries)}>Agregar paises</button><br/>
            {(showCountries)?<AddCountries/> :""}<br/>
            {<ShowCountrySelected/>}
            </form>
        </div>

    </div>
)}

export default (ActivityForm);