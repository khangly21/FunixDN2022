import React, {Component} from "react";
//https://stackoverflow.com/questions/68573738/attempted-import-error-jumbotron-is-not-exported-from-react-bootstrap-impor
   /// Jumbotron is not work for Bootstrap 5
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink ,Link} from 'react-router-dom';
export default class Header extends Component {
    constructor(props) {
        super(props);
        //to add a new Modal to the application to host the form:
        this.state = {
           isNavOpen: false, //muốn hiện thì để true
           isModalOpen:false //ban đầu là đóng <Modal></Modal>, Modal có thuộc tính quan trọng isOpen nhận true hay false, thuộc tính isOpen là Controlled Component trỏ tới this.state.isModalOpen , which is setState() bởi nhấn nút Login
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    //function called after form submission
    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();//ngăn hành động bình thường là submit form

    }

    
    //toggle là tắt - mở - tắt - .....    Sau khi hàm toggleNav bị called/invoked thì state bị cập nhật, Nếu Nav đang open thì close, còn nếu đang close thì open
    toggleModal() {
        //Khi người dùng 
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }

    //render component's view
    render(){
        return(
            //Reactstrap.NavbarToggler là React/virtual DOM, sẽ hiển thị thành <button><span></span></button> trên browser DOM
               ///tuy nhiên không viết chữ vào span được
               /// dùng thẻ i trực tiếp là cũng ok (cách khác là className="fa fa-arrows-v"):  <Reactstrap.NavbarToggler><i class="fa fa-arrows-v"></i></Reactstrap.NavbarToggler>
            //View action: this.toggleNav
            //Node changed: Collapse
                ///https://bootstrapshuffle.com/classes/navbar/navbar-toggler
                ///https://techstacker.com/how-to-inline-style-jsx-react-css/
                ///https://www.geeksforgeeks.org/reactjs-reactstrap-navbar-component/
                ///Chú ý: node <Reactstrap.NavLink></Reactstrap.NavLink> được trình duyệt đọc thành <a></a>, do đó NavLink phải là link, muốn là hover thấy link  thì phải có href="", to=" " là sai vì a tag không có "to" attribute

            //View re-render
            //Controlled Modal with isOpen={this.state.isModalOpen} toggle={this.toggleModal}
            // Reactstrap.Collapse NavbarToggler được UI thành  nút màu vàng  chỉ thu lại và nhả ra thanh Navbar khi màn hình nhỏ, còn màn hình lớn sẽ không có nút này
            // Login được nhắc tới 2 lần , trong NavItem và trong ModalHeader
            
            // (ReactRouterDOM.Link,to) sẽ ủng hộ Single Page Application, còn (<Reactstrap.NavLink className="nav-link"  href='/#menu'>) sẽ làm load lại toàn bộ page, chú ý "NavLink" không kết hợp "to"
            <div>
                <Navbar dark="true" expand="md">
                    <div className="container">
                        <NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow'}} onClick={this.toggleNav}><i class="fa fa-arrows-v"></i></NavbarToggler>
            
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='/assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' />
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            
                            <Nav class="ml-auto" navbar>
                                  <NavItem>
                                      <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                  </NavItem>
                                  <NavItem>
                                      <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                  </NavItem>
                                  <NavItem>
                                      <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                  </NavItem>
                                  <NavItem>
                                      <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                  </NavItem>
                           
                                  <NavItem>
                                      <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span>
                                        Login
                                      </Button>
                                  </NavItem>

                            </Nav>

                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>

                    <ModalBody>

                        <Form onSubmit={this.handleLogin}>

                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>

                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

//NHẬN XÉT:
   /// https://www.coursera.org/learn/front-end-react/supplement/Q3UOZ/exercise-instructions-uncontrolled-forms
   /// Update HeaderComponent.js as follows to add a new Modal to the application to host the form
      //// https://www.geeksforgeeks.org/reactjs-reactstrap-modal-component/
   /// Then, add class="ml-auto" and a button to the Navbar to enable toggling the modal (điều khiển đóng-mở Modal)
       //// nếu <Reactstrap.NavItem> <Reactstrap.Button outline onClick="this.toggleModal">  thì nhấn Login không có gì
   ///Add the form to the modal body 
   ///  add the following function to the class to handle the form submission:s