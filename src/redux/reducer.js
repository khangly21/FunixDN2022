// Comments from https://www.scriptverse.academy/tutorials/reactjs-redux-example.html


//The first thing we do is setup the initial state. Here is where your application state is stored as a single object.
const initialState = { //là đầu vào của hàm Reducer, là dữ liệu của ứng dụng
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

console.log(initialState.dishes)//ok

//Just below the INITIAL_STATE is the reducer
// It is named that way because it is akin to the Array reduce() method, which takes in an array and returns a single condensed value.
//Reducer nhận tham số thứ nhất là current state
//nhận tham số thứ hai là action object để create the next state 
const Reducer = (state = initialState, action) => { //if state is not initialized, default is initialState created
    
    //which actually is a function that takes in the current state of the application and the associated action (we will come to that in the next section) as parameters and returns a new state
    //The body of a reducer usually consists of a switch statement for all cases of the action types you design.
    
    //I don't modify the state, I just return it
    return state; //hover state sẽ thấy lấy giá trị mặc định là initialState
};

//https://www.w3schools.blog/redux-reactjs
   ///Reducer is a pure function which is used to return a new "state" from the "initial state". 
   ///It reads the payloads from the "actions". 
   ///The reducer then updates the store via the state accordingly.


   ///An "action" is a pure object which is sent or dispatched from the view.
   ///It is created to store information about the user’s event such as info about the type of action, the time of occurrence, the location of occurrence, info about its coordinates, and info about the state it aims to change.
