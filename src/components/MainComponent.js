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

        
        const HomePage3 = () => {
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
                //khi trang chủ "/" thì chỉ có Header và Footer 
                //khi click Home thì tới "/home" thì có view của component HomepPage3 nằm giữa Footer và Header
                //exact  path='/menu' sẽ giúp khi path='/menu/:dishId' thì sẽ không có component={DishNoId} tham gia tạo View trước View của component={DishWithId} , để đảm bảo khán giả chỉ nhìn thấy a dish's details thôi chứ không thấy Menu bên trên
                
                <div>
                    <Header/>
                   
                        
                        <ReactRouterDOM.Route exact={true} path='/home' component={HomePage3}/>
                        <ReactRouterDOM.Route exact={true} path='/aboutus' component={aboutus}/>
                        <ReactRouterDOM.Route exact={true}  path='/contactus' component={Contact}/>
                        <ReactRouterDOM.Route exact  path='/menu' component={DishNoId}/>
                        <ReactRouterDOM.Route exact  path='/menu/:dishId' component={DishWithId}/>
                   
                    <Footer/>
                </div>
            
            )
        }
        
    
}

