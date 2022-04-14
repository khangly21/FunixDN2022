//component này sẽ không lưu state về form vì sẽ không valdation cho form từ ContactComponent.js

import React, { Component } from 'react';
import {FormGroup,Input,FormFeedback, Breadcrumb, BreadcrumbItem, Button, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

//error: Module built failed nếu có biến Form khác được extract destructure từ reactstrap, Duplicate declaration "Form"
import { Control, Form} from 'react-redux-form'; //trong Lab09_2 thì không dùng LocalForm nữa nên với Form phải label cho nó model="feedback". ;LƯU Ý lý do form reset sau khi chuyển quan lại các menu rồi về lại Contact: Là do dùng Input mà không dùng Control.text, khi dùng Input sẽ không giữ giá trị form sau khi đi thăm về, mà còn không lưu được vào biến được alert
//Ngoài ra, sau khi submit form, thì nội dung nhập form được reset lại về mặc định

//Controlled form Validation
//https://www.logisticinfotech.com/blog/learn-redux-form-with-react-js/

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
export default class ContactNoValidation extends Component { //Create a react component by extending the Component class

    constructor(props){
        super(props);

        //Không cần state riêng để lưu form field Control.text nữa, vì đã có Redux store lưu rồi, NHƯNG cần state để validate form, nếu bỏ là báo lỗi
        this.handleSubmit=this.handleSubmit.bind(this); 
    }

    
    handleSubmit(values) { //feedback chính là đối tượng chứa tất cả thông tin người dùng nhập aka form, và đối tượng này nằm trong đối tượng state, gọi là model feedback
        console.log('Current state is: ' + JSON.stringify(values)); //trong Lab06_3_react-redux-form thì LocalForm sẽ lưu thông tin người dùng vào đối tượng values , gọi là form state chứ không phải Contact component 's state, nên có thể alert được
        alert('Current state is : '+JSON.stringify(values));
        this.props.resetFeedbackForm();
        //event.preventDefault();
    }

    render() {
        return(
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        model=".firstname"
                                    />
                                  
                                </Col>
                            </FormGroup>

                            

                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}
