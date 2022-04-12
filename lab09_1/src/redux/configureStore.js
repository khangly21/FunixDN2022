
//hàm cấu hình store, nếu được gọi sẽ trả về một Redux store
//applyMiddleware để áp dụng 2 hàm giữa là logger và thunk
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
//import 2 middlewares , now available and apply them to send data_arrays to reducers (Reducer will not store arrays anymore như Lab08_2 trên github, state=DISHES)
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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
        ),
        //Tham số thứ hai là 1 Store enhancer (mở rộng/tăng cường) được tạo bởi applyMiddeware
        //trước đó tất cả connected Components đã qua connect() đều được Provider giúp tất cả có thể truy cập Store available for all components
        //most common use case for middleware is to support asynchronous actions
            ///cụ thể, middleware adds extra functionality to the Redux dispatch function
            /// trong khi đó, Store enhancers add extra functionality to the Redux store. 
        //https://redux.js.org/api/applymiddleware/  . https://askinglot.com/what-is-enhancer-redux
        // applyMiddleware( middleware chain) , Middleware is the suggested way to extend Redux with custom functionality
        applyMiddleware(thunk, logger) //chức năng tương tự như Provider
        //applyMiddleware is saying "thunk, logger" so that they are supplied into store as Store enhancer. Do Store đã available cho ứng dụng, nên think và logger bên trong cũng available cho ứng dụng

    );
    return store;
}

//The entire state of an application lists at a place called Store
//It acts as a brain and manages the status of the application. It also has a dispatch(action) function.