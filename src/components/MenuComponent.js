class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dishes:DISHED_ON_MENU
        }
    }
    
    //dùng arrow function thì this được tìm hiểu context của nó là gì, không phải hàm thì là class Menu, nên không cần bind() vào class component component
    Ham_tao_JSX_cac_mon_trong_menu=(dish)=>{
        //https://www.w3schools.com/react/react_es6_arrow.asp
        //ES6 arrow function có thể có keyword "return" hoặc cũng có thể bỏ qua "return", nhưng JSX bắt buộc có return, nếu không có return thì mảng menu tạo từ map sẽ có các phần tử toàn undefined
        //A key is a special string attribute you need to include when creating lists of elements.
        //Keys help react identify which elements have changed, have been deleted or added. It gives the elements in the array a stable identity. (https://dev.to/nibble/passing-jsx-key-attribute-to-elements-in-react-5c58)
        //dùng tag Reactstrap.Media của reactstrap, nếu không Error: Media is undefined
        return(
            <div key={dish.id} className="col-12 mt-5">

                 <Reactstrap.Media tag="li">
                     <Reactstrap.Media left middle>
                         <Reactstrap.Media object src={dish.image} alt={dish.name}/>
                     </Reactstrap.Media>
     
                     <Reactstrap.Media body className="ml-5">
                         <Reactstrap.Media heading>{dish.name}</Reactstrap.Media>
                         <p>{dish.description}</p>
                     </Reactstrap.Media>
                 </Reactstrap.Media>   
                  
            </div>
        )
        
    }

    render() {
        //dùng hàm map để duyệt mảng dishes
        //map() creates a new array from calling a function for every array element, and map does not change the original array  
        //array.map(function(currentValue, index, arr), thisValue)
        //chú ý: map(ten_ham)  <- đang nhúng nguyên 1 hàm vào làm tham số
            /// chứ không phải gọi hàm map(ten_ham())
        /*
            
        */
        const menu=this.state.dishes.map(this.Ham_tao_JSX_cac_mon_trong_menu); //không có this. là Ham_tao_JSX_cac_mon_trong_menu is not defined
        console.log(menu); //Ham_tao_JSX_cac_mon_trong_menu mà không có return bọc JSX code thì mảng menu toàn các phần tử undefined

        //Reactstrap's media component is used to add some media to our project.
        return(
            <div className="container">
                <div className="row">     
                    <Reactstrap.Media list>
                        {menu}      
                    </Reactstrap.Media>
                </div>
            </div>
        )
    }
}