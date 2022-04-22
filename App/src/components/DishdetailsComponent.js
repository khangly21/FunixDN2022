import React, { Component } from "react";
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Label} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm } from "react-redux-form";
//import { addComment } from "../redux/ActionCreator";
import CommentForm from "./CommentForm";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


//FUNCTIONAL COMPONENT
//nếu để export default DishDetails là không ghi được const
//When destructuring objects, we use curly braces with the EXACT name of what we have in the object. Unlike in arrays where we can use any variable name to unpack the element, objects allow just the use of the name of the stored data.
const DishDetails = (props) => { //nhận dữ liệu props từ Main là 1 đối tượng dish, có dùng map() để tạo Chuoi_JSX cho từng dish ??
    if(props.isLoading){ //true
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }
    else if(props.errMess){ //and isLoading is false
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    //cấu trúc tương tự MenuComponent.js
    else if (props.dish != null){
        return(
            //<Link to="/menu">Menu</Link> được class cha Main đọc được và Main như 1 bộ hỗn hợp Router-Switch để điều hướng dựa trên Link, component như cổng ra , và return của component là Chuoi_JSX
            //VD  Link to="/menu" nghĩa là được Main điều hướng tới component Menu và trả Chuoi_JSX tương ứng
            //Mối liên quan giữa Breadcrumb và Link: "Breadcrumb" lets us navigate to different pages by providing the "Link" tags for the navigation hierarchy.
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/">Home</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
    
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                </div>
    
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
        
                    <div className="col-12 col-md-5 m-1">
                        <RenderCommentItem 
                            comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                            //author={props.comments.author} //có thể không cần, chỉ cần comments map ra các comment sau đó dùng comment.author, thử cách author này và thay thế comment.author
                        />
                        
                    </div>   
                </div>
            </div>
          
        )
    }else {
        return <div></div>;
    }
    
}


export function RenderDish({dish}) { //là cách khác thay vì viết props, cách dùng destructuring đối tượng javascript props, gán giá trị của biến props.dish vào 1 biến mới với exact name là "dish"
    //các children được trả về bởi callback của map() phải có key
    return(
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
        
    );
}


export function RenderDish2(props) {
    //các children được trả về bởi callback của map() phải có key
    const dish=props.dish;
    return(
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card  body>
                <CardImg src={dish.image} alt={dish.name}/>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </Card>
        </div>
        
    );
}


export function RenderCommentItem({comments,postComment,dishId}) {//chú ý param thứ 2 là 1 function object khi được gọi phía CommentForm sẽ cần 4 tham số (dishId,rating,author,comment)
    //Ask mentor: khi destructure từ props thì có bắt buộc gán vào các biến cùng tên (addComments) với các thuộc tính của props.addComment? Lab10_1 thấy được
    if (comments != null){
        console.log(comments); //ok!!
        console.log(postComment);
        return(
        
            <div>
                <h4 style={{color:'blue'}}>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment)=>{
                           return(
                               <Fade in>
                                    <li key={comment.id}>
                                        <p>-------------Rated: {comment.rating} ----------------------</p>
                                        <b style={{color:"chocolate"}}>{comment.comment}</b>
                                        <p>--on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} --</p>
                                        <b style={{color:"red"}}>-- By {comment.author} --</b>
                                    </li>
                               </Fade>
                              
                           )
                       })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
            //tuy nhiên sau khi submit comment form, thì dữ liệu được truyền với method GET tới trang chủ với URL như: 
               /// http://127.0.0.1:5500/?username=lyvietkhang&rating=1&comment=TEST&remember=on#/
            //Làm sao grasp lấy dữ liệu từ URL's param ?  https://karoldabrowski.com/blog/getting-parameters-from-url-in-a-react-application/
               /// điều kiện dùng useParams() là https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
    
        )
    }else{
        return <div></div>;
    }
    
}

//hàm DishWithId trong Main chưa được export thì ở DishDetails có 0 references
export default DishDetails;