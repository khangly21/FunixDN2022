//FUNCTIONAL COMPONENT
const  DishDetails = (props) => { //nhận dữ liệu props.dish từ Main là 1 đối tượng dish, có dùng map() để tạo Chuoi_JSX cho từng dish ??
    //trong return luôn có JSX div là cha bao tất cả các RSX khác bên trong, gọi chung là JSX_column_children
    var selectedDish=props.dish;
    var comments_array_of_selectedDish=props.comments; //nếu ghi var comments_array_of_selectedDish=selectedDish.comments; thì Uncaught TypeError: Cannot read properties of undefined (reading 'comments')
    console.log(selectedDish);
    console.log(comments_array_of_selectedDish);
    //cấu trúc tương tự MenuComponent.js

    return(
        //xem chuẩn về Breadscrumb ở đây: https://www.geeksforgeeks.org/reactjs-reactstrap-breadcrumb-component/
        //chú ý : 'Link to ' hỗ trợ Single Page Application, còn  a href không hỗ trợ
            /// do đó muốn dùng a cũng được nhưng phải có # trong href ý nói đi tới cùng một trang, chứ không load trang mới
            /// So sánh 'Link to' và a href="#"   xem a có làm trang load toàn bộ không

        //nội dung Dish details cần trình bày đẹp hơn: chia 2 cột và có đường thẳng đứng ngăn 2 cột : https://www.youtube.com/watch?v=mUhMR4DPZ8k
 
        <div className="container">
            <div className="row" style={{marginLeft:'5vw'}}> 
                <Reactstrap.Breadcrumb>
                    <Reactstrap.BreadcrumbItem>
                        <ReactRouterDOM.Link to="/">Welcome page</ReactRouterDOM.Link>
                    </Reactstrap.BreadcrumbItem>
    
                    <Reactstrap.BreadcrumbItem>
                        <a href="#/home">Home page</a>
                    </Reactstrap.BreadcrumbItem>
                    
                    <Reactstrap.BreadcrumbItem>
                        <ReactRouterDOM.Link to="/menu">Menu</ReactRouterDOM.Link>
                    </Reactstrap.BreadcrumbItem>
    
                    <Reactstrap.BreadcrumbItem active><b style={{color:'gray'}}>{props.dish.name}</b></Reactstrap.BreadcrumbItem>
                </Reactstrap.Breadcrumb>
            </div>

            <div className="row">
                <div className="col-6">
                    <RenderDish dish={props.dish}/>
                </div>
    
                <div className="col-6">
                    <RenderCommentItem comments={props.comments}/>
                </div>   
            </div>
        </div>
        
    )
}


function RenderDish({dish}) { //là cách khác thay vì viết props
    //các children được trả về bởi callback của map() phải có key
    return(
        <div key={dish.id} >
            <Reactstrap.Card  body>
                <Reactstrap.CardImg src={dish.image} alt={dish.name}/>
                <Reactstrap.CardTitle><b style={{color:'orangered'}}>{dish.name}</b></Reactstrap.CardTitle>
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


function RenderCommentItem({comments}) {
    const JSX_li__comment_child=comments.map((comment)=>{
        return(
            <div key={comment.id}>
                <b style={{color:"blue"}}>{comment.id}/ {comment.comment}</b>
                <p>--on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} --</p>
                <p>-- By {comment.author} --</p>
            </div>
        )
    })

    return(
        <ul>
            {JSX_li__comment_child}
        </ul>
    )
}

