//reducer function dealing with dishes state
//reducer takes previous state and action as 2 parameters. TRONG ĐÓ, action là OPTIONAL
//https://www.robinwieruch.de/javascript-reducer/
//https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

//muốn có reference phải có export
import { DISHES } from '../shared/dishes'; //không cẩn
import * as ActionTypes from './ActionType';
//Dishes reducer không còn lưu state=DISHES nữa, mà state sẽ tùy hành động
export const Dishes=(state={ isLoading: true,
        errMess: null,
        dishes:[]  
    }, //state ban đầu, sẽ bị thay đổi bằng setState như https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/ (tuy nhiên điều này trái với chân lý của Redux)  VD https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/
    //nhận đối tượng hành động được dispatch tới server
    action)=>{
        console.log(action);
        switch (action.type) {
            //giữ nguyên state trước và bổ sung cho nó
            ////Meaning: whatever state is, I take the same state (a copy of state), then add. I am taking the CURRENT value of the state and something else after , will be applied as modifications to the ...state  
            case ActionTypes.ADD_DISHES: //?????? Là load thành công dished và được dispatched tới store
                return {...state, isLoading: false, errMess: null, dishes: action.payload};
    
            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMess: null, dishes: []}
    
            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};
    
            default:
                return state; //ban đầu
        }
}

//ASK MENTOR:
   /// reducer dishes hiện không được gọi và cũng không import ActionCreator, làm sao nhận được action từ Redux-Thunk là fetchDishes ??
       //// https://reactgo.com/redux-fetch-data-api/