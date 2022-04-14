//reducer function dealing with dishes state
//reducer takes previous state and action as 2 parameters. TRONG ĐÓ, action là OPTIONAL
//https://www.robinwieruch.de/javascript-reducer/
//https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

//muốn có reference phải có export
import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionType';
//Dishes reducer không còn lưu state=DISHES nữa, mà state sẽ tùy hành động
export const Dishes=(state={ isLoading: true,
    errMess: null,
    dishes:[]},action)=>{
        switch (action.type) {
            //giữ nguyên state trước và bổ sung cho nó
            ////Meaning: whatever state is, I take the same state (a copy of state), then add. I am taking the CURRENT value of the state and something else after , will be applied as modifications to the ...state  
            case ActionTypes.ADD_DISHES:
                return {...state, isLoading: false, errMess: null, dishes: action.payload};
    
            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMess: null, dishes: []}
    
            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};
    
            default:
                return state;
        }
}