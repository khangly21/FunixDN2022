class Main extends React.Component {
    constructor(props) {
        super(props); //call superclass constructor
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

    //https://www.educba.com/react-componentdidmount/
    
    
    
    componentDidMount(){
        console.log("componentDidMount");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }

    componentWillUnmount(){
        console.log("componentWillUnmount");
    }
    
    render(){
        console.log("render");
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

        const DishWithId = ({match}) => { //xem lý thuyết về match object:
            //Match Object nhận về giá trị của parameter id trên URL như thế nào? match.params.id được sử dụng rất nhiều
            return(
                //Biến đầu vào: match, dishes, comments
                //công cụ: https://www.w3schools.com/JSREF/jsref_parseint.asp , filter trả về 1 mảng
                //truyền tới DishDetail đối tượng dish và comments
                <DishDetails 
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
                />
            );
        };

        const DishNoId=()=>{
            return(
                <MenuClassComponent
                    message={<b style={{color:'orange'}}>thêm param 0,1,2,3 trên URL để xem chi tiết món ăn</b>}
                    dishes={this.state.dishes}
                />
            )
            //NOTE: 
                /// 1. do path='/menu' không có thuộc tính exact="true" nên nhánh con  path='/menu/:dishId' sẽ thừa hưởng view của "/menu"
                /// 2. Nếu ghi message={<b style='color:orange'> thì Error: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
                /// 3. Nếu ghi message={<b style={{color:orange}}> thì nó hiểu là có biến orange thì Error: orange is undefined
        }
        
        return(
                //<Menu/> referencer không còn được Main gọi mặc định nữa, mà phải thông qua 1 path
                //exact or exact={true} As the name suggests, it is ： Precise matching => SOLVE problem: https://codedamn.com/learn/reactjs/routing-introduction/exact-route-match.5b9VpWg_Ps
                // thử cho exact xuống path /menu, không phải path /  thì sau khi có chữ Home, nhấn /aboutus sẽ xuất hiện chữ About us ngay sau Home mà Home không biến mất
                //<Reactstrap.Navbar dark color="primary"> => react_devtools_backend.js:3973 Warning: Received `true` for a non-boolean attribute `dark`. 
                    ///If you want to write it to the DOM, pass a string instead: dark="true" or dark={value.toString()}.
                    /// cũng như Breadcrumb, chỉ ghi 1 chữ exact là mặc định true
                // nếu <ReactRouterDOM.Route  path='/menu' component={<h3>Xin hãy truyền tham số dishId</h3>}/>  sẽ báo lỗi Warning: React.createElement: type is object <h3/> which is invalid 
                //HashRouter được honeygain dùng
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
                        <ReactRouterDOM.Route  path='/menu' component={DishNoId}/>
                        <ReactRouterDOM.Route exact  path='/menu/:dishId' component={DishWithId}/>

                     
                    </ReactRouterDOM.HashRouter>
                    
                </div>
            
            )
        }
        
    
}

