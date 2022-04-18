import {DEPARTMENTS_LOADING,DEPARTMENTS_FETCHING_FAILED,DEPARTMENTS_DISPATCHING} from "../actionTypesList";
import {baseUrl} from '../../../shared/baseUrl'; //15 nhân viên

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true)); //why có tham số true?

    return fetch(baseUrl + "departments") //https://rjs101xbackend.herokuapp.com/departments  
      .then((response) => response.json())
      .then((dept_object) => {
          dispatch(fetchDEPTsSuccess(dept_object));
          console.log(dept_object); //ok mảng, Main gọi API thành công
        }
      ) //dispatch hành động tới store để cập nhật bản copy của initial state
      .catch((error) => dispatch(fetchDEPTsFailed(error.message)));
};


//sẽ không có reference nếu <fetchDEPTsFailed/> vào fetchDepartments (xem Function_library/advanced_generate_department...)
export const fetchDEPTsFailed = (ErrorMessage) => ({
  type: DEPARTMENTS_FETCHING_FAILED,
  payload: ErrorMessage  //là kiểu dữ liệu gì cũng được
});

export const fetchDEPTsSuccess = (depts) => ({
  type: DEPARTMENTS_DISPATCHING,
  payload: depts
});

export const departmentsLoading = () => ({
  type: DEPARTMENTS_LOADING
});