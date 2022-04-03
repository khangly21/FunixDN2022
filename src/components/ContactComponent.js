//Controlled form Validation

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
class Contact extends React.Component { //Create a react component by extending the Component class

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this); 
      
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is : '+JSON.stringify(values));
    }

    render() {
        //chú ý: import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
             /// và import { Control, LocalForm, Errors } from 'react-redux-form';
        return(
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                
                <ReactReduxForm.LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="firstname" md={2}>First Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                    />
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                    />
                                </Reactstrap.Col>
                            </Reactstrap.Row>
        
                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="telnum" md={2}>Contact Tel.</Reactstrap.Label>
                                    <Reactstrap.Col md={10}>
                                        <ReactReduxForm.Control.text model=".telnum" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            className="form-control"
                                         />
                                     
                                    </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="email" md={2}>Email</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Reactstrap.Label check>
                                            <ReactReduxForm.Control.checkbox model=".agree"
                                                name="agree"
                                                className="form-check-input" /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Reactstrap.Label>
                                    </div>
                                </Reactstrap.Col>

                                <Reactstrap.Col md={{size: 3, offset: 1}}>
                                    <ReactReduxForm.Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </ReactReduxForm.Control.select>
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="message" md={2}>Your Feedback</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Col md={{size: 10, offset: 2}}>
                                    <Reactstrap.Button type="submit" color="primary">
                                        Send Feedback
                                    </Reactstrap.Button>
                                </Reactstrap.Col>
                            </Reactstrap.Row>


                    </ReactReduxForm.LocalForm>
                </div>
            </div>
        )
        

         
        
                
        
        
    }
}
