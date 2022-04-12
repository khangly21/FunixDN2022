import * as ActionTypes from './ActionType';
import { DISHES } from '../shared/dishes';
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

//hàm fetchDishes trả về 1 hàm có thể truy cập store's dispatch và store's state 
//do fetchDishes trả ra hàm nên fetchDishes là thunk
// fetchDishes hỗ trợ async action (thay vì chạy nối tiếp nhau thi có thể cùng lúc song song) bằng cách quy định dispatch nào chạy trước, dispatch nào chạy sau
   /// VD thay vì cho action tự do tới Reducer thì ràng buộc bằng setTimeOut
//Nhìn chung, asynchrony in react-redux is often done via thunk, we async dispatch chaining with Redux-Thunk! 
// Async code is unpredictable because completion is not known ahead of time and multiple requests complicate things
    ///the problem at hand lies in the fact Redux has no way of knowing when both async operations finish, while in case of many endpoints , we need many async operations and a way to know when all are done!
    /// a dispatched action này có thể được setTimeOut để chạy sau dispatched action khác


export const fetchDishes=()=>(dispatch)=>{
    //vừa gọi dispatch vừa gọi hàm tạo hành động với mục đích loading chạy cùng lúc
    dispatch(dishesLoading(true)); //lát sẽ biết dishesLoading sẽ làm gì

    setTimeout(()=>{
        //delay this dispatched action for 2 sec
        dispatch(addDishes(DISHES)); //to push dishes into state in out store
    },2000)

    //Tóm lại, the thunk fetchDishes trả về 1 hàm which calls dispatches
    //TẠI SAO THUNK LẠI XẾP NGANG HÀNG CÁC HÀM TẠO HÀNH ĐỘNG trong ActionCreator.js ? Vì Thunk cũng là hàm tạo hành động và sẽ được chạy chung với dispatch trong MainComponent.js
    // trong MainComponent.js, hàm tạo hành động cũng là thunk fetchDishes sẽ phối hợp với LoadingComponent để cho người dùng biết khi nào mình sẽ hoàn thành, bằng cách dùng loading spinner
    //nếu xem ActionCreator là 1 đối tượng, thì khi import các hàm trong đối tượng này vào MainComponent
       /// sẽ dùng kiểu quen thuộc là Object destructuring với việc gán hàm vào biến mới cùng tên
          //// import { addComment , fetchDishes as otherName } from '../redux/ActionCreator';

    //cả 3 actioncreators sau sẽ trả về 3 action objects
    //cả 3 hành động đều ảnh hưởng tới state trong Dishes reducer, do đó tới dishes.js ngay bây giờ

}

export const dishesLoading = () => ({ // nếu cho 3 hàm này vào trong fetchDishes thì Syntax error: 'import' and 'export' may only appear at the top level (53:0)
    type: ActionTypes.DISHES_LOADING
});
    
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
    //errmess là string nhưng không nói rõ ở đây
});
    
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
    });