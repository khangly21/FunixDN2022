//nhận tất cả Action Type từ ActionType.js

//a function that creates an action object, and this function is invoked by Component UI
//arrow function nhận 4 parameters và return an action object { ... }
//Then, the action object is dispatched to a Reducer inside a state Store
//in Store, which part of the global state will be affected? you will send various part of a comment to Store
const addComment=(dishId,rating,author,comment)=>({
    //return a pure Javascript object , inside composed of type and payload
    //Any action object must contain a type
    type:ADD_COMMENT,
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

//this fetchDishes fetches the dishes from wherever you are supposed to
//I will create this function as a Thunk, which is a function that return a function, instead of an action object
// the returned function would be "(dispatch)=>" gets access to dispatch , and also get state if you require, but I let it access dispatch only
//You can see fetchDishes is a Thunk here, because it is a function and return a function

//(Component UI phản ứng với Redux Dishes reducer. Aka, React app nhận dữ liệu từ Redux architecture) fetchDishes is a Thunk, sẽ được gọi khi có sự cố gắng fetch dữ liệu với isLoading:true thì hiển thị loading spinner
   /// sau một thời gian thì dishes are  fetched and then added to React application
const fetchDishes=()=>(dispatch)=>{ //where is "return"??
    //dispatch(action) to send action object to store hay dispatch(ham_tao_hanh_dong()) 
    dispatch(dishesLoading(true));

    //introduce a short delay with setTimeout which supplies a function which delays a time frame
    //Trong bài sau, tôi sẽ thay thế setTimeout với asynchronous call to a server
    setTimeout(()=>{
        //After 2 seconds, action object sẽ được dispatched tới state của store
        dispatch(addDishes(DISHES)); //DISHES là mảng được lấy từ share/dishes
    },2000)
}//you can see this function is doing 2 dispatches: first dispatch and after 2 second delay, the second dispatch
//The second dispatch will push the dish to state of our store

const dishesLoading=()=>({
    //dĩ nhiên hàm được gọi phải trả về 1 action object bên trong dispatch()
    //return no data associated with ActionType
    type:DISHES_LOADING
});

//Nhận được Action object, dishes reducer phải có khả năng interpret what an action is going to do
//Nhớ lại trước khi viết fetchDishes Thunk thì bạn đã xóa đầu vào là mảng DISHES vì DISHES là do ActionCreator cung cấp. You can guess that Dishes reducer is informed that the dishes is gonna to be loaded so you need to wait for the dish to be loaded

//hàm dishesFailed cũng sẽ được dùng tại Dishes reducer
const dishesFailed=(errmess)=>({
    //return an action object
    type:DISHES_FAILED,
    payload:errmess //this message should be a string , but the implementation here does not tell you that
    //Therefore, whatever we pass (param) to hàm dishesFailed, that will be delivered as a payload to dishes Reducer, so we will make use of it there
})

//hàm tạo action trả về đối tượng action gồm type và payload để gửi tới Dishes reducer
const addDishes=(dishes)=>({
    type:ADD_DISHES,
    payload:dishes
})
//bây giờ chiều đơn dòng sẽ tới dishes.js là reducer

