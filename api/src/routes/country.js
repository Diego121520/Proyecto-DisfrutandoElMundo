const {Country,TouristActivity} = require('../db.js');
const router = require('express').Router();
const axios = require('axios');
const async = require('async');
const { response } = require('express');
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

router.get('/countries',function(req,res,next){
    if(req.query.name || req.params.id){
        return next()
    }
    const page = req.query.page || 1;

    if(isNaN(parseInt(page)) || parseInt(page) < 1){
        return res.sendStatus(400);
    }
    try {
    Country.findAndCountAll({
        offset:((page-1)*10),
        limit:10}).then((country) => {
        if(country.count > 0){
        if(country.count < 10 && parseInt(page) > 1){
            return res.sendStatus(404);
        }
        if(Math.ceil(country.count/10) < parseInt(page)){
            return res.sendStatus(404);
        }
        return  res.json(country);
        }else{
            axios.get("https://restcountries.eu/rest/v2/all")
            .then((response) => {
                let countries = response.data;
                countries.map(country => Country.create({
                    id: country.alpha3Code,
                    name: country.name,
                    flagimage:country.flag,
                    continent: country.region,
                    capitalCity: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population,                  
               })
               .then(response => {return res.json(response.data)})
               .catch((error) => res.sendStatus(500))
               );
            })
        }
    })
} 
    catch (error) {
       return res.sendStatus(500);
    }
})

router.get('/countries/:id',function(req,res,next){
    const {id} = req.params;
    if(!req.params.id){
        return next();
    }
    if(id.length !== 3 || !isNaN(parseInt(id))){
        return res.sendStatus(400);
    }
    try {
    const idCountry = id.toUpperCase();
    Country.findOne({where: {id: idCountry},include: TouristActivity})
    .then((country) =>{ 
        if(!country){
            return res.sendStatus(404);
        } 
       return res.json(country)});
    } catch (error) {
       return res.sendStatus(500);
    }
})

router.get('/countries', function(req,res){
    const { name } = req.query;
    const page = req.query.page || 1;
    if(!isNaN(parseInt(name))){
        return res.sendStatus(400);
    }
    try {
        Country.findAndCountAll({
            where: {
                name: {[Sequelize.Op.iLike]:`%${name}%`}},
                offset:((page-1)*10),
                limit:10})
        .then((country) => { 
            if(Math.ceil(country.count/10) < parseInt(page)){
                return res.sendStatus(404);
            }
            if(country.count === 0){
                return res.sendStatus(404);}
            else{
              return  res.json(country);}
            }) 
    } catch (error) {
        return res.sendStatus(500);
    }
})

router.post('/activity', async function(req,res){
    const {name,difficulty,duration,season,countries} = req.body;

    if(!name || !difficulty || !duration || !season || (!countries || countries === [])){
        return res.sendStatus(400);
    }
try {
    const newActivity = await TouristActivity.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
    }).catch(() =>{ return res.sendStatus(500)})
    // la conexion con la tabla intermedia mediante el pais
    if(countries.length > 0){
        countries.map(country => 
            {return Country.findOne({where:{name:country}})
            .then(response => {newActivity.addCountry(response)})
            .catch(() => res.sendStatus(500))
        })
        return res.sendStatus(200);
    }
    else{  
        const countryForActivity = await Country.findOne({
            where:{
                name:countries[0]
            }
        })
        .then((response) => { 
            newActivity.addCountry(countryForActivity)
            return res.sendStatus(200)})
        .catch(() => { return res.sendStatus(500)});
    }
    return res.sendStatus(200);
    }catch (error) {  
     return res.sendStatus(500);  
    }
});

//rutas extras
//trae todos los countries
router.get('/allCountries',function(req,res){
    try {
        Country.findAll().then(countries => res.json(countries))
    } catch (error) {
        return res.sendStatus(500);
    }
})

//trae solo los continentes
router.get('/continents', function(req,res){
    let continents = [];
    try {
        Country.findAll({attributes:["continent"]})
        .then(response => {
            response.map(data => {
                let continent = data.dataValues.continent;
                if(!continents.includes(continent) && continent !== ""){
                    continents.push(continent);
                }
            })
            return res.json(continents);
        })
    } catch (error) {
        return res.sendStatus(500);
    }
})

//filtra por actividad
router.get('/filter-by-activity',function(req,res){
    const page = req.query.page || 1;
    try {
        Country.findAndCountAll({include:
            [{model:TouristActivity,
                where:{
                    id:{
                        [Sequelize.Op.gte]:1}
                    }
                }]})
        .then(response => {
           return res.json(response)
        })
    } catch (error) {
        return res.sendStatus(500);
    }
})

//filtra por continente
router.get('/filter-by-continent/:continent',function(req,res,next){
    const continentSelected = req.params.continent;
    const page = req.query.page || 1;
    if(!req.params.continent){
        return next();
    }

    if(isNaN(parseInt(page)) || parseInt(page) < 1){
        return res.sendStatus(400);
    }

    try {     
    Country.findAndCountAll({where:
        {continent:
            {[Sequelize.Op.iLike]: continentSelected}},
        offset:((page-1)*10),
        limit:10})
    .then(response => {
        if(response.count < 10 && parseInt(page) > 1){
            return res.sendStatus(404);
        }
        if(Math.ceil(response.count/10) < parseInt(page)){
            return res.sendStatus(404);
        }
        return res.json(response)});
    }catch (error) {
      return  res.send(error);
    }    
})

//ordenamiento
router.get('/order-by/:ordering',function(req,res){
    const {ordering} = req.params;
    const page = req.query.page || 1;

    const [by,order] = ordering.split("-");
    order.toUpperCase();

    if(isNaN(parseInt(page)) || parseInt(page) < 1){
        return res.sendStatus(400);
    }

    try {
        Country.findAndCountAll({
            order:[[by,order]],
            offset:((page-1)*10),
            limit:10})
        .then(response => {
            if(response.count < 10 && parseInt(page) > 1){
                return res.sendStatus(404);
            }
            if(Math.ceil(response.count/10) < parseInt(page)){
                return res.sendStatus(404);
            }
            
            return res.json(response)
        })
    } catch (error) {
       return res.sendStatus(500)
    }
})

router.delete('/delete-activity', function(req,res){

});

module.exports = router;