//Controlled form
//Nếu extends Component thì Reference error: Component is not defined, nên phải thêm reference React.

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
class Contact extends React.Component {
    constructor(props){
        super(props);

        //Component takes fomr's current value through props
        this.state={
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            agree:false,
            contactType:'Tel.',
            message:''
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this); //this contains a reference to React DOM Contact
        //https://codegrepr.com/question/jquery-checkbox-event-handling/
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


    render() {
        return(
            //nếu <Form><Form/> thì báo lỗi JSX element Form has no corresponding closing tag, phải là <Form></Form>
            // HTML class form-group
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
                                        onChange={this.handleInputChange} />
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange} />
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>
        
                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="telnum" md={2}>Contact Tel.</Reactstrap.Label>
                                    <Reactstrap.Col md={10}>
                                        <Reactstrap.Input type="tel" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            value={this.state.telnum}
                                            onChange={this.handleInputChange} />
                                    </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="email" md={2}>Email</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
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
