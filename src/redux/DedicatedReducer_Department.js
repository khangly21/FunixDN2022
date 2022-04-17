//DepartmentsReducer
import {DEPARTMENTS_LOADING,DEPARTMENTS_FETCHING_FAILED,DEPARTMENTS_DISPATCHING} from './Action_Creators/actionTypesList';
export const DepartmentsReducer = (
    //initial state, sẽ không dùng setState để thay đổi, mà dùng spread operator ...
    state = {
      isLoading: false,
      errMess: null,
      departments: []
    },
    action
  ) => {
    switch (action.type) {
      //FETCH
      case DEPARTMENTS_LOADING:
        return { ...state, isLoading: true };
  
      case DEPARTMENTS_DISPATCHING:
        return {
          ...state,
          isLoading: false,
          departments: action.payload
        };
  
      case DEPARTMENTS_FETCHING_FAILED:
        return {
          ...state,
          isLoading: false,
          errMess: action.payload
        }
        
      default:
        return state;  
    }
};

export default DepartmentsReducer;