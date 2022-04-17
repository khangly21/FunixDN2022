import {STAFFSwage_LOADING,STAFFSwage_FETCHING_FAILED,STAFFSwage_DISPATCHING} from "../actionTypesList";
import {baseUrl} from '../../../shared/baseUrl'; //15 nhân viên

export const fetchStaffsWage = () => (dispatch) => {
    dispatch(staffsWageLoading(true)); //why có tham số true?

    return fetch(baseUrl + "staffsSalary") //https://rjs101xbackend.herokuapp.com/staffs  cũng như https://rjs101xbackend.herokuapp.com
      .then((response) => response.json())
      .then((staffsWage_object) => {
          dispatch(fetchStaffsWageSuccess(staffsWage_object));
          console.log(staffsWage_object);//ok
        }
      ) //dispatch hành động tới store để cập nhật bản copy của initial state
      .catch((error) => dispatch(fetchStaffsWageFailed(error.message)));
};



export const fetchStaffsWageFailed = (ErrorMessage) => ({
  type: STAFFSwage_FETCHING_FAILED,
  payload: ErrorMessage  //là kiểu dữ liệu gì cũng được
});

export const fetchStaffsWageSuccess = (staffs) => ({
  type: STAFFSwage_DISPATCHING,
  payload: staffs
});

export const staffsWageLoading = () => ({
  type: STAFFSwage_LOADING
});