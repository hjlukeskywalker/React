//Action
const LOAD_DATE = "calendar/LOAD_DATE"
const PREV_MONTH = "calendar/PREV_MONTH"
const NEXT_MONTH = "calendar/NEXT_MONTH"
const ADD_SCHEDULE = "calendar/ADD_SCHEDULE"

const initialState = {
    
    thismonth: 5,
    year: 2021,
    schedules: [
        {date:"2021-03-25T22:05", desc:"도리 쓰다듬기", completed:false},
        {date:"2021-03-25T19:17", desc:"캘린더 사용하기", completed:false},
        {date:"2021-03-26T02:17", desc:"심야 디버깅", completed:false},

    ],

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
export const addSchedule = (date,desc) =>{
    return {type:ADD_SCHEDULE, date, desc};
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
        case "calendar/ADD_SCHEDULE":{
            const new_schedules = [...state.schedules,{date:action.date, desc:action.desc, completed:false}];
            return {schedules:new_schedules};
        }

        default:
            return state;
    }
}