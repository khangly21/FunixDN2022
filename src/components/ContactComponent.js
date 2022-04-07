//Controlled form Validation

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
class Contact extends React.Component { //Create a react component by extending the Component class

    constructor(props){
        super(props);

        //Component takes fomr's current value through props
        this.state={
            //key là các thuộc tính tên (name) của thẻ input
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            agree:false,
            contactType:'Tel.',
            message:'',
            touched:{
                firstname:false,
                lastname:false,
                telnum:false,
                email:false,
            }
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this); //this contains a reference to React DOM Contact
        //https://codegrepr.com/question/jquery-checkbox-event-handling/
        this.handleBlur=this.handleBlur.bind(this); //vế phải handleBlur là functional component nên không cần bind vào class
        this.validate=this.validate.bind(this);
    }

    //Unlike the uncontrolled component, the input form element in the controlled component is handled by the component rather than the DOM. It takes its current value through props. The changes are notified through callbacks.
    //https://www.w3schools.blog/forms-reactjs
    
    //https://newbedev.com/javascript-react-checkbox-event-target-value-code-example
    
    handleInputChange(event) {
        //input type=text thì nhận value, còn input type checkbox thì nhận checked
        //[event.target.name] là giá trị của tên của input DOM  nói cách khác là <input name="giá trị"
        const target_DOM_element=event.target;//event is already set to / contains reference to the input's DOM element
        //DOM input thì có type hoặc checkbox hoặc text
        const value_of_input_DOM= target_DOM_element.type === 'checkbox' ? target_DOM_element.checked : target_DOM_element.value; // <input checked={}
        const name = target_DOM_element.name;
        //https://stackoverflow.com/questions/38899884/how-to-use-square-brackets-in-react-setstate
        /// thay vì ghi target.name : value trong setState thì dynamically   [name]:value vì input's name có thể là một trong các state instance property trong this.state 
        this.setState({
          [name]: value_of_input_DOM
        });
    }

    handleSubmit(event) {
        console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is : '+JSON.stringify(this.state));
        event.preventDefault();
    }

    //khi input field nào đó bị loosed focus (nghĩa là mang con trỏ ra ngoài)
    // ... là Spread Operator để combine các key:value khác [field_loosed_focus] vào trong this.state.touched 
    handleBlur=(field)=>(event)=>{
        this.setState(
            {
                touched:{...this.state.touched,[field]:true}
            }
        )
    }

    validate(firstname,lastname,telnum,email){
        const errors={
            //chú ý nếu bỏ các if else phía sau đây thì các params bị tối màu
            //chứng tỏ các thuộc tính của đối tượng errors không liên quan gì các tham số hàm
            firstname:'',
            lastname:'',
            telnum:'',
            email:''
        } //nếu giữa nguyên được các giá trị '' thì hoàn toàn valid (vì 4 input fields trên không có lỗi nào)

        //if(this.state.touched.firstname)  nghĩa là if(this.state.touched.firstname==true) 

        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

        //const reg = /^[0-9\b]+$/;
        //https://www.itsolutionstuff.com/post/react-phone-number-validation-exampleexample.html
        //https://www.javatpoint.com/javascript-form-validation
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (this.state.touched.telnum && !pattern.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            //cắt chuỗi email thành từng ký tự cách nhau ''
            //https://www.w3schools.com/jsref/jsref_split.asp
            errors.email = 'Email should contain a @';

        return errors;
    }

    


    render() {
        const errors=this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return(
            
            //nếu <Form><Form/> thì báo lỗi JSX element Form has no corresponding closing tag, phải là <Form></Form>
            // HTML class form-group
            //https://stackoverflow.com/questions/62426823/reactstrap-input-validation-error-help-needed
            //https://thewebdev.info/2020/08/01/reactstrap%E2%80%8A-%E2%80%8Aform-validation-and-customizations/

            //errors là tổng hợp tất cả lỗi nhập liệu trên form
            //Reactstrap.Input sẽ có thuộc tính valid=true hoặc invalid=true, tương tự <Reactstrap.FormFeedback> cũng cần

            //CHÚ Ý: khi Input có thuộc tính invalid=false thì có FormFeedback
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                
                    <Reactstrap.Form onSubmit={this.handleSubmit}>
                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="firstname" md={2}>First Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        valid={errors.firstname===''}
                                        invalid={errors.firstname!==''}
                                        onBlur={this.handleBlur('firstname')}
                                        onChange={this.handleInputChange} />
                                    <Reactstrap.FormFeedback>{errors.firstname}</Reactstrap.FormFeedback>    
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        valid={errors.lastname === ''}
                                        invalid={errors.firstname!==''}
                                        onBlur={this.handleBlur('lastname')}
                                        onChange={this.handleInputChange} />
                                    <Reactstrap.FormFeedback>{errors.lastname}</Reactstrap.FormFeedback>
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>
        
                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="telnum" md={2}>Contact Tel.</Reactstrap.Label>
                                    <Reactstrap.Col md={10}>
                                        <Reactstrap.Input type="tel" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            value={this.state.telnum}
                                            valid={errors.telnum === ''}
                                            invalid={errors.telnum!==''}
                                            onBlur={this.handleBlur('telnum')}
                                            onChange={this.handleInputChange} />
                                        <Reactstrap.FormFeedback>{errors.telnum}</Reactstrap.FormFeedback>
                                    </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="email" md={2}>Email</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange} />
                                    <Reactstrap.FormFeedback>{errors.email}</Reactstrap.FormFeedback>
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>

                                <Reactstrap.Col md={{size: 6, offset: 2}}>
                                    <Reactstrap.FormGroup check>
                                        <Reactstrap.Label check>
                                            <Reactstrap.Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Reactstrap.Label>
                                    </Reactstrap.FormGroup>
                                </Reactstrap.Col>

                                <Reactstrap.Col md={{size: 3, offset: 1}}>
                                    <Reactstrap.Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Reactstrap.Input>
                                </Reactstrap.Col>

                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="message" md={2}>Your Feedback</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}></Reactstrap.Input>
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Col md={{size: 10, offset: 2}}>
                                    <Reactstrap.Button type="submit" color="primary">
                                        Send Feedback
                                    </Reactstrap.Button>
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>


                    </Reactstrap.Form>
                </div>
            </div>
        )
        

         
        
                
        
        
    }
}
