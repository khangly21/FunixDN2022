class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isNavOpen: false //muốn hiện thì để true
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    //https://www.geeksforgeeks.org/reactjs-reactstrap-navbar-component/
    /*
          function App() {
               const [isOpen, setIsOpen] = useState(false);
               const toggle = () => setIsOpen(!isOpen);
              
               return (
                <div className="App">
                 <Navbar color="primary" dark expand="md">
                  <NavbarBrand href="/">Pokédex</NavbarBrand>
                  <NavbarToggler onClick={toggle} />
                 </Navbar>
                 <Switch>
                  <Route exact path="/pokedex" component={HomeContainer} />
                  <Route path="/pokedex/details/:id" component={DetailsContainer} />
                 </Switch>
                </div>
               );
          }
    */

    //toggle là tắt - mở - tắt - .....    Sau khi hàm toggleNav bị called/invoked thì state bị cập nhật, Nếu Nav đang open thì close, còn nếu đang close thì open
    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }

    //render component's view
    render(){
        //return() không có { } bên cạnh như render(){}. Sẽ báo lỗi "Error: expected '=>' "
        //https://reactjs.org/docs/fragments.html  thay vì trong return có <> </> hay <div></div> thì dùng <React.Fragment></React.Fragment>
        //<React.Fragment dark> thì Warning: Invalid prop `dark` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.
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
            <div>
                <Reactstrap.Navbar dark expand="md">
                    <div className="container">
                        <Reactstrap.NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow'}} onClick={this.toggleNav}><i class="fa fa-arrows-v"></i></Reactstrap.NavbarToggler>
            
                        <Reactstrap.NavbarBrand className="mr-auto" href="/">
                            <img src='../../public/assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' />
                        </Reactstrap.NavbarBrand>

                        <Reactstrap.Collapse isOpen={this.state.isNavOpen} navbar>
                            <Reactstrap.Nav navbar>
                                  <Reactstrap.NavItem>
                                      <Reactstrap.NavLink className="nav-link"  href='/#home'><span className="fa fa-home fa-lg"></span> Home</Reactstrap.NavLink>
                                  </Reactstrap.NavItem>
                                  <Reactstrap.NavItem>
                                      <Reactstrap.NavLink className="nav-link" href='/#aboutus'><span className="fa fa-info fa-lg"></span> About Us</Reactstrap.NavLink>
                                  </Reactstrap.NavItem>
                                  <Reactstrap.NavItem>
                                      <Reactstrap.NavLink className="nav-link"  href='/#menu'><span className="fa fa-list fa-lg"></span> Menu</Reactstrap.NavLink>
                                  </Reactstrap.NavItem>
                                  <Reactstrap.NavItem>
                                      <Reactstrap.NavLink className="nav-link" href='/#aboutus/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</Reactstrap.NavLink>
                                  </Reactstrap.NavItem>
                            </Reactstrap.Nav>
                        </Reactstrap.Collapse>
                    </div>
                </Reactstrap.Navbar>
                <Reactstrap.Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Reactstrap.Jumbotron>
            </div>
        )
    }
}