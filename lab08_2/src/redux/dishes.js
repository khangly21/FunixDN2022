//reducer function dealing with dishes state
//reducer takes previous state and action as 2 parameters. TRONG ĐÓ, action là OPTIONAL
//https://www.robinwieruch.de/javascript-reducer/
//https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

//muốn có reference phải có export
import { DISHES } from '../shared/dishes';
export const Dishes=(state=DISHES,action)=>{
    switch(action.type){ //at this moment, we have not implemented any actions, so we have a default case. If we receive action but not do anything, just return default case
        default:
            return state; //if state is undefined, assign it DISHES so that default return is DISHES, then modify from this
    }
}