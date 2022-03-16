class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dishes:DISHES,
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS
        };
        //this.onDishSelect=this.onDishSelect.bind(this);
    }
    //https://stackoverflow.com/questions/40836239/set-all-object-keys-to-false
        /// trước khi chọn món, cho tất cả dishes có featured: false
        /// sau khi chọn món, cho món đó có featured true rồi Main truyền món đó cho Dishdetails hiện ra, sau đó tất cả dishes 's features thành false

    //làm sao cho món được chọn có featured: true và các món còn lại featured:false
    /*
    onDishSelect(dishId) {
        console.log("Mã món truyền tới đây từ Menu",dishId);
        this.setState({selectedDish:dishId}); //chỉ có thể được cập nhật từ <Menu/> sự kiện onClick, sau đó sẽ cập nhật props dish truyền cho <DishDetails/>
    }
    */

    /*
        const materials = [
          'Hydrogen',
          'Helium',
          'Lithium',
          'Beryllium'
        ];
        
        console.log(materials.map(material => material.length));
        // expected output: Array [8, 6, 7, 9]
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    */

    /*
        var even = [5, 6, 13, 0, 1, 18, 23].filter(v => v % 2 == 0);
        // [6, 0, 18]
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    */

    render(){
        const HomePage = () => {
            console.log(this.state.dishes.filter((dish)=>dish.featured==true)[0]); //trả về Object dish có id 0 có featured:true
            return(
                
                <Home 
                    dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );      
        }

        const aboutus=()=>{
            return(
                <AboutUs/>
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
                
                //component={Contact} nếu Contact là type undefined (do chưa có script trong index.html) thì?
                <div>
                    <ReactRouterDOM.HashRouter>
                        <ul>
                            <li><ReactRouterDOM.Link to='/home'>Home</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/aboutus'>About Us</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/menu'>Menu</ReactRouterDOM.Link></li>
                            <li><ReactRouterDOM.Link to='/contactus'>Contact Us</ReactRouterDOM.Link></li>
                        </ul>

                        <ReactRouterDOM.Route exact={true} path='/home' component={HomePage}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus' component={aboutus}/>
                        <ReactRouterDOM.Route exact={true} path='/contactus' component={Contact}/> 
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
 
                                <Footer/>
                            </div>
                        }/>
                   
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
                            <li><ReactRouterDOM.Link to='/contactus'>Contact Us</ReactRouterDOM.Link></li>
                        </ul>

                        <ReactRouterDOM.Route exact={true} path='/home' component={HomePage}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus' component={aboutus}/>
                        <ReactRouterDOM.Route exact={true}  path='/contactus' component={Contact}/>
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
                                    //onClick={(dishId) => this.onDishSelect(dishId)}
                                />
                                <Footer/>
                            </div>
                        }/>

                     
                    </ReactRouterDOM.HashRouter>
                    
                </div>
            
            )
        }
        
    }
}

