//Action
const LOAD_DATE = "calendar/LOAD_DATE"
const PREV_MONTH = "calendar/PREV_MONTH"
const NEXT_MONTH = "calendar/NEXT_MONTH"
const RESET_DATE = "calendar/RESET_DATE"

const initialState = {
    
    thismonth: 5,
    year: 2021,

        };

// Action Creators
export const loadDate = (date) =>{
    return {type:LOAD_DATE, date};
};
export const prevMonth = (thismonth) =>{
    return {type:PREV_MONTH, thismonth};
};
export const nextMonth = (thismonth) =>{
    return {type:NEXT_MONTH, thismonth};

};
export const resetDate = () =>{
    return {type:RESET_DATE};
};
//Reducer
export default function reducer(state = initialState, action){
    switch (action.type){
        case "calendar/LOAD_DATE":{
            return state;
        }
        case "calendar/PREV_MONTH":{
            if(state.thismonth === 1){
                return {...state, thismonth: state.thismonth+11, year:state.year-1}
            } return {...state, thismonth:state.thismonth-1}
            
        }
        case "calendar/NEXT_MONTH":{
            if(state.thismonth===12){
                return {...state, thismonth: state.thismonth-11, year:state.year+1};
            } return {...state, thismonth:state.thismonth+1};

        }
        case"calendar/RESET_DATE":{
            return state;
        }

        default:
            return state;
    }
}