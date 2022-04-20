import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import {Media,Breadcrumb,BreadcrumbItem,Navbar,NavItem,NavbarBrand,NavbarToggler,Collapse,Nav} from 'reactstrap';
//import Breadcrumb from 'react-bootstrap/Breadcrumb'//Breadscrumb của bootstrap https://react-bootstrap.github.io/components/breadcrumb/
//import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';Error ./node_modules/react-bootstrap/esm/Breadcrumb.js Module parse failed: Unexpected token (18:2)

//very important, NavLink must be from react-router-dom , not reactstrap
import {NavLink} from 'react-router-dom';
export default class HeaderClassComponent extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false, 
            currentInputValue:"" 
        };
        this.toggleNav = this.toggleNav.bind(this);
      
        this.handleInputChanged=this.handleInputChanged.bind(this);
    }

    handleInputChanged(event) {
        this.setState({
            currentInputValue: event.target.value
        });
        console.log("giá trị của currentInputValue: ", this.state.currentInputValue); 
     
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
 

    render(){
        //nhận dữ liệu từ MainComponent
        const mang_cac_doi_tuong_nhan_vien=this.props.staffs;
        const mang_cac_doi_tuong_phong_ban=this.props.departments;
        const mang_cac_doi_tuong_luong_nhan_vien=this.props.staffsWage;
     
        //test NHÂN VIÊN và PHÒNG BAN:
        console.log("Mảng các nhân viên",mang_cac_doi_tuong_nhan_vien); // ok
        console.log("Mảng các phòng ban",mang_cac_doi_tuong_phong_ban); // ok, sẽ giúp tạo Chuoi_JSX đầu vào của departmentBodyComponent.js
        console.log("Mảng các bảng lương Nhân viên",mang_cac_doi_tuong_luong_nhan_vien); //ok
    
    /*
                var Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent=(
                    //dùng a sẽ load toàn trang
                    //Khi inspect, <a to="/">Cake Company</a> tương đương <a href="/">Cake Company</a>
                    <div className="container">
                        
                        <Breadcrumb>  
                            <BreadcrumbItem >  
                                <Link to="/">Cake Company</Link> 
                            </BreadcrumbItem>   
                            
                            <BreadcrumbItem active>  
                                Bảng lương
                            </BreadcrumbItem>  
                        </Breadcrumb>
                             
                    
                        <div>
                            
                            {Mang_thong_tin_ve_bang_luong}
                           
                        </div>  
                    </div>
                    
                )
    */
                //let Chuoi_JSX_lam_dau_vao_cua_MainComponent="";
                //let Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent="clicked";
                //let Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent="clicked";
                
        return(
                //cấu trúc Nav theo https://www.geeksforgeeks.org/reactjs-reactstrap-navbar-component/
                //<NavbarBrand href="#"  vì sẽ có dấu # ở http://localhost:3000/#
                <Navbar dark="true" color="primary">
                    <div className="container">
                        <NavbarBrand style={{color:"white"}}>
                            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                            <NavLink className="nav-link" to="/" ><b style={{color:"white"}}>
                                THE CAKE COMPANY</b>
                            </NavLink>
                        </NavbarBrand>
                        
                        <NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow',color:'brown',fontWeight:'bold'}} onClick={this.toggleNav}><i className="fa fa-arrows-v"> Menus</i></NavbarToggler>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar class="nav">
                                <NavItem>
                                    <NavLink 
                                        className="nav-link" to="/nhan_vien"  > <i className="fa fa-id-badge" aria-hidden="true"> </i> <b>Nhân viên</b>
                                    </NavLink>     
                                </NavItem>

                                <NavItem> 
                                    <NavLink className="nav-link" to="/phong_ban" ><i className="fa fa-building-o" aria-hidden="true"></i> <b>Phòng ban</b></NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/bang_luong"><i className="fa fa-paypal" aria-hidden="true"></i>  <b>Bảng lương</b> </NavLink>     
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>  
        )
    }
}

//<NavLink className="nav-link inactive" to="/home" onClick={()=>this.props.onClickonCakeCompany(Chuoi_JSX_lam_dau_vao_cua_MainComponent)}><b style={{color:"white"}}>

/*
    <NavLink 
        className="nav-link inactive" to="/nhan_vien" onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  > <i className="fa fa-id-badge" aria-hidden="true"> </i> <b>Nhân viên </b>
    </NavLink>   
*/
/*
    <NavLink 
         className="nav-link inactive" to="/nhan_vien" onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  > <i className="fa fa-id-badge" aria-hidden="true"> </i> <b>Nhân viên </b>
    </NavLink>   
*/

/*
    <NavLink className="nav-link inactive" to="/phong_ban" onClick={()=>this.props.onClickonLiDepartment(Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent)}   ><i className="fa fa-building-o" aria-hidden="true">  <b>Phòng ban</b></i></NavLink>
*/ 

/*
    <NavLink className="nav-link inactive" to="/bang_luong" onClick={()=>this.props.onClickonLiSalary(Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent)}><i className="fa fa-paypal" aria-hidden="true">  <b>Bảng lương</b></i> </NavLink>   
*/