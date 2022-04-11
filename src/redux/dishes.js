//reducer function dealing with dishes state
//ban đầu Dishes sẽ quản lý sự thay đổi của state DISHES
    /// nếu không có Thunk dishesFailed (trong ActionCreator.js) thì reducer này lưu trữ state DISHES
    /// khi có Thunk dishesFailed thì Dishes reducer sẽ không lưu state DISHES , mà nhận action object được dispatch từ fetchDishes 
//reducer takes previous state and action as 2 parameters

const Dishes=(state={
    isLoading:true, //the dishes is empty now, we don't  have any dishes information , so you need to load dishes' information from somewhere before the details of your dishes become available within your state
                    // When you call ADD_DISHES, isLoading:false because the dishes will be loaded in
                    //When you call DISHES_LOADING, isLoading:false to true, because you are beginning to fetch new dishes
                    // TÓM LẠI, whenever you go to the server to fetch the dishes  information from the server, you can set isLoading:true
                    // BUT, when you obtain dishes from server to assign to state.dishes property of this state, isLoading:false 
    errMess:null, //when you receiving DISHES_FAILED action, error message will replace null value (null là không biết giá trị là gì)
                  // if you try to fetch dishes frm a server, and server failed to deliver the dishes to you, so you set errMess equals corresponding to error message you received from the server 
                  // Otherwise correctly obtain, dishes will be loaded with information about the dishes , done when you receive the ADD_DISHES action

    dishes:[] // sẽ được truy cập khi MainComponent gửi props tới HomePage3  

    //Within the "dishes" part of overall state, I am tracking 3 pieces of information
},action)=>{
    //switching among 3 different action types from ActionType.js about dishes, they should be interpreted by Dishes reducer
    //Reducer này is supposed to do something in response to receiving 3 these actions. DO đó responsibility của reducer này là interpret what these actions mean.
    //My shape of state is no longer state=DISHES, because I will change shape of state here
    //I will change the state=DISHES mảng to have 3 different properties inside an object here
    //How do we interpret these ? các subreducers đều có cấu trúc như sau:
    switch(action.type){ 
        //Nguyên tắc chung: Trong Lab08_2_Muppala thì Dishes reducer lưu trữ state không đổi =mảng DISHES do không phụ thuộc action object nào, sau đó mapStateToProps từ Dishes reducer tới MainComponent. Trong Lab09_1 thì Dish reducer lưu trữ intitialState=[] và state phụ thuộc loại action object nào được gửi tới Dishes reducer
        case ADD_DISHES: //when ADD_DISHES type action is called / passed into Dishes reducer
           //I have actually returned the dishes object, what I am supposed to do?
           //just copy the return because the structure is similar among cases: I will take the original state, the action.payload has info payload:dishes
           return {...state,isLoading:false,errMess:null,dishes:action.payload} 


        case DISHES_LOADING://When "Dishes" reducer nhận được action loại "DISHES_LOADING" , what should we do?
           //https://ro.dpbhouse.com/104657-spread-syntax-es6-YYEWFX 
           //https://www.w3schools.com/react/react_es6_spread.asp  (dùng spread operator from ES6, áp dụng lên mảng hoặc đối tượng)
            return {...state,isLoading:true,errMess:null,dishes:[]} //Meaning: whatever state is, I take the same state, then add. I am taking the CURRENT value of the state and something else after , will be applied as modifications to the ...state  
            //Pattern: the state itself will not be mutated (it's unmutable) , instead, I take the state, I create new object from the original state then make some changes to that object and then return that object
            //dishes:[] is an empty object   
            //WHY? Maybe in between , you are refreshing the info from the server. So, at that point, you wanna do it this way
        case DISHES_FAILED:
            //If the dishes failed to load, what do you need to do? The payload with error_message
            //What we are specifying is dishes tried to be loaded but it failed. This is the corresponding error message we receive from the server
            //I will return origional state with spread operator, isLoading:false because I failed to load the dishes
            //errMess is needed to be set up
            //dishes is empty array, because I don't have any dishes here
            return {...state,isLoading:false,errMess:action.payload}
            //When your state is set up like this ==> Do Component UI đã subscribe để nhận các thay đổi từ state trong store, so when your React component retrieves the state, it can then interpret this info accordingly and then display this info in the View , as per what the state contains
        default:
            //if at this moment, we have not implemented any actions, so we have a default case. If we receive action but not do anything, just return default case
            return state; //if state is undefined, assign it DISHES so that default return is DISHES, then modify from this
    }
    //** (22:17) đã hoàn tất thay đổi cho Dishes reducer , nhưng thuộc về phạm vi Redux. Vậy React application cần làm gì cho sự thay đổi này? Bây giờ trở về phạm vi của React (nếu khởi động ứng dụng sẽ nhận error Uncaught TypeError: dishArray.filter is not a function)
        /// first and foremost, khi được đọc từ state thấy isLoading:true thì Component sẽ display a loading spinner , the user is informed that something is loaded from somewhere. To do that, I will create a new component called "LoadingComponent"

}