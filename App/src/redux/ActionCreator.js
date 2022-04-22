import * as ActionTypes from './ActionType';
import { DISHES } from '../shared/dishes'; //không dùng Dishes reducer nữa
import {baseUrl} from '../shared/baseUrl'; //now we have fetched or include the baseUrl
//nhận tất cả Action Type từ ActionType.js
//a function that creates an action object, and this function is invoked by Component UI
//arrow function nhận 4 parameters và return an action object { ... }
//Then, the action object is dispatched to a Reducer inside a state Store
//in Store, which part of the global state will be affected? you will send various part of a comment to Store
export const addComment=(comment)=>(
  //BEFORE: onSubmit CommentForm, nhận 4 thông tin người dùng rồi được dispatch tới Redux bởi Main component
  //AFTER: không nhận comment gồm 4 thông tin của người dùng nữa (do postComment đã làm), thực tế là nhận OK_response từ server trả về, rồi gói thành 1 đối tượng để postComment dispatch nó đi tới Redux store
  {  //là hàm tạo đối tượng dựa trên comment của người dùng, rồi chuyển tới Redux store thông qua hàm dispatch() của store
    type:ActionTypes.ADD_COMMENT,
    //payload contains whatever to be carried in the Action object towards the Reducer to add comment
    //payload:comment //là bài giảng Muppala, tương ứng trong Reducer comments.js sẽ truy cập bằng var comment = action.payload  //nếu ghi payload:{comment:comment}  thì sau khi submit comment không hiện ngay lập tức, phải F5 mới ra
    payload:{comment:comment} //thì bên tương ứng trong Reducer comments.js sẽ truy cập bằng var comment = action.payload.comment;
  }
);


