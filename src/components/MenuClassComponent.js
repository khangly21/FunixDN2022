import React from 'react'; 
import {Link} from 'react-router-dom';
import {Card,CardImg,CardImgOverlay,CardBody,CardTitle,CardSubtitle,CardText,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from "./LoadingComponent";
import {baseUrl} from '../shared/baseUrl';

class MenuClassComponent extends React.Component {
    constructor(props) { //props là mảng dishes nhận từ Main ở Route, gửi cả một đối tượng this.props.dishes   :  component={() => <Menu dishes={this.props.dishes} />
        super(props);
        this.Trinh_bay_cac_mon_trong_menu=this.Trinh_bay_cac_mon_trong_menu.bind(this);  //vế trái màu vàng do vế phải là arrow function
    }

    //tham số hàm của map() , là arrow function nên cũng không cần bind to class component 
    Trinh_bay_cac_mon_trong_menu=(dish)=>{ //map hiểu dish là 1 phần tử của dishes
        console.log(dish.id) //OK, liệt kê toàn bộ 4 dish.id
        return(
            //column .col-12 col-md-5 m-1 của row
            //chú ý <Reactstrap.Card body> là ok, còn <Reactstrap.CardBody> </Reactstrap.CardBody> là undefined type khi đi vào hàm React.createElement(type,classNamr,children)
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card key={dish.id} 
                    //onClick={() => this.props.onClick(dish.id)}
                >
                    <Link to={`/menu/${dish.id}`}>
                         <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                         <CardImgOverlay>
                             <CardTitle>{dish.name}</CardTitle>
                         </CardImgOverlay>
                    </Link>
                    
                </Card>
            </div>
        )
    }

    //render() là hàm bắt buộc có trong Component LifeCycle, và render() sẽ nhận tất cả các hàm mà return(Chuoi_JSX). Hàm thì bắt buộc chứa return()
    render() {
        //Nhận props.dishes từ Main và áp dụng map()
        //nhận props.onClick từ Main và áo dụng cho callback của hàm map()
        console.log(this.props.dishes); //mảng 4 món ăn => OK
        const menu=this.props.dishes.map(this.Trinh_bay_cac_mon_trong_menu);
        const message=this.props.message;
        console.log(menu);
        //https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/

        //do {message} đã có b tag, thì return này b sẽ tăng độ đậm
        return(
            <div className="container">
                <b>{message}</b>
                <div className="row">             
                    {menu}
                </div>
            </div>
            
        ) 
    }
}

export default MenuClassComponent;