//có chịu ảnh hưởng từ Action Type 
import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionType";
//hàm sau sẽ make change với bản copy của phần comment của state
export const Comments=(state=COMMENTS,action)=>{ //state in parameter cannot be modified, chỉ có cách dùng 1 bản sao của nó rồi modify và return
    switch(action.type){ //at this moment, we have not implemented any actions, so we have a default case. If we receive action but not do anything, just return default case
        case ActionTypes.ADD_COMMENT: 
            //if the property type of action matches the case, then the Reducer function is supposed to do something with the state
            var comment=action.payload;  
            //comment.id goes from 0,1,2,3....
            comment.id=state.length; //because the length of array tells me how many comments there are
            comment.date=new Date().toISOString();
            //concat sẽ nối object mới tạo vào array
            //Why concat? https://w3resource.com/javascript/object-property-method/array-concat.php
            //https://www.codegrepper.com/code-examples/javascript/concat+an+object+to+array
            //https://www.codegrepper.com/code-examples/javascript/javascript+concatenate+objects
            //https://www.geeksforgeeks.org/how-to-add-an-object-to-an-array-in-javascript/
               /// nếu dùng push(object) sẽ làm thay đổi mảng , nên phải dùng concat để push new element to array, trong khi tôi không mutating state

            return state.concat(comment) //dùng copy của state và trả về state.concat(comment)
            //However we will not persist (duy trì) the changes. That means when you restart the application, any comments that you filled in the form will be lost completely. WHY? what we are doing here is we only add new comments to memory (RAM)
            //This problem will be come back in later exercises
            //At this moment, this is all
            
        default:
            return state; //if state is undefined, assign it DISHES so that default return is DISHES, then modify from this
    }
}
//Done,only the commnent part of the Root Reducer that not change the previous state but can make change somewhere, but add the new comment into the comment array
//Having done this, how can we make use of this? Lúc này đã có các thành phần trong dòng chảy 1 chiều kiến trúc Redux: store (4 reducers) , action, action creator, Component's UI 
    /// như vậy đã cấu hình xong Redux, trong khi các chức năng của trang web vẫn không đổi (vì đơn giản là tách Root Reducer ra và gộp lại thành combineReducers)
    /// Lab06_3 không có kiến trúc Redux, và MainComponent phải lưu local state trong hàm constructor, gây tốn bộ nhớ nếu có nhiều đối tượng MainComponent
    /// Lab07_1 kiến trúc Redux chỉ bao gồm Store và Reducer. Vì state được lưu trong Store nên các đối tượng MainComponent không phải lưu local state
    /// Lab08_1 kiến trúc Redux bao gồm Store và Root Reducer bao gồm 4 reducer con , chức năng trang web vẫn y chang Lab07_1
    /// Lab08_2 kiến trúc Redux bao gồm Store, Root Reducer bao gồm 4 reducer con , Action và CreateAction. Chức năng trang web có thêm: Thêm comment
