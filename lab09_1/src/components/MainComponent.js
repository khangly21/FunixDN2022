//(state) => stateProps
   /// mapStateToProps runs when:store state changes
   /// component re-renders when: any field of stateProps is different
   import React, { Component } from 'react';

   import MenuClassComponent from './MenuClassComponent';
   import HomePage from './HomepageComponent';
   import DishDetails from './DishdetailsComponent';
   import Contact from './ContactComponent';
   import AboutUs from './AboutusComponent'

   import Header from './HeaderComponent';
   import Footer from './FooterComponent';
  
   import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
   import { connect } from 'react-redux';
   import { addComment,fetchDishes } from '../redux/ActionCreator'; //nếu dẫn sai là Module not found: Error: Can't resolve '../redux/ActionCreators' do sai tên thư mục
//hàm này không nằm trong class Main, nếu nằm trong thì sẽ bind(this)
const mapStateToProps = state => { //tham số state là lấy từ Redux store, xem reducer.js trả về đối tượng state chứa 4 anh nào: dishes, comments, promotions, leaders
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

//receive dispatch function from store as parameter , vì trong Javascript onClick nhận 1 đối tượng hàm với tên gọi 

const mapDispatchToProps=(dispatch)=>({
     //bây giờ, UI component Main có thể invokes Action để tạo object
     //dispatch<A extends Action>(action)

     //how to obtain action as parameter of despatch function? vì hàm là object nên hàm có thể làm tham số vì object có thể làm tham số, thì chỉ cần cho TÊN hàm (nếu để TÊNhàm() thì sẽ thực hiện hàm ngay nếu không bắt buộc chạy sau như callback) vào vị trí tham số nếu muốn hàm là callback thực hiện sau
     
    // Trường hợp này thì gọi hàm addComment() muốn hàm addComment() thực hiện tạo ActionObject ngay lập tức không chờ đợi
    // việc gọi hàm dispatch() của store sẽ giúp ActionObject to store

    //https://react-redux.js.org/using-react-redux/connect-mapdispatch
        ///The mapDispatchToProps function will be called with dispatch as the first argument. You will normally make use of this by returning new functions that call dispatch() inside themselves, and either pass in a plain action object directly or pass in the result of an action creator.
    addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)), //ghi dài vậy chứ thực ra là hàm dispatch(action) phân phối action tới store
    //this can be used/available within Main component here after connect() . Then what should we make use of it in connected Main Component?
    //Tham số của hàm dispatch là gì? either pass in a plain action object directly or pass in the result of an action creator.

    //map fetchDishes vào Props với tên biến mới là fetchDishes
    fetchDishes: () => { dispatch(fetchDishes())}  //vế phải fetchDishes() là 1 thunk, dispatch giúp cho fetchDishes() available cho application
    //now where I will fetch the dishes? componentdidmount giúp fetch sau khi đối tượng Main đi vào DOM , trong life cycle của Main
})


//hàm Main này trước kia dùng local state object  để lưu trữ application's state 
// Bây giờ Main không lưu local state nữa mà sẽ pull and obtain state từ Redux's store
// to do that, I need to connect Main to Redux store 
//Before do that, I define mapStateToProps function which obtain the state as parameter here
class Main extends Component {
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

    componentDidMount() {
        //call/execute/invoke , this is very good time to fetch any data required for my application
        this.props.fetchDishes(); //vì trước đó dispatch đã đưa hàm tạo hành động fetchDishes vào trong props fetchDishes, nên biến mới này thành hàm và được call bằng ()
    }

    
    render(){
        //Các props sau đã available sau khi connect Main to mapStateToProps. Tuy nhiên mỗi khi state thay đổi thì hàm  mapStateToProps được gọi lại
        console.log(this.props.dishes); //ok
        console.log(this.props.promotions); //ok
        console.log(this.props.leaders); //ok
        console.log(this.props.comments);//ok
        console.log(this.props.addComment); //ok!
        
        //Đặt tên component này là HomePage3 là để phân biệt với HomePage component trong file HomepageComponent.js, which is composable inside HomePage3
        const HomePage3 = () => {
            //console.log(this.props.dishes.filter((dish) => dish.featured)[0]); 
            return(
                //file HomepageComponent.js
                <HomePage 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );      
        }

       
        
        const DishWithId = ({match}) => { 
            //thuộc tính thứ ba là addComment sẽ giúp component DishDetails gián tiếp gửi được thông tin user has submitted tới Store thông qua Action Creator và Action
            return(
                <DishDetails 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    addComment={this.props.addComment}
                    //addComment= {(dishId,rating,author,comment)=>store.dispatch(addComment(dishId,rating,author,comment))}
                />
            );
        };

        const DishNoId=()=>{
            return(
                <MenuClassComponent
                    message={<b style={{color:'orange'}}>thêm param 0,1,2,3 trên URL, hoặc click hình món ăn để xem chi tiết món ăn</b>}
                    dishes={this.props.dishes.dishes} //mảng
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

               //<ReactRouterDOM.Redirect to="/" /> thì khi form bên DishDetails submit lên URL, thì URL lạ sẽ được chuyển qua "/" tới Home
               
                <div>
                       
                            <Header/>
                                
                                <div>
                                        
                                        
                                        <Route exact path='/' component={HomePage3} /> 
                                        <Route exact path='/aboutus' component={() => <AboutUs leaders={this.props.leaders} />} />
                                        <Route exact path='/menu' component={() => <DishNoId dishes={this.props.dishes} />} />
                                        <Route path='/menu/:dishId' component={DishWithId} />
                                        <Route exact path='/contactus' component={Contact} />
                                        <Redirect to="/" />    
                                       
                                </div>
                        
                            <Footer/>
                      
                            

                </div>
            
        )
    }
}





//nếu để withRouter trong class Main thì Error: Main is not defined
//https://stackoverflow.com/questions/67215660/how-access-redux-mapped-props-from-outside-a-connected-component

//chú ý: với React component phải đặt tên là ConnectedMainComponent (ghi connectedMainComponent là sai), với HTML element thì lowercase

//connect MainComponent to mapStateToProps [để  dishes,comments,promotions,leaders available cho MainComponent sử dụng] và mapDispatchToProps  [để  addComment được available cho MainComponent sử dụng]
//https://stackoverflow.com/questions/69934351/withrouter-is-not-exported-from-react-router-dom
 //nhờ connect với 

//Syntax error: C:\localhost\HK120212022_cacMonHoc\FUNIX\KHOA_3_WebFrontEnd_ReactJS\ĐỒ_ÁN_VÀ EXERCISES_VÀ_LABS\LABS\Lab08_2_Muppala_createReactApp\lab08_2\src\components\MainComponent.js: Only one default export allowed per module. (170:0)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//thầy Ấn: if you use React Router then  withRouter is required to connect React app to Redux architecture and React Router
//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom
//As the second argument passed in to connect, mapDispatchToProps is used for dispatching actions to the store.
    /// https://react-redux.js.org/using-react-redux/connect-mapdispatch
        //// With React Redux, your components never access the store directly - connect does it for you
        //// If you don't specify the second argument to connect(), your component will receive "dispatch" by default, you can use "dispatch" to dispatch action to store.
           ///// ex connect()(MyComponent)
                   // which is equivalent with
                   //connect(null, null)(MyComponent)
                   // or
                   //connect(mapStateToProps /** no second argument */)(MyComponent)