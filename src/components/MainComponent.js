//(state) => stateProps
   /// mapStateToProps runs when:store state changes
   /// component re-renders when: any field of stateProps is different
   import React, { Component } from 'react';

   //define các Child component references
   import MenuClassComponent from './MenuClassComponent';
   import HomePage from './HomepageComponent';
   import DishDetails from './DishdetailsComponent';
   import Contact from './ContactComponent';
   import ContactTranTienDat from './ContactTranTienDat';
   import ContactNoValidation from './Contact_without_validation';

   import AboutUs from './AboutusComponent'
   import Header from './HeaderComponent';
   import Footer from './FooterComponent';
  
   import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
   import { connect } from 'react-redux';
   import { addComment,fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreator'; //nếu dẫn sai là Module not found: Error: Can't resolve '../redux/ActionCreators' do sai tên thư mục

   import { actions } from 'react-redux-form';
   import {TransitionGroup,CSSTransition} from 'react-transition-group';


//cho các functional component ra ngoài render để thử xem có animation không
/*  //Cách khác, Route component={HomePage3}  
export const HomePage3 = (props) => {
   
    return(
        
        <HomePage  //nhập khẩu từ file HomepageComponent.js
            //dishes
            dish={props.DISHES}
            dishesLoading={props.DISHLOADING}
            dishesErrMess={props.DISHERRORMESSAGE}

            //promotion
            promotion={props.PROMOTION}
            promoLoading={props.PROMOLOADING}
            promoErrMess={props.PROMOERRORMESSAGE}

            //Sau khi fetch dữ liệu từ server thì sửa lại là this.props.leaders.leaders.filter((leader)
            leader={props.LEADERS}
        />
    );      
}
*/

//hàm này không nằm trong class Main, nếu nằm trong thì sẽ bind(this)
const mapStateToProps = state => { //tham số state là lấy từ Redux store, xem combineReducers trả về đối tượng state chứa 4 anh nào: dishes, comments, promotions, leaders
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
    //Thông thường là return() , nhưng ở đây là return{ } trả về là props object, đượ truy cập bởi this.props.dishes
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
    fetchDishes: () => { dispatch(fetchDishes())},  //vế phải fetchDishes() là 1 thunk, dispatch giúp cho fetchDishes() available cho application
    //now where I will fetch the dishes? componentdidmount giúp fetch sau khi đối tượng Main đi vào DOM , trong life cycle của Main

    //thêm 1 dispatch cho việc reset form Contact, truy cập dispatch này bằng this.props
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}, //actions.reset là built-in , vậy "feetback là gì". The form will be named/labelled as "feedback", hover thấy công thức tham số là model, vì form là 1 đối tượng trong state nên gọi form là model. 
    //Như vậy Main có thể truyền dispatch này cho Contact thông qua props
    //Tại Contact, gắn nhãn cho form là <Form model="feedback" và onSubmit sẽ kích hoạt hàm dispatch làm reset form : this.props.resetFeedbackForm();
    //tại sao lại phải cho dispatch(actions.reset('feedback')) nằm trong 1 arrow function rồi truyền tới Contact??  vì nếu để theo kiểu gọi ham() thì hàm sẽ chạy ngay trong Main, trong khi yêu cầu hàm chỉ chạy khi submit form trong Child component là Contact
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())  //hàm dispatch được nhận từ store
})


class Main extends Component {
    constructor(props) { 
        super(props); 
    }

    componentDidMount() {
        //call/execute/invoke , this is very good time to fetch any data required for my application. Theo lý thuyết thì lúc này UI MainComponent đang invokes ActionCreator/Thunk
        this.props.fetchDishes(); //vì trước đó dispatch đã đưa hàm tạo hành động fetchDishes vào trong props fetchDishes, nên biến mới này thành hàm và được call bằng ()
        this.props.fetchComments(); //sau khi Main vào DOM thì Comments cũng được nhận từ server, do đó khi người dùng navigate tới DishDetailsComponent see4 không cần xét Comment có isLoading hay không vì đã có rồi
        this.props.fetchPromos();
    }

    render(){
       
        console.log(this.props.dishes); //ok. Khi ở HomePage thì object này là {isLoading: true, errMess: null, dishes: Array(0)} . Xem tiếp cùng câu lệnh này tại MenuClassComponent sẽ nhận mảng 4 dishes
        console.log(this.props.promotions); //ok
        console.log(this.props.leaders); //ok
        console.log(this.props.comments);//ok
        console.log(this.props.addComment); //ok!
        /*
        const DishWithId = ({match}) => { 
            //thuộc tính thứ ba là addComment sẽ giúp component DishDetails gián tiếp gửi được thông tin user has submitted tới Store thông qua Action Creator và Action
            return(
                <DishDetails 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment}
                
                />
            );
        };
        */

        return(
            //https://stackoverflow.com/questions/50290408/how-to-use-react-ga-with-hashrouter
                /// Warning: < HashRouter> ignores the history prop.
                /// https://www.hkinfosoft.com/blog/dynamic-transitions-with-react-router-and-react-transition-group/
                    //// thực ra this.props.location By default, a switch uses history.location to select the route to render. However you can provide a location prop to the switch that will override the default history.location value
                /// https://tech.lalilo.com/dynamic-transitions-with-react-router-and-react-transition-group
            // thuộc tính của component Switch
                /// <Switch location={{location}}là cách extract destructure biến location từ props https://www.freecodecamp.org/news/the-basics-of-destructuring-props-in-react-a196696f5477/
                /// tương đương với <Switch location={this.props.location} trong tài liệu Reading của Coursera
                /// tuy nhiên Muppala không viết location cho Switch cũng ok

                //
                <div>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Header/>
                        </CSSTransition>
                    </TransitionGroup>
                    

                     
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch location={this.props.location}>
                                <Route exact path='/' component={()=>(
                                    <HomePage
                                        DISHES={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                                        DISHLOADING={this.props.dishes.isLoading}
                                        DISHERRORMESSAGE={this.props.dishes.errMess}

                                        PROMOTION={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                                        PROMOLOADING={this.props.promotions.isLoading}
                                        PROMOERRORMESSAGE={this.props.promotions.errMess}

                                        LEADERS={this.props.leaders.filter((leader) => leader.featured)[0]}
                                    />
                                )} /> 
                                <Route exact path='/aboutus' component={() => <AboutUs leaders={this.props.leaders} />} />
                                <Route exact path='/menu' component={() => <MenuClassComponent dishes={this.props.dishes.dishes} message={<b style={{color:'orange'}}>thêm param 0,1,2,3 trên URL, hoặc click hình món ăn để xem chi tiết món ăn</b>}/>} />
                                <Route path='/menu/:dishId' component={({match})=><DishDetails   //không phải gọi DishDetails bình thường mà phải cho nó vào 1 hàm nhận tham số match
                                     dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                                     isLoading={this.props.dishes.isLoading}
                                     errMess={this.props.dishes.errMess}
                                     comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                                     commentsErrMess={this.props.comments.errMess}
                                     addComment={this.props.addComment}
                                />} />
                                <Route exact path='/contactus' component={()=><ContactTranTienDat resetFeedbackForm={this.props.resetFeedbackForm}/> } />
                                <Redirect to="/" />    
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>    
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