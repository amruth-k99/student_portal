import uuid from 'uuid';
import { GET_ITEMS,ADD_ITEMS,DELETE_ITEMS } from "../actions/types";
import { stat } from 'fs';
const initialState = {
    items:[
        {   id:uuid(),name:'InterIIIT',details:'This is to elaborate'  }, 
        {   id:uuid(),name:'Prothymos',details:'This is to elaborate'  },
        {   id:uuid(),name:'CT-1 Results',details:'This is to elaborate'  } 
        
    ]
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state
            }
        default:
            return state;    
    }
}