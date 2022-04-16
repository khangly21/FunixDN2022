import {STAFFS_LOADING,STAFFS_FETCHING_FAILED,STAFFS_DISPATCHING} from "../actionTypesList";
import {baseUrl} from '../../../shared/baseUrl'; //15 nhân viên

console.log(baseUrl);//ok, nhưng console.log(staffs_object); chưa ra consolelog cho tới khi hàm fetchStaffs được connectedMain gọi trong componentDidMount()

//Thunk là hàm  trả về 1  hàm lấy dispatch hoặc setState làm tham số, nhưng setState không dùng trong store?
//hiện reference tới Thunk fetchStaffs = 0, làm sao kết nối và khi nào ? Lúc Main gọi hàm componentDidMount chứa fetchStaffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true)); //why có tham số true?

    return fetch(baseUrl + "staffs") //https://rjs101xbackend.herokuapp.com/staffs  cũng như https://rjs101xbackend.herokuapp.com
      .then((response) => response.json())
      .then((staffs_object) => {
          dispatch(fetchStaffsSuccess(staffs_object));
          console.log(staffs_object);
        }
      ) //dispatch hành động tới store để cập nhật bản copy của initial state
      .catch((error) => dispatch(fetchStaffsFailed(error.message)));
};



export const fetchStaffsFailed = (ErrorMessage) => ({
  type: STAFFS_FETCHING_FAILED,
  payload: ErrorMessage  //là kiểu dữ liệu gì cũng được
});

export const fetchStaffsSuccess = (staffs) => ({
  type: STAFFS_DISPATCHING,
  payload: staffs
});

export const staffsLoading = () => ({
  type: STAFFS_LOADING
});

