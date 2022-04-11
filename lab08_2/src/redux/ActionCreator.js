import * as ActionTypes from './ActionType';
//nhận tất cả Action Type từ ActionType.js
//a function that creates an action object, and this function is invoked by Component UI
//arrow function nhận 4 parameters và return an action object { ... }
//Then, the action object is dispatched to a Reducer inside a state Store
//in Store, which part of the global state will be affected? you will send various part of a comment to Store
export const addComment=(dishId,rating,author,comment)=>({
    //return a pure Javascript object , inside composed of type and payload
    //Any action object must contain a type
    type:ActionTypes.ADD_COMMENT,
    //payload contains whatever to be carried in the Action object towards the Reducer
    payload:{
        //Payload is a Javascript object
        //what is the payload going to contain?
        //first, contain the dishId which is addComment's parameter
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }

});