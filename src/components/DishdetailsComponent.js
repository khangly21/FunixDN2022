//FUNCTIONAL COMPONENT
const  DishDetails = (props) => { //nhận dữ liệu props.dish từ Main là 1 đối tượng dish, có dùng map() để tạo Chuoi_JSX cho từng dish ??
    //trong return luôn có JSX div là cha bao tất cả các RSX khác bên trong, gọi chung là JSX_column_children
    const selectedDish=props.dish;
    const comments_array_of_selectedDish=selectedDish.comments;
    //cấu trúc tương tự MenuComponent.js

    return(
        <div className="row">
            <RenderDish dish={selectedDish}/>
            <RenderCommentItem comments={comments_array_of_selectedDish}/>
        </div>
    )
    
}

function RenderDish({dish}) {
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

function RenderCommentItem({comments}) {
    const JSX_li__comment_child=comments.map((comment)=>{
        return(
            <div key={comment.id}>
                <p>{comment.id}/ {comment.comment}</p>
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

