//StaffsReducer

import {STAFFS_LOADING,STAFFS_FETCHING_FAILED,STAFFS_DISPATCHING} from './Action_Creators/actionTypesList';
export const StaffsReducer = (
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
      case STAFFS_LOADING:
        return { ...state, isLoading: true };
  
      case STAFFS_DISPATCHING:
        return {
          ...state,
          isLoading: false,
          staffs: action.payload
        };
  
      case STAFFS_FETCHING_FAILED:
        return {
          ...state,
          isLoading: false,
          errMess: action.payload
        }
        
      default:
        return state;  
    }
};

export default StaffsReducer;