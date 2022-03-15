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
                <div>
                    <Reactstrap.Navbar color="success" light>
                         <div className="container">
                             <Reactstrap.NavbarBrand href="/" style={{color: 'red'}}>Functional Menu</Reactstrap.NavbarBrand>
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
            )
        }else{
            return(
                <div>
                    <Reactstrap.Navbar dark color="primary">
                         <div>
                             <Reactstrap.NavbarBrand href="/" style={{color:"white"}}>Class component Menu</Reactstrap.NavbarBrand>
                         </div>
                    </Reactstrap.Navbar>
    
                    <Header/>
                    <MenuClassComponent
                        dishes={this.state.dishes}
                        onClick={(dishId) => this.onDishSelect(dishId)}
                    />
                    <Footer/>
                </div>
            
            )
        }
        
    }
}

