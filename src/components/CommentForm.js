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
        return(

            <div>
                <b style={{marginLeft:"3vw"}}>Add your comment! </b>
                <Reactstrap.Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg">Comment</span>
                                        
                </Reactstrap.Button>  

                 <Reactstrap.Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                         <Reactstrap.ModalHeader>Submit Comment</Reactstrap.ModalHeader>
                 
                         <Reactstrap.ModalBody>
                 
                             <Reactstrap.Form onSubmit={this.handleComment}>
                 
                                 <Reactstrap.FormGroup>
                                     <Reactstrap.Label htmlFor="username">Username</Reactstrap.Label>
                                     <Reactstrap.Input type="text" id="username" name="username"
                                         innerRef={(input) => this.username = input} />
                                 </Reactstrap.FormGroup>
                 
                                 <

                                 Reactstrap.FormGroup>
                                     <Reactstrap.Label htmlFor="rating">Rating (between 1 and 5)</Reactstrap.Label>
                                     <Reactstrap.Input type="number" min="1" max="5" id="rating" name="rating"
                                         innerRef={(input) => this.rating = input}  />
                                 </Reactstrap.FormGroup>

                                 <Reactstrap.FormGroup>
                                     <Reactstrap.Label htmlFor="comment"> Comment </Reactstrap.Label>
                                     <Reactstrap.Input type="textarea" id="comment" name="comment" rows="4"
                                         innerRef={(input) => this.comment = input}  />
                                 </Reactstrap.FormGroup>
                 
                                 <Reactstrap.FormGroup check>
                                     <Reactstrap.Label check>
                                         <Reactstrap.Input  type="checkbox" name="remember"
                                         innerRef={(input) => this.remember = input}  />
                                         Remember me
                                     </Reactstrap.Label>
                                 </Reactstrap.FormGroup>
                 
                                 <Reactstrap.Button type="submit" value="submit" color="primary">Login</Reactstrap.Button>
                             </Reactstrap.Form>
                 
                         </Reactstrap.ModalBody>
                     </Reactstrap.Modal>
            </div>
            
        )
    }
}