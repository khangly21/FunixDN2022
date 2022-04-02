//Vị trí: Không nằm trong class mà nằm ngoài nó
//(state) => stateProps
   /// mapStateToProps runs when:store state changes
   /// component re-renders when: any field of stateProps is different

//hàm này không nằm trong class Main, nếu nằm trong thì sẽ bind(this)
const mapStateToProps = (state) => { //tham số state là lấy từ Redux store, xem reducer.js xem đối tượng state chứa 4 anh nào: dishes, comments, promotions, leaders
    // nhiệm vụ của hàm này là map Redux store's state vào props được available nhận bởi Main
    return {
        //các thuộc tính sau state phải có trong initialState
        //state được returned bởi Reducer
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
        //tuy nhiên muốn lấy các giá trị trên từ Redux Store thì phải connect trước đã, chỉ cần wrap Main component inside the connect()
    }
}


//hàm Main này trước kia dùng local state object  để lưu trữ application's state 
// Bây giờ Main không lưu local state nữa mà sẽ pull and obtain state từ Redux's store
// to do that, I need to connect Main to Redux store 
//Before do that, I define mapStateToProps function which obtain the state as parameter here
class Main extends React.Component {
    constructor(props) { //props để truy cập các biến trong Redux store's state

        //không có super() thì Uncaught ReferenceError: this hasn't been initialised - super() hasn't been called
        //không có super(props) thì undefined this.props
        //We will learn how to use withRouter() to inject params provided by React Router into connected components deep in the tree without passing them down all the way down as props.
           /// https://egghead.io/lessons/javascript-redux-using-withrouter-to-inject-the-params-into-connected-components
           /// https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom
        
        super(props); //call superclass constructor
            //thiếu this.state.dishes thì Uncaught TypeError: Cannot read properties of null (reading 'dishes')
            //Với redux thì không lưu trữ dữ liệu vào local state của component nữa
    }

    
    render(){
        
        console.log(this.props.dishes); //ok
        console.log(this.props.promotions); //ok
        console.log(this.props.leaders); //ok
        console.log(this.props.comments);//ok
        
        let dishArray=this.props.dishes;
        let filterDish=dishArray.filter((dish) => dish.featured)[0];

        //Đặt tên component này là HomePage3 là để phân biệt với HomePage component trong file HomepageComponent.js, which is composable inside HomePage3
        const HomePage3 = () => {
            //console.log(this.props.dishes.filter((dish) => dish.featured)[0]); 
            return(
                //file HomepageComponent.js
                <HomePage 
                    dish={filterDish} //dish={this.props.promotions.filter((promo) => promo.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );      
        }

       

        const DishWithId = ({match}) => { 
            return(
                <DishDetails 
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />
            );
        };

        const DishNoId=()=>{
            return(
                <MenuClassComponent
                    message={<b style={{color:'orange'}}>thêm param 0,1,2,3 trên URL để xem chi tiết món ăn</b>}
                    dishes={this.props.dishes}
                />
            )
            //NOTE: 
                /// 1. do path='/menu' không có thuộc tính exact="true" nên nhánh con  path='/menu/:dishId' sẽ thừa hưởng view của "/menu"
                /// 2. Nếu ghi message={<b style='color:orange'> thì Error: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
                /// 3. Nếu ghi message={<b style={{color:orange}}> thì nó hiểu là có biến orange thì Error: orange is undefined
        }
        
        //https://react-redux.js.org/using-react-redux/connect-mapstate
        //https://react-redux.js.org/using-react-redux/connect-mapstate

        //path='/aboutus' component={() => <Aboutus leaders={this.props.leaders} />}
       
        return(
               //mặc định khi chạy index.html thì sẽ tới /
               // <Header/> component có chứa các ReactRouterDOM.Link to , nhưng không bao lấy các Route
               // note: redirect có hiệu quả, vì các link lạ như http://127.0.0.1:5500/#/aaaaaa đều dẫn về home
               //Không cần HashRouter bao quanh Header vì ở App.js đã có HashRouter bao quanh Main rồi
               //nếu để <ReactRouterDOM.Switch> bao quanh Routes thì sẽ không tới được /menu/:dishId ; nếu để Switch bao quanh Header và các Routes và Footer thì component không hiện nội dung
                <div>
                       
                            <Header/>
                                
                                <div>
                                        
                                        
                                            <ReactRouterDOM.Route exact path='/' component={HomePage3} /> 
                                            <ReactRouterDOM.Route exact path='/aboutus' component={() => <AboutUs leaders={this.props.leaders} />} />
                                            <ReactRouterDOM.Route path='/menu' component={() => <DishNoId dishes={this.props.dishes} />} />
                                            <ReactRouterDOM.Route exact path='/menu/:dishId' component={DishWithId} />
                                            <ReactRouterDOM.Route exact path='/contactus' component={Contact} />
                                            <ReactRouterDOM.Redirect to="/" />
                                       
                                </div>
                        
                            <Footer/>
                      
                            

                </div>
            
        )
    }
}





//nếu để withRouter trong class Main thì Error: Main is not defined
//https://stackoverflow.com/questions/67215660/how-access-redux-mapped-props-from-outside-a-connected-component

//chú ý: với React component phải đặt tên là ConnectedMainComponent (ghi connectedMainComponent là sai), với HTML element thì lowercase
const ConnectedMainComponent =ReactRouterDOM.withRouter(ReactRedux.connect(mapStateToProps)(Main)); //thầy Ấn: if you use React Router then  withRouter is required to connect React app to Redux architecture and React Router
//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom