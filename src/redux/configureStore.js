
//hàm cấu hình store, nếu được gọi sẽ trả về một Redux store
const ConfigureStore = () => {
    //you will need to create a store here
    const store =Redux.createStore(
        Reducer, // reducer . Thử Ctrl+Click vào chữ này sẽ tới file reducer.js
        initialState, // our initialState
    );

    return store;
}

//The entire state of an application lists at a place called Store
//It acts as a brain and manages the status of the application. It also has a dispatch(action) function.