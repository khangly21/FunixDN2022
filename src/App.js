/*
//Cách 1: dùng Function Component (thì sẽ không có state)
    function App() {
      //render <Menu/> sẽ gặp Error: Media is not defined
      //https://stackoverflow.com/questions/49081549/passing-object-as-props-to-jsx
        return (
            <div>
               <Menu dishes={DISHES}/>
            </div>
        );
    }
*/


//Bài giảng Coursera:

/*

//Cách 2: Class component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
}

//Error: App(...): No `render` method found on the returned component instance: you may have forgotten to define `render`
*/

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
        <Menu 
            cac_mon_an_gui_Menu={this.state.dishes}

            //https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/
            ham_callback_mot_tham_so_dishId_nhan_tu_Menu={(dishId)=>this.onDishSelect(dishId)}  //vế phải là 1 hàm
        />
      </div>
    )
  }
}

//exports is not defined (vì không có create-react-app)
//App.exports;
//React.exports =App;


