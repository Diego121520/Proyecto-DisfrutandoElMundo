export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';

export function getCountryDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type:GET_COUNTRY_DETAIL, payload:json})
        })
        .catch((error) => console.log(error));
    }
}