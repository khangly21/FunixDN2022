class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dishes:DISHES,
            selectedDish:null  //đây là id của món ăn (không phải đối tượng) //mặc định là 0 
        };
        this.onDishSelect=this.onDishSelect.bind(this);
        this.renderDish=this.renderDish.bind(this);
    }

    

    onDishSelect(dishId) {
        this.setState({selectedDish:dishId}); //chỉ có thể được cập nhật từ <Menu/> sự kiện onClick, sau đó sẽ cập nhật props dish truyền cho <DishDetails/>
    }

    renderDish(dish){  
        console.log("yAY,a dish is selected");
        return(
            <div>
                <Reactstrap.Card  body>
                    <Reactstrap.CardImg src={dish.image} alt={dish.name}/>
                    <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                    <Reactstrap.CardText>{dish.description}</Reactstrap.CardText>
                </Reactstrap.Card>
            </div>
            
        );
        
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
                
                
                <div>
                    <Reactstrap.Navbar dark color="primary">
                         <div>
                             <Reactstrap.NavbarBrand href="/">Ristorance Con Fusion</Reactstrap.NavbarBrand>
                         </div>
                    </Reactstrap.Navbar>

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
                </div>
            )
        }else{
            return(
                <div>
                    <Reactstrap.Navbar dark color="primary">
                         <div>
                             <Reactstrap.NavbarBrand href="/">Ristorance Con Fusion</Reactstrap.NavbarBrand>
                         </div>
                    </Reactstrap.Navbar>
    
                    <Menu 
                        dishes={this.state.dishes}
                        onClick={(dishId) => this.onDishSelect(dishId)}
                    />
                </div>
            
            )
        }
        
    }
}