//TRONG LAB10_3 sẽ post comment mới vào json-server để 
//postComment là 1 function of function sẽ phối hợp với addComment để gửi đối tượng comment mới từ UI component tới json-server để push vào mảng comments trong db.json
//postComment vừa là dispatcher (khi submit form addComment vào Store) vừa là nơi push đối tượng lên json-server
export const postComment=(dishId,rating,author,comment)=>(dispatch)=>{ //Thunk này trả về 1 hàm which nhận dispatch làm tham số
    //this will perform on the server 
    //and the function addComment now simpler because it just receice the comment than the old way we have done
    //What do we do when postComment nhận 4 tham số? Tạo 1 Javascript object, sau đó map 4 tham số nhận được vào trong Javascript object đó 
    
    const newComment={
      dishId:dishId, //Chú ý: không phải comment id của newComment vì cái này được server tự động tạo khi push mới vào mảng
      rating:rating,
      author:author,
      comment:comment
    }
    //add a new property to above Javascript object
    newComment.date = new Date().toISOString();

    //push the comment to the server. DO fetch operation here, but in this case, use POST operation, so you need to supply value for it
       /// recall that POST operation requires you send data into body of message
       /// In addition to the body, set up headers application/json
    return fetch(baseUrl+'comments', 
       // now we define the structure of request message: body, headers, method,
        {
          method: "POST",//POST sẽ vừa gửi vừa nhận dữ liệu //những bài trước không nói gì thì default method to GET OPERATION
          body: JSON.stringify(newComment), //json hóa javascript object, rồi cho vào trong body trong POST message we send out
          headers: {
            "Content-Type": "application/json" //recall that the POST body contains data in JSON format
          },
          credentials: "same-origin" //we will deal with it in NodeJS course: same-origin, cross-origin
        }) //thiếu ) chỗ này thì TypeError: {(intermediate value)(intermediate value)(intermediate value)(intermediate value)}.then is not a function
        //When the fetch operation is carried out, obviously you will receive a response from server. So how you handle response 
        // very similar way we did earlier for GET operation,nên copy paste vào đây
        .then(response => {
             if (response.ok) {
               return response;
             } else {//không nhận được trả lời từ server
               var error = new Error('Error ' + response.status + ': ' + response.statusText);
               error.response = response;
               throw error;
             } 
        },
        //nhận được trả lời nhưng là báo lỗi
        error => {
            var errness=new Error(error.message);
            throw errness;
        })
       .then(response => response.json())

       //dữ liệu updated response.json() nhận được từ server đã bao gồm newComment và id được gán cho nó
       .then(response => dispatch(addComment(response))) //sử dụng 
       .catch(error =>  { 
            console.log('post comments', error.message); 
            alert('Your comment could not be posted\nError: '+error.message); 
       })
    
    //That is how you will POST comment to server: Vừa SEND vừa RECEIVE
        /// create POST message and SEND to server 
        /// RECEIVE the response that should be the updated comment array that will be pushed to Redux store by doing dispatch
        /// if receive error res, just print to log and pop up alert
    //How to make use of postComment?
        /// update reducer comment.js tại ADD_COMMENT, nhưng trước đó, the comment posted bu user cần chỉnh sửa thông tin tại server side trước khi trả về rồi lưu vào Redux store
        ///Tiếp theo, chỉnh sửa giúp cho MainComponent nhận quyền được gọi postComment nhằm kích hoạt việc chuyển đối tượng có chứa commnent mới vào Redux store
};




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
    //when we encounter errors, first thing is how to handling errors
    //note that server's response could be data response or error response 
    //Whatever the case, we need to handle problems 
    .then( //SITUATION #1: YOU ACTUALLY RECEIVE A RESPONSE FROM SERVER, AND THIS MAY BE NOT_OK RESPONSE
        response => {
        //what do you do if you receive the response correctly? 
        if (response.ok) {
          return response;  //we will just return the response. After that, the received response will be available for the next "then"
        } else { //Except 200 code, you encounter errors, what do you do
        //generate an error object in Javascript, inside it we set up a message to be delivered "Error detected"
        //extract a status containing response status code from response and a statusText
        // 300,400,500 are response error codes we will take as status, 200 is ok which we already handled in if
        //statusText contains any error message that server sends back
          var error = new Error('Error detected' + response.status + ': ' + response.statusText); //join together in error message
          error.response = response; //gán cho error
          //throw error in a promise handler
          throw error; //(1)
        }
      },
      //some situation the server does not even respond
      //so promise handling should be implemented
      //error handler 

      //SITUATION #2: YOU DON'T HERE BACK ANYTHING FROM THE SERVER (thử Ctr+C to shut down json-server then React client trying to talk to server , it will fail)
      //so you must handle error appropriately
      error => {
            var errmess = new Error(error.message); //khi error phát sinh trong giao tiếp client-server, sẽ có thông tin trong error.message
            throw errmess; //(2) //THÔNG thường là báo ngay trên trang web: Failed to fetch
      })
    //các arrow function nằm trong then() đều là các hàm callback (to handle response parameter coming)

    //If you know how promises work, when the above returns something, that will be delivered in as an incoming parameter to the next "then" với các promises handler ở đây
    .then(response => response.json()) //hover sẽ thấy fetch trả về Promise object là dishes

    //Dữ liệu dishes lấy từ server sẽ được add thêm nữa
    .then(dishes => dispatch(addDishes(dishes))) //hover sẽ thấy json() trả về Promise object (là 1 object đi vào hàm Promise trong then?) là dishes
    //khi obtain được dishes object, thì dùng hàm dispatch của store để chuyển action object tới store 
    //implement catch here to catch the error then handle the error appropriately
    .catch(error => dispatch(dishesFailed(error.message))) //we dispatched a dishesFailed action with the error message included. This will ensure your state will be updated with error message
    //throw then catch error
    //In handling of promises, an error will cause a rejected promise . Therefore we will catch using the .catch of promises . Inside the catch you will receive the error
    //the catch would be caused because you throw an error at (1) or at (2). Either case we will handle error appropriately 

    
    
    
    
    //That's all, this is how we handle response we receive from server
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
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))  //phân biệt hàm tạo hành động addComment() bên trên
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
}); //gói error message với thông tin liên quan thành một đối tượng để chuyển đi

//được sử dụng bởi componentDidMounted --> fetchComments() --> nhận response từ server rồi addComments
export const addComments = (comments) => ({ //khác hàm tạo hành động  addComment  đã định nghĩa ở trên
    type: ActionTypes.ADD_COMMENTS, //chú ý: hàm addComment phía trên cũng dùng action type ADD_COMMENT
    payload: comments
}); //thật ra là gói dữ liệu mảng bình luận nhận từ server cùng các thông tin liên quan, rồi được dispatch tới Redux store



//fetch dữ liệu Promotions + promosLoading + promosFailed + addPromos
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
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