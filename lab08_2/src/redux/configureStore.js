
//hàm cấu hình store, nếu được gọi sẽ trả về một Redux store
import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
//How to combine 4 small reducers ? sử dụng Redux.combineReducers
   ///inside combineReducer, say exactly how we combine 4 reducers
   ///to compose then overall global state, we have to  map these reducers into each 1 of 4 properties 

//Problem: ConfigureStore is declared but its value is never read  => Solution: export
export const ConfigureStore = () => {
    //you will need to create a store here
    const store =createStore(
        //this is how the combineReducers will take the Reducer mapping object, and then will map the smaller,simpler Reducer functions into various properties in the whole ground
        //hàm Redux.combineReducers nhận đối tượng gọi là ReducerMapObject
        //hàm Redux.combineReducers turns an object whose values are different reducer functions, into a single reducer function. It will call every child functions and gather
        
        combineReducers(
            {
                dishes:Dishes,  //CtrlClick vế phải sẽ tới nơi cần thiết
                comments:Comments,
                promotions:Promotions,
                leaders:Leaders
            }
        )
    );
    return store;
}

//The entire state of an application lists at a place called Store
//It acts as a brain and manages the status of the application. It also has a dispatch(action) function.