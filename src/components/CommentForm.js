import React, { Component } from "react";
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Label} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm } from "react-redux-form";

//Note: export default reference sẽ không nhận ra import {CommentForm} from "./CommentForm" mà nhận ra import CommentForm from "./CommentForm";
class CommentForm extends Component{
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
        this.props.addComment(
          this.props.dishId,
          values.rating,
          values.author,
          values.comment);
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
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg">Comment</span>
                </Button>  

                 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                         <ModalHeader>Submit Comment</ModalHeader>
                 
                         <ModalBody>
                         <LocalForm onSubmit={this.handleComment}>
                               <Row className="control-group">
                                 <Label htmlFor="rating" md={10}>
                                   Rating
                                 </Label>
                                 <Control.select
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
                                 </Control.select>
                               </Row>

                               <Row>
                                 <Label htmlFor="author" md={10}>
                                   Your Name
                                 </Label>
                                 <Control.text
                                   model=".author"
                                   className="form-control m-2"
                                   id="author"
                                   name="author"
                                   placeholder="Your Name"
                                 ></Control.text>
                               </Row>
                               <Row className="control-group">
                                 <Label htmlFor="comment" md={10}>
                                   Comments
                                 </Label>
                                 <Control.textarea
                                   model=".comment"
                                   className="form-control m-2"
                                   id="comment"
                                   name="comment"
                                   rows="10"
                                 ></Control.textarea>
                                 <Button color="primary">Submit</Button>
                               </Row>
                             </LocalForm>
                           
                 
                         </ModalBody>
                     </Modal>
            </div>
            
        )
    }
}

//sẽ là 0 references nếu bên DishDetails không import CommentForm
export default CommentForm;