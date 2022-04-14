//có chịu ảnh hưởng từ Action Type 
//import { COMMENTS } from "../shared/comments";   <== Không cần thiết nữa, vì dữ liệu sẽ tải từ the Air
import * as ActionTypes from "./ActionType";
//hàm sau sẽ make change với bản copy của phần comment của state
export const Comments=(state= { 
        errMess: null, 
        comments:[]
      },action)=>{ //state in parameter cannot be modified, chỉ có cách dùng 1 bản sao của nó rồi modify và return
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
          return {...state, errMess: null, comments: action.payload};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return { ...state, comments: state.comments.concat(comment)};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload,commnents:[]};
    
        default:
            return state;
    }
};

//Done,only the commnent part of the Root Reducer that not change the previous state but can make change somewhere, but add the new comment into the comment array
//Having done this, how can we make use of this? Lúc này đã có các thành phần trong dòng chảy 1 chiều kiến trúc Redux: store (4 reducers) , action, action creator, Component's UI 
    /// như vậy đã cấu hình xong Redux, trong khi các chức năng của trang web vẫn không đổi (vì đơn giản là tách Root Reducer ra và gộp lại thành combineReducers)
    /// Lab06_3 không có kiến trúc Redux, và MainComponent phải lưu local state trong hàm constructor, gây tốn bộ nhớ nếu có nhiều đối tượng MainComponent
    /// Lab07_1 kiến trúc Redux chỉ bao gồm Store và Reducer. Vì state được lưu trong Store nên các đối tượng MainComponent không phải lưu local state
    /// Lab08_1 kiến trúc Redux bao gồm Store và Root Reducer bao gồm 4 reducer con , chức năng trang web vẫn y chang Lab07_1
    /// Lab08_2 kiến trúc Redux bao gồm Store, Root Reducer bao gồm 4 reducer con , Action và CreateAction. Chức năng trang web có thêm: Thêm comment
