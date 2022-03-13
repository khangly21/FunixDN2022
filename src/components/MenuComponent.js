


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDish:null
        }
        this.onDishSelect=this.onDishSelect.bind(this);
        this.renderDish=this.renderDish.bind(this);
        this.Ham_tao_JSX_cac_mon_trong_menu=this.Ham_tao_JSX_cac_mon_trong_menu.bind(this);  //vế trái màu vàng do vế phải là arrow function
    }

    //định nghĩa hàm đứng trước bind()
    onDishSelect(dish) {
        this.setState(
            {selectedDish:dish}
        );
    }
    
    //khi có sự kiện onClick thì hàm này mới hoạt động và render dish.description
    //dùng arrow function thì this được tìm hiểu context của nó là gì, không refers to hàm thì this sẽ refers to class Menu, nên không cần bind() vào class component component
    renderDish(dish){ //tham số là 1 object
        console.log(dish); //khi chưa chọn hình nào thì là null lúc load page => cần sửa lại chỉ chừng nào Click hình mới chạy hàm này
        //viết rẽ nhánh các return để tạo Chuoi_JSX
        if(dish!=null){
            console.log("yAY,a dish is selected");

            //thay vì dùng các thẻ của Reactstrap, thì dùng div cũng được
            //thay từng div bằng Reactstrap để theo dõi lỗi, thấy báo lỗi ngay chỗ Reactstrap.CardBody
               /// Solution: xem lại trong https://reactstrap.github.io/
               /// React.CardImgOverlay cũng invalid
               /// <React.Card body></React.Card> cùng cấp với CardImg cũng invalid
            //div src={dish.image} alt={dish.name} thì không tạo ra hình lặp lại như Reactstrap.Img
            
            return(
                <Reactstrap.Card  body>
                    <Reactstrap.CardImg src={dish.image} alt={dish.name}/>
                    <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                    <Reactstrap.CardText>{dish.description}</Reactstrap.CardText>
                </Reactstrap.Card>
            );
        }else {
            return(
                <div></div>
            );
        }
    }

    //tham số hàm của map() , là arrow function nên cũng không cần bind to class component 
    Ham_tao_JSX_cac_mon_trong_menu=(dish)=>{ //map hiểu dish là 1 phần tử của cac_mon_an_gui_Menu
        //Warning: each child in the list should have a unique "key" props  => phải key={dish.id} cho div
        /*
            const nameList = names.map((name) =>  
                <li>{name}</li>  
            );  
        */
        console.log(dish.id)
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                
                <Reactstrap.Card key={dish.id}
                    //https://upmostly.com/tutorials/react-onhover-event-handling-with-examples
                    //onClick={()=>this.props.ham_callback_mot_tham_so_dishId_nhan_tu_Menu(dish.id)}


                    //do callback của sự kiện onClick có 1 tham số nên phải gọi hàm Ten_ham() sẽ được 1 hàm khác bao bọc. Nếu no param thì chỉ {Ten_ham} nghĩa là nhúng toàn bộ hàm vào 
                    onClick={() => this.onDishSelect(dish)}  //OK! onDishSelect là hàm callback, được gọi sau khi tất cả hình load hết và có onClick event xảy ra , khi callback chạy thì state của đối tượng Menu được cập nhật, dẫn tới re-render div#more_details
                    //onClick={this.renderDish}   SAI. 1/renderDish là hàm nhận 1 tham số nên không ghi tên hàm được 2/ Phải gọi hàm onDishSelect(dish) trước
                    >
                    <Reactstrap.CardImg width="100%" src={dish.image} alt={dish.name} onClick={()=>this.props.ham_callback_mot_tham_so_dishId_nhan_tu_Menu(dish.id)}/>
                    <Reactstrap.CardImgOverlay>
                        <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                    </Reactstrap.CardImgOverlay>
                </Reactstrap.Card>

            </div>
        )
    }

    //hàm render của đối tượng Menu, mỗi khi onClick vào hình ảnh thì Menu's state thay đổi, nên phải re-render lần nữa
    //render() là hàm bắt buộc có trong Component LifeCycle, và render() sẽ nhận tất cả các hàm mà return(Chuoi_JSX). Hàm thì bắt buộc chứa return()
    render() {
        //JSX element
        console.log(this.props.cac_mon_an_gui_Menu); //ok, lấy được mảng 4 phần tử từ class cha là App gửi tới
        //callback của hàm map có 1 tham số

        //do props.dishes không đổi (Lý thuyết là props được nhận từ bên Parent tới nên không đổi, do đó state đổi nhưng luôn hiển thị 4 hình), còn state là đối tượng chứa dữ liệu của Component nên có thể đổi
        const menu=this.props.cac_mon_an_gui_Menu.map(this.Ham_tao_JSX_cac_mon_trong_menu); //vì sao hàm Ham_tao_JSX_cac_mon_trong_menu có 1 param mà ghi function name được
        //trong các hình nếu onClick 1 hình thì sẽ hiện thông tin về hình đó

        //return theo các điều kiện rẽ nhánh có nhận được đối tượng dish hay không
        if(this.state.selectedDish != null) {
            
            return(
                //JAX con thứ nhất là {menu}
                //nếu JSX con thứ hai (chỉ hiện sau khi nhấn 1 tấm hình) là {this.state.selectedDish} thì Objects are not valid as a React child (found: object with keys {id, name, image, category, label, price, description, comments}). If you meant to render a collection of children, use an array instead.
                //https://stackoverflow.com/questions/40298136/how-to-call-a-function-inside-a-render-in-react-jsx
                //https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu
                //The problem is that you're invoking the function immediately and then what's left is the return value, which might not be a function!
                     ///What you can do instead is wrap that function call inside an arrow function to solve your problem. It'll call the inner function once you onClick
                //https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/
                <div className="container">
                    <div className="row">     
                        {menu}
                    </div>
                    

                    <div id="more_details" className="row">
                        <div className="col-12 col-md-5 m-1">
                            STT: {this.state.selectedDish.id}
                            {this.renderDish(this.state.selectedDish)}
                        </div>

                        <div className="col-12 col-md-5 m-1" style={{paddingTop:'2vw'}}>
                            <h2>Comments on this dish:</h2>
                            <DishDetails mon_duoc_chon={this.state.selectedDish}/>
                        </div>
                        
                    </div>
                </div>
                // The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
               // viết style="{{ color:'red'  }}"  là sai
            );
        }else{
            return(
                <div className="row">     
                    {menu}
                </div>
            ) 
        }
        //{this.renderDish_with_JSX(this.state.selectedDish)}
    }
}

