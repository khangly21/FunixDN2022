class DishDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDish:null
        };
        this.renderham_tao_Chuoi_JSX_comment_by_author=this.renderham_tao_Chuoi_JSX_comment_by_author.bind(this);
    }
    
    renderham_tao_Chuoi_JSX_comment_by_author(COMMENT){
        return(
            //Chuoi_JSX 
            //Warning: Each child in a list should have a unique "key" prop.
            <div key={COMMENT.id}>
                <p>{COMMENT.id}</p>
            </div>

            //nếu child là RSX <p>{COMMENT}</p> thì Uncaught Error: Objects are not valid as a React child (found: object with keys {id, rating, comment, author, date}). If you meant to render a collection of children, use an array instead.
        )
    }

    //hàm render của đối tượng DishDetails
    render(){
        const selectedDish=this.props.mon_duoc_chon; //đối tượng được chọn {}
        console.log(selectedDish);
        console.log(selectedDish.comments); //mảng thuộc tính của đối tượng selectedDish
        console.log("Comment số 1:",selectedDish.comments[0]);
        //Map needs to return a value.
        console.log(typeof selectedDish); //object

        const comments_array_of_selectedDish=selectedDish.comments;
        console.log(comments_array_of_selectedDish); //ok mảng
        //Cách 1
        ///const comments_author_UI=comments_array_of_selectedDish.map(this.renderham_tao_Chuoi_JSX_comment_by_author);
        //thiếu chữ return thì 
        const comments_List=  comments_array_of_selectedDish.map((binhluan)=>{
            return(
                <div key={binhluan.id}>
                    <p>{binhluan.id}/ {binhluan.comment}</p>
                    <p>-- By {binhluan.author} --</p>
                </div>
            )
            
        });

        const danh_sach_li=(
            <ul>
                {comments_List}
            </ul>
        );

        console.log("Danh sách li:",danh_sach_li); //cho phép xem kết quả đầu vào của hàm React.createElement gồm type,className,children 
        //thấy children là array comments_List

        console.log("map cách 2:", comments_List);
        const Chuoi_JSX=(
            <div>
                <h1>Chi tiết bình luận</h1>
                {danh_sach_li}
               
            </div>
        )
        return Chuoi_JSX;
    }

}