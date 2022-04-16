//StaffsSalaryReducer
import {STAFFSwage_LOADING,STAFFSwage_FETCHING_FAILED,STAFFSwage_DISPATCHING} from './Action_Creators/actionTypesList';
export const StaffsSalaryReducer = (
    //initial state, sẽ không dùng setState để thay đổi, mà dùng spread operator ...
    state = {
      isLoading: false,
      errMess: null,
      staffs: []
    },
    action
  ) => {
    switch (action.type) {
      //FETCH
      case STAFFSwage_LOADING:
        return { ...state, isLoading: true };
  
      case STAFFSwage_DISPATCHING:
        return {
          ...state,
          isLoading: false,
          staffs: action.payload
        };
  
      case STAFFSwage_FETCHING_FAILED:
        return {
          ...state,
          isLoading: false,
          errMess: action.payload
        }
        
      default:
        return state;  
    }
};

export default StaffsSalaryReducer;