Menu.exports; //Menu.export

React.exports =Menu;
/*
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dishes: DISHES,
        selected_Dish_from_Menu:null
      };
      console.log("Mã số của món được chọn từ Menu:",this.state.selected_Dish_from_Menu); //không có this.state là selected_Dish_from_Menu undefined
      this.onDishSelect=this.onDishSelect.bind(this);
    }
  
    onDishSelect(dishId) {
  
        this.setState({selected_Dish_from_Menu:dishId});
        console.log("Mã số của món được chọn từ Menu:",this.state.selected_Dish_from_Menu);
        
    }
    
  
    render(){
      //truyền state.dishes cho Menu, và Menu nhận state của class cha với this.props.cac_mon_an
  
      //render <Menu/> và <DishDetails/>
      // DishDetails là class có chứa hàm renderDish(dish_object) do đó class App phải truyền cho class DishDetails 1 đối tượng dish được click vào => Không thể vì quy tắc là class con sẽ emits Event cho class cha , trong khi App là class cha => class con: Menu --> event with props dish --> class cha: DishDetails 
      return (
        <div>
          <WebHeader/>
          <DishDetails dishes_from_data={this.state.dishes}/>
          <Menu 
              cac_mon_an_gui_Menu={this.state.dishes}
              ham_callback_mot_tham_so_dishId_nhan_tu_Menu={(dishId)=>this.onDishSelect(2)}  //vế phải là 1 hàm
          />
        </div>
      )
    }
}

*/