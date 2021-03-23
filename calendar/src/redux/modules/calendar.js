//Action
const LOAD_DATE = "calendar/LOAD_DATE"
const PREV_MONTH = "calendar/PREV_MONTH"
const NEXT_MONTH = "calendar/NEXT_MONTH"
const RESET_DATE = "calendar/RESET_DATE"

const initialState = {
    today: new Date(),
    month: today.getMonth(),
    year: today.getFullYear(),

        };

// Action Creators
export const loadDate = (date) =>{
    return {type:LOAD_DATE, date};
};
export const prevMonth = (month) =>{
    return {type:PREV_MONTH, month};
};
export const nextMonth = (month) =>{
    return {type:NEXT_MONTH, month};

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
            return {...state, month: state.month +1};
        }
        case "calendar/NEXT_MONTH":{
            return {...state, answer: []};

        }

        default:
            return state;
    }
}