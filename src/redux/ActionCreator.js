import * as ActionTypes from './ActionType';
import { DISHES } from '../shared/dishes'; //không dùng Dishes reducer nữa
import {baseUrl} from '../shared/baseUrl'; //now we have fetched or include the baseUrl
//nhận tất cả Action Type từ ActionType.js
//a function that creates an action object, and this function is invoked by Component UI
//arrow function nhận 4 parameters và return an action object { ... }
//Then, the action object is dispatched to a Reducer inside a state Store
//in Store, which part of the global state will be affected? you will send various part of a comment to Store
export const addComment=(dishId,rating,author,comment)=>({
    //return a pure Javascript object , inside composed of type and payload
    //Any action object must contain a type
    type:ActionTypes.ADD_COMMENT,
    //payload contains whatever to be carried in the Action object towards the Reducer
    payload:{
        //Payload is a Javascript object
        //what is the payload going to contain?
        //first, contain the dishId which is addComment's parameter
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }

});

//hàm fetchDishes trả về 1 hàm có thể truy cập store's dispatch và store's state 
//do fetchDishes trả ra hàm nên fetchDishes là thunk
// fetchDishes hỗ trợ async action (thay vì chạy nối tiếp nhau thi có thể cùng lúc song song) bằng cách quy định dispatch nào chạy trước, dispatch nào chạy sau
   /// VD thay vì cho action tự do tới Reducer thì ràng buộc bằng setTimeOut
//Nhìn chung, asynchrony in react-redux is often done via thunk, we async dispatch chaining with Redux-Thunk! 
// Async code is unpredictable because completion is not known ahead of time and multiple requests complicate things
    ///the problem at hand lies in the fact Redux has no way of knowing when both async operations finish, while in case of many endpoints , we need many async operations and a way to know when all are done!
    /// a dispatched action này có thể được setTimeOut để chạy sau dispatched action khác

//Minh họa 1
    let url = "http://jsonplaceholder.typicode.com/posts/6";

    let iterator = fetch(url);
    
    iterator
      .then(response => {
          return {
              data: response.json(),  //câu hỏi là data là Promise object hay chỉ là standard object which you can access property
              status: response.status //thường res.status để phát hiện lỗi trong giao tiếp client-server
          }
      })
      //post là đối tượng kết quả từ return bên trên, hover xem kết quả
      .then(post => console.log(post.data.title)); //post.data có prototype là Promise object và không truy cập được giá trị, VD post.data.title
    ; //Why does response.json return a promise? 

//Minh họa 2
    let iterator2 = fetch(url);

    iterator2
      .then(response => response.json()) //CHÚ Ý: json() luôn trả về Promise object , cho dù có keyword "return" hay không
      //Why do I get the value post.title if I return the promise from the then handler? Because that's how promises work. The ability to return promises from the callback and get them adopted is their most relevant feature, it makes them chainable without nesting.
      .then(post => console.log(post.title));//post là đối tượng lấy từ API , là standard object và truy cập được dữ liệu về title: dolorem eum magni eos aperiam quia
    ;
    //https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise
  
    
//fetch dữ liệu dishes + addDishes + dishesLoading + dishesFailed

   /// định nghĩa fetchDishes
   ///Tham khảo: https://reactgo.com/redux-fetch-data-api/ +
  /// https://stackoverflow.com/questions/60556683/redux-thunk-fetch-api-action-and-reducer
  /// https://www.linkedin.com/pulse/redux-thunk-middleware-context-api-action-state-store-mostafa-mohamed
export const fetchDishes=()=>(dispatch)=>{  //hàm tạo hành động hay Thunk này trong Lab09_3 là gửi hành động addDishes(dishes) tới store , còn trong Lab10_1 thì đầu tiên là "we issue the Fetch request to the server " , dữ liệu DISHES nhận từ server sẽ được gói trong "action" object bằng cách DISHES => dispatch(addDishes(DISHES))) và gửi tới Dishes reducer trong redux/dishes.js, nơi mà tùy ActionTypes mà trả về state tương ứng
    //vừa gọi dispatch vừa gọi hàm tạo hành động với mục đích loading chạy cùng lúc
    dispatch(dishesLoading(true)); //lát sẽ biết dishesLoading sẽ làm gì

    return fetch(baseUrl + 'dishes') //hover sẽ thấy fetch trả về Promise object là response
    //các arrow function nằm trong then() đều là các hàm callback
    .then(response => response.json()) //hover sẽ thấy fetch trả về Promise object là dishes
    .then(dishes => dispatch(addDishes(dishes))); //hover sẽ thấy json() trả về Promise object (là 1 object đi vào hàm Promise trong then?) là dishes
    //khi obtain được dishes object, thì dùng hàm dispatch của store để chuyển action object tới store 

}

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes   //Lab10_2 sau này khi fetch thành công dữ liệu về là 1 mảng dishes, sẽ gọi hàm addDishes(mảng)
});

export const dishesLoading = () => ({ // nếu cho 3 hàm này vào trong fetchDishes thì Syntax error: 'import' and 'export' may only appear at the top level (53:0)
    type: ActionTypes.DISHES_LOADING
});
    
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
    //errmess là string nhưng không nói rõ ở đây
});
    
//fetch dữ liệu comments + commentsFailed + addComments
export const fetchComments = () => (dispatch) => {    
    //comments sẽ được load ngay khi HomePage loaded, nên không dùng commentsLoading
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));   //phân biệt hàm tạo hành động addComment() bên trên
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({ //khác component addComment
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



//fetch dữ liệu Promotions + promosLoading + promosFailed + addPromos
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//khi chưa có fetch leader thì Card ở cột 3 Homepage sẽ không hiện ra hình ảnh