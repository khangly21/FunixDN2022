//FUNCTIONAL COMPONENT
const  DishDetails = (props) => { //nhận dữ liệu props.dish từ Main là 1 đối tượng dish, có dùng map() để tạo Chuoi_JSX cho từng dish ??
    //trong return luôn có JSX div là cha bao tất cả các RSX khác bên trong, gọi chung là JSX_column_children
    var selectedDish=props.dish; 
    console.log(selectedDish); //ok, một đối tượng món ăn được chọn, hiện ra sau khi chọn món thì được Route tới http://127.0.0.1:5500/#/menu/0

    var Comments_of_dishId_selected=props.comments;  //ok
    console.log(Comments_of_dishId_selected);
    
    var addComment=props.addComment; //nhận từ connectedMainComponent
    console.log(addComment) //ok, dòng này sẽ hiện ra sau khi chọn món thì được Route tới http://127.0.0.1:5500/#/menu/0
    
    var comments_array_of_selectedDish=props.comments; //nếu ghi var comments_array_of_selectedDish=selectedDish.comments; thì Uncaught TypeError: Cannot read properties of undefined (reading 'comments')
    console.log(comments_array_of_selectedDish);
    
    //cấu trúc tương tự MenuComponent.js

    return(
        //<Link to="/menu">Menu</Link> được class cha Main đọc được và Main như 1 bộ hỗn hợp Router-Switch để điều hướng dựa trên Link, component như cổng ra , và return của component là Chuoi_JSX
        //VD  Link to="/menu" nghĩa là được Main điều hướng tới component Menu và trả Chuoi_JSX tương ứng
        //Mối liên quan giữa Breadcrumb và Link: "Breadcrumb" lets us navigate to different pages by providing the "Link" tags for the navigation hierarchy.
        <div className="container">
            <div className="row">
            <Reactstrap.Breadcrumb>
                <Reactstrap.BreadcrumbItem>
                    <ReactRouterDOM.Link to="/menu">Menu</ReactRouterDOM.Link>
                </Reactstrap.BreadcrumbItem>

                <Reactstrap.BreadcrumbItem active>{props.dish.name}</Reactstrap.BreadcrumbItem>
            </Reactstrap.Breadcrumb>
            </div>

            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
    
                <div className="col-12 col-md-5 m-1">
                    <RenderCommentItem 
                        comments={props.comments}
                        addComments={props.addComment}
                        dishId={props.dish.id}
                    />
                    
                </div>   
            </div>
        </div>
        //trong bài giảng thầy Muppala thì <RenderComments comments={props.comments}/> , và The CommentForm component is used by the RenderComments function to display the button for toggling the modal.
        //sau đó thêm 2 attributes vào là addComment được supplied từ ConnectedMainComponent và dishId 
        // tại sao cần tham số dishId ?? vì 'the comments itself does not know the Id of the dish for which the comment item is being rendered, so I will pass the dishId as props'
    )
}


function RenderDish({dish}) { //là cách khác thay vì viết props
    //các children được trả về bởi callback của map() phải có key
    return(
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Reactstrap.Card  body>
                <Reactstrap.CardImg src={dish.image} alt={dish.name}/>
                <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                <Reactstrap.CardText>{dish.description}</Reactstrap.CardText>
            </Reactstrap.Card>
        </div>
        
    );
}


function RenderDish2(props) {
    //các children được trả về bởi callback của map() phải có key
    const dish=props.dish;
    return(
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Reactstrap.Card  body>
                <Reactstrap.CardImg src={dish.image} alt={dish.name}/>
                <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                <Reactstrap.CardText>{dish.description}</Reactstrap.CardText>
            </Reactstrap.Card>
        </div>
        
    );
}

//nhận props từ Parent là DishDetails
//Cách 1 ('destructuring the props' aka 'extracting from the props' so that it will be available for this component): function RenderCommentItem({comments,addComment,dishId}){//truy cập không props, chỉ có comments , nếu ghi props.comments là undefined props}
//Cách 2: function RenderCommentItem(props){ // truy cập bằng cách truyền thống let comments=props.comments;}  
function RenderCommentItem({comments,addComment,dishId}) {//chú ý param thứ 2 là 1 function object khi được gọi phía CommentForm sẽ cần 4 tham số (dishId,rating,author,comment)
    //console.log("Cách lý thuyết, comments nhận từ Parent component DishDetails là: ",props.comments);
    console.log("cách ghi khác: ",comments);
    //What do we do with 2 params: addComment and dishId ?? just paste them directly TO THE COMMENT FORM, vì vậy, 

    /*
    const JSX_li__comment_child=comments.map((comment)=>{
        return(
            <li key={comment.id}>
                <p>{comment.id}/ {comment.comment}</p>
                <p>--on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} --</p>
                <p>-- By {comment.author} --</p>
            </li>
        )
    })
    */

    return(
        //<ul className="list-unstyled"> sẽ không gây thụt đầu dòng các li
        //CtrlClick comments sẽ dẫn tới tham số
        //paste dishId và addComment to form 
        //trong CommentForm, handleSubmit(//bỏ alert("Username: " + this.username.value + " Rating: " + this.rating.value+ " Remember: " + this.remember.checked + "Comment: " + this.comment.value);)
        <div>
            <h4 style={{color:'blue'}}>Comments</h4>
            <ul className="list-unstyled">
                {comments.map((comment)=>{
                   return(
                       <li key={comment.id}>
                           <p>{comment.id}/ {comment.comment}</p>
                           <p>--on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} --</p>
                           <p>-- By {comment.author} --</p>
                       </li>
                   )
               })}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    )
}

