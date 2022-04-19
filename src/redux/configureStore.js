
//hàm cấu hình store, nếu được gọi sẽ trả về một Redux store
//applyMiddleware để áp dụng 2 hàm giữa là logger và thunk
import { createStore, combineReducers,applyMiddleware } from 'redux';

//import các reducers chuyên môn hóa
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';

//import 2 middlewares , now available and apply them to send data_arrays to reducers (Reducer will not store arrays anymore như Lab08_2 trên github, state=DISHES)
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './form'; //thử hover chuột lên InitialFeedback sẽ thấy configureStore đang import Model của Form's dedicated state

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
        

        //hàm dispatch(action) sẽ gửi 1 action object tới store nhằm làm thay đổi state đang lưu trong reducer
        combineReducers(
            {
                dishes:Dishes,  //CtrlClick vế phải sẽ tới nơi cần thiết
                comments:Comments,
                promotions:Promotions,
                leaders:Leaders,
                //feedback tương đương model InitialFeedback (nếu không thì đặt tên cách khác như form object) (gọi là model vì nó là một trong các đối tượng nằm trong state), do đó feedback sẽ nhận tất cả thuộc tính của InitialFeedback, và truy cập bằng feedback.firstname
                //The createForms() function is meant to be used with combineReducers() from redux. Use it when you want a flatter combined reducer structure.
                ...createForms({ 
                    //tạo formReducer() quản lý riêng các model con của model InitialFeedback thuộc global state, tương tự Dishes reducer quản lý state con về DISHES
                    //Muppla: createForms() adds form state to store => thuật ngữ sai
                        /// createForms() ENABLES us to add form state to store, it create a reducer but takes care of the form only
                    feedback: InitialFeedback //Muppala: we supply feedback as InitialFeedback. Theo cách này, ta đã theo truyền thống added the necessary reducer for form and also state/model information into store
                    //Muppala: Another reason why we supply InitialFeedback is that later on we can RESET the form to its initial state after submitting the form
                    //Muppala:
                       /// Problem is Lab06_3_react_redux_form: After fill in the form, we F5 to reload the page thì form không có dữ liệu nào. Tuy nhiên sau khi submit dữ liệu thì form không được reset lại như cũ. WHY? 
                       /// Solution:  when you submit the form, you want the form reseted , for that I need to add a new action, see at MainComponent to add resetFeedbackForm
                })
                //Muppala: Dòng createForms cho thấy lợi ích của react-redux-form supports al these on our behalf, do đó we don't need to write Reducer and Action Creator , .... react-redux-form fills in all details by itself
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