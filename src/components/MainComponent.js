class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dishes:DISHES,
            selectedDish:null  //đây là id của món ăn (không phải đối tượng) //mặc định là 0 
        };
        this.onDishSelect=this.onDishSelect.bind(this);
    }

    onDishSelect(dishId) {
        this.setState({selectedDish:dishId}); //chỉ có thể được cập nhật từ <Menu/> sự kiện onClick, sau đó sẽ cập nhật props dish truyền cho <DishDetails/>
    }

    

    render(){
        console.log(this.state.dishes.filter((dish) => dish.id === dish)); //VD this.state.selectedDish =1 thì trả về 1 đối tượng

        //2 trường hợp rẽ nhánh cho return: TH1: this.state.selectedDish == null thì chỉ gọi tham chiếu <Menu/> TH2: this.state.selectedDish != null thì gọi tham chiếu cả <Menu/> và <DishDetails/> 
        
        //biết mã số this.state.selectedDish và mảng các đối tượng this, tìm một đối tượng dish có id là  this.state.selectedDish
        //chọn phần tử đầu tiên của mảng dishes có id = với selectedDish's id
        const dish_duoc_chon=this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];
        
        const HomePage = () => {
            return(
                <Home />
            );      
        }

        const aboutus=()=>{
            return(
                <AboutUs/>
            )
        }

        const contactus=()=>{
            return(
                <h1>Contact us!</h1>
            )
        }

        if(this.state.selectedDish != null) { //id khác null
            console.log(this.state.selectedDish);
            return(
                //sau khi class con Menu emit event cho class cha Main để cập nhật ID món: this.state.selectedDish. Sau khi state thay đổi thì Main component sẽ re-render vô phần tương ứng là div#re_render
                //https://www.w3schools.com/react/react_css.asp
                //style={{color:white}} là sai
                //Insert an object with the styling information
                //inline style attribute, the value must be a JavaScript object
                //camelCased Property Names  (EX Use backgroundColor instead of background-color)
                //Note: In JSX, JavaScript expressions are written inside curly braces, and since JavaScript objects also use curly braces, the styling in the example above is written inside two sets of curly braces {{}}.
                //các thẻ <Reactstrap.Navbar dark color="primary">, NavbarBrand đều không dùng style={{color: "red"}} color="success" được do không hiển thị trong Inspect HTML

                //Các Reactstrap sau chỉ có tác dụng khi click 1 hình 
                // "/home" hiện <h1>HOME</h1> và children của nó như "/home/assssccs" sẽ cũng hiện <h1>HOME</h1>. Muốn children không bị ảnh hưởng thì phải có exact, nghĩa là "/home/assssccs" sẽ không hiện HOME, chỉ có duy nhật "/home" là hiện HOME
                <div>
                    <ReactRouterDOM.HashRouter>
                        <ul>
                            <li><ReactRouterDOM.Link to='/home'>Home</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/aboutus'>About Us</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/menu'>Menu</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/aboutus/contactus'>Contact Us</ReactRouterDOM.Link></li>
                        </ul>

                        <ReactRouterDOM.Route exact={true} path='/home' component={HomePage}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus' component={aboutus}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus/contactus' component={contactus}/>
                        <ReactRouterDOM.Route exact={true} path='/menu' component={()=>
                            <div>
                                <Reactstrap.Navbar color="success" light>
                                     <div className="container">
                                         <Reactstrap.NavbarBrand href="/home" style={{color: 'red'}}>Functional Menu</Reactstrap.NavbarBrand>
                                     </div>
                                </Reactstrap.Navbar>
            
                                <Header/>
                                <b>Danh sách món ăn của thực đơn</b>
                                <Menu 
                                    dishes={this.state.dishes}
                                    onClick={(dishId) => this.onDishSelect(dishId)}
                                />
                
                                <div id="re_render">
                                    <em>Mã món được chọn:</em> {this.state.selectedDish}
                                </div>
            
                                <DishDetails 
                                    dish={dish_duoc_chon}
                                />
            
                                <Footer/>
                            </div>
                        }/>
                        <ReactRouterDOM.Route to="/" />   
                    </ReactRouterDOM.HashRouter>
                </div>

                
            )
        }else{
            return(
                //<Menu/> referencer không còn được Main gọi mặc định nữa, mà phải thông qua 1 path
                //exact or exact={true} As the name suggests, it is ： Precise matching => SOLVE problem: https://codedamn.com/learn/reactjs/routing-introduction/exact-route-match.5b9VpWg_Ps
                // thử cho exact xuống path /menu, không phải path /  thì sau khi có chữ Home, nhấn /aboutus sẽ xuất hiện chữ About us ngay sau Home mà Home không biến mất
                <div>
                    <ReactRouterDOM.HashRouter>
                        <ul>
                            <li><ReactRouterDOM.Link to='/home'>Home</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/aboutus'>About Us</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/menu'>Menu</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/aboutus/contactus'>Contact Us</ReactRouterDOM.Link></li>
                        </ul>

                        <ReactRouterDOM.Route exact={true} path='/home' component={HomePage}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus' component={aboutus}/>
                        <ReactRouterDOM.Route exact={true}  path='/aboutus/contactus' component={contactus}/>
                        <ReactRouterDOM.Route exact={true} path='/menu' component={()=>
                            <div>
                                <Reactstrap.Navbar dark color="primary">
                                    <div>
                                        <Reactstrap.NavbarBrand href="/home" style={{color:"white"}}>Class component Menu</Reactstrap.NavbarBrand>
                                    </div>
                                </Reactstrap.Navbar>
         
                                <Header/>
                                <MenuClassComponent
                                    dishes={this.state.dishes}
                                    onClick={(dishId) => this.onDishSelect(dishId)}
                                />
                                <Footer/>
                            </div>
                        }/>

                        <ReactRouterDOM.Route to="/" />   

                    </ReactRouterDOM.HashRouter>
                    
                </div>
            
            )
        }
        
    }
}

