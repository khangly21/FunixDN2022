import { createStore, combineReducers, applyMiddleware } from "redux";
//các reducers phụ trách các state trong global state
import StaffsReducer from "./DedicatedReducer_Staff";
import DepartmentsReducer from "./DedicatedReducer_Department";
import StaffsSalaryReducer from "./DedicatedReducer_staffWage"; //sai path là cannot resolved, export default thì không có { }
//middlewares: thunk và logger
import thunk from "redux-thunk";
import logger from "redux-logger"; 

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({ //CÁC reducers thành phần như staffs_Reducer,departments_Reducer,staffsSalary_Reducer sẽ map state as props cho Main
        staffs_Reducer: StaffsReducer,
        departments_Reducer: DepartmentsReducer,
        staffsSalary_Reducer: StaffsSalaryReducer
      }),
      applyMiddleware(thunk, logger)
    );
  
    return store;
};

export default ConfigureStore; //khi import vào App.js thì không có { }