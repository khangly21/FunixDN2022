class DishDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    //hàm render của đối tượng DishDetails
    render(){
        //nhận đối tượng dish từ Main gửi tới
        const selectedDish=this.props.dish; //có thể null hay 1 đối tượng 
        
        console.log(selectedDish);//nếu lưu các đối tượng chứa các thuộc tính JSX như type, key, props thì dòng sau không đọc được comments là gì
        console.log(selectedDish.comments); //mảng thuộc tính của đối tượng selectedDish
        console.log("Comment số 1:",selectedDish.comments[0]);
        //Map needs to return a value.
        console.log(typeof selectedDish); //object
        
        const comments_array_of_selectedDish=selectedDish.comments;
        //console.log(comments_array_of_selectedDish); //ok mảng
        //Cách 1
        ///const comments_author_UI=comments_array_of_selectedDish.map(this.renderham_tao_Chuoi_JSX_comment_by_author);
        //thiếu chữ return thì 
        
        const comments_List=  comments_array_of_selectedDish.map((binhluan)=>{
            //thông thường paste vào {binhluan.date}
            return(
                <div key={binhluan.id}>
                    <p>{binhluan.id}/ {binhluan.comment}</p>
                    <p>--on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(binhluan.date)))} --</p>
                    <p>-- By {binhluan.author} --</p>
                </div>
            )
            
        });

        const danh_sach_li=(
            <ul>
                {comments_List}
            </ul>
        );

        //console.log("Danh sách li:",danh_sach_li); //cho phép xem kết quả đầu vào của hàm React.createElement gồm type,className,children 
        //thấy children là array comments_List

        //console.log("map cách 2:", comments_List);
        const Chuoi_JSX=(
            <div>
                <h1>Chi tiết bình luận</h1>
                {danh_sach_li}
               
            </div>
        )
        return Chuoi_JSX;
    }

}