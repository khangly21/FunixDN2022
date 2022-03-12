class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedDish:null
        }
        this.onDishSelect=this.onDishSelect.bind(this);
        this.renderDish=this.renderDish.bind(this);
        //this.Ham_tao_JSX_cac_mon_trong_menu=this.Ham_tao_JSX_cac_mon_trong_menu.bind(this);  //vế trái màu vàng do vế phải là arrow function
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

    //tham số hàm của map()  
    Ham_tao_JSX_cac_mon_trong_menu=(dish)=>{
        //Warning: each child in the list should have a unique "key" props  => phải key={dish.id} cho div
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                
                <Reactstrap.Card key={dish.id}
                    //do callback của sự kiện onClick có 1 tham số nên phải gọi hàm Ten_ham() sẽ được 1 hàm khác bao bọc. Nếu no param thì chỉ {Ten_ham} nghĩa là nhúng toàn bộ hàm vào 
                    onClick={() => this.onDishSelect(dish)}>
                    <Reactstrap.CardImg width="100%" src={dish.image} alt={dish.name} />
                    <Reactstrap.CardImgOverlay>
                        <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
                    </Reactstrap.CardImgOverlay>
                </Reactstrap.Card>

            </div>
        )
    }

    render() {
        //JSX element
        console.log(this.props.dishes); //ok, lấy được mảng 4 phần tử
        //callback của hàm map có 1 tham số

        //do props.dishes không đổi (Lý thuyết là props được nhận từ bên Parent tới nên không đổi, do đó state đổi nhưng luôn hiển thị 4 hình), còn state là đối tượng chứa dữ liệu của Component nên có thể đổi
        const menu=this.props.dishes.map(this.Ham_tao_JSX_cac_mon_trong_menu); //trong các hình nếu onClick 1 hình thì sẽ hiện thông tin về hình đó

        //return 
        
        if(this.state.selectedDish != null) {
            return(
                //JAX con thứ nhất là {menu}
                //nếu JSX con thứ hai (chỉ hiện sau khi nhấn 1 tấm hình) là {this.state.selectedDish} thì Objects are not valid as a React child (found: object with keys {id, name, image, category, label, price, description, comments}). If you meant to render a collection of children, use an array instead.
                //https://stackoverflow.com/questions/40298136/how-to-call-a-function-inside-a-render-in-react-jsx
                //https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu
                //The problem is that you're invoking the function immediately and then what's left is the return value, which might not be a function!
                     ///What you can do instead is wrap that function call inside an arrow function to solve your problem. It'll call the inner function once you onClick
                
                <div className="container">
                    <div className="row">     
                        {menu}
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1" onClick>
                            {this.state.selectedDish.id}
                            {this.renderDish(this.state.selectedDish)}
                        </div>
                    </div>
                </div>
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