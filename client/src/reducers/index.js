import {GET_COUNTRY_DETAIL} from '../actions/index';

const initialState = {
    countryDetail: {}
}
function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload
            }
        default: return state;
    }
}

export default rootReducer;