class CommentForm extends React.Component{
    //UI của nút mở form comment cũng giống UI của nút Login thuộc HeaderComponent
    constructor(props) {
        super(props);
        //to add a new Modal to the application to host the form:
        this.state = {
           isModalOpen:false //ban đầu là đóng <Modal></Modal>, Modal có thuộc tính quan trọng isOpen nhận true hay false, thuộc tính isOpen là Controlled Component trỏ tới this.state.isModalOpen , which is setState() bởi nhấn nút Login
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    //function called after form submission event
    handleComment(values) {//không cần dùng event.target.value
        this.toggleModal();
        //gọi hàm addComment() với 4 tham số, click "1 reference" của Class CommentForm để xem
        this.props.addComment(this.props.dishId,values.rating,values.username,values.comment);
        //event.preventDefault() , bài giảng không dùng event, và các sau khi submit form sẽ không có method GET truyền tham số lên thanh địa chỉ
    }

    
    //toggle là tắt - mở - tắt - .....    Sau khi hàm toggleNav bị called/invoked thì state bị cập nhật, Nếu Nav đang open thì close, còn nếu đang close thì open
    toggleModal() {
        //Khi người dùng 
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    render(){
        //https://www.w3schools.com/tags/att_input_type_range.asp

        //trong Modal, sử dụng Uncontrolled form, trong khi bài Tran Tien Dat dung React-redux-form
        return(
             
            <div>
                <b style={{marginLeft:"3vw"}}>Add your comment! </b>
                <Reactstrap.Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg">Comment</span>
                </Reactstrap.Button>  

                 <Reactstrap.Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                         <Reactstrap.ModalHeader>Submit Comment</Reactstrap.ModalHeader>
                 
                         <Reactstrap.ModalBody>
                         <ReactReduxForm.LocalForm onSubmit={this.handleComment}>
                               <Reactstrap.Row className="control-group">
                                 <Reactstrap.Label htmlFor="rating" md={10}>
                                   Rating
                                 </Reactstrap.Label>
                                 <ReactReduxForm.Control.select
                                   model=".rating"
                                   className="form-control m-2"
                                   id="rating"
                                   name="rating"
                                   defaultValue="1"
                                 >
                                   <option>1</option>
                                   <option>2</option>
                                   <option>3</option>
                                   <option>4</option>
                                   <option>5</option>
                                 </ReactReduxForm.Control.select>
                               </Reactstrap.Row>

                               <Reactstrap.Row>
                                 <Reactstrap.Label htmlFor="author" md={10}>
                                   Your Name
                                 </Reactstrap.Label>
                                 <ReactReduxForm.Control.text
                                   model=".author"
                                   className="form-control m-2"
                                   id="author"
                                   name="author"
                                   placeholder="Your Name"
                                 ></ReactReduxForm.Control.text>
                               </Reactstrap.Row>
                               <Reactstrap.Row className="control-group">
                                 <Reactstrap.Label htmlFor="comment" md={10}>
                                   Comments
                                 </Reactstrap.Label>
                                 <ReactReduxForm.Control.textarea
                                   model=".comment"
                                   className="form-control m-2"
                                   id="comment"
                                   name="comment"
                                   rows="10"
                                 ></ReactReduxForm.Control.textarea>
                                 <Reactstrap.Button color="primary">Submit</Reactstrap.Button>
                               </Reactstrap.Row>
                             </ReactReduxForm.LocalForm>
                           
                 
                         </Reactstrap.ModalBody>
                     </Reactstrap.Modal>
            </div>
            
        )
    }
}