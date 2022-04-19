import React, { Component } from 'react'; 
import { BrowserRouter, Link, HashRouter} from 'react-router-dom';
import {Media,Breadcrumb,BreadcrumbItem,Navbar,NavLink,NavItem,NavbarBrand,NavbarToggler,Collapse,Nav} from 'reactstrap';
//import Breadcrumb from 'react-bootstrap/Breadcrumb'//Breadscrumb của bootstrap https://react-bootstrap.github.io/components/breadcrumb/
//import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';Error ./node_modules/react-bootstrap/esm/Breadcrumb.js Module parse failed: Unexpected token (18:2)


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
    
        

        //BẢNG LƯƠNG
            //////chỉ sử dụng máy chủ /staffsSalary bởi mang_cac_doi_tuong_luong_nhan_vien, chứ không dùng mang_cac_doi_tuong_nhan_vien như thông thường
        const Mang_thong_tin_ve_bang_luong=mang_cac_doi_tuong_luong_nhan_vien.map(
            (sheet)=>{
                
                var Ten_Nhan_vien=sheet.name;
                var Ma_so_Nhan_vien=sheet.id;
                var He_so_luong_Nhan_vien=sheet.salaryScale;
                var So_ngay_lam_them=sheet.overTime/8;
                var Luong_lam_tron=Math.floor(He_so_luong_Nhan_vien*3000000+So_ngay_lam_them*200000);
             
                return(
                    <div className="responsive_to_screen_size">
                        <div className="box" style={{backgroundColor:"brown",color:"white",margin:"3px",padding:"10px"}}>
                            <h1>Bảng lương</h1>
                            <h3>{Ten_Nhan_vien}</h3>
                            <p>Mã nhân viên: <b>{Ma_so_Nhan_vien}</b></p>
                            <p>Hệ số lương: <b>{He_so_luong_Nhan_vien}</b></p>
                            <p>Số ngày làm thêm: <b>{So_ngay_lam_them}</b></p>
                            <div className="sub_box" style={{backgroundColor:"paleturquoise",color:"orangered"}}>
                                <p>Lương:{Luong_lam_tron}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        )

                var Chuoi_JSX_lam_dau_vao_cua_MainComponent="";
                
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

                let Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent="clicked";
                let Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent="clicked";
                
        return(
            
                //Dùng NavLink cho đồng nhất với các components của reactstrap, vì Link là của react-router-dom
                //chỉ có Route mới có exact path="", còn Link hay NavLink không có exact to=""
                //NavbarBrand có sẵn href, nên không cần Link to="" bên trong 
                //vấn đề với Nav: https://stackoverflow.com/questions/52545074/navlink-react-router-dom-components-hover-not-working
                // NavLink to "nhan_vien" chỉ hoạt động khi có  
                <Navbar dark="true" color="primary">
                    <div className="container">
                        <NavbarBrand href="#" style={{color:"white"}}>
                            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                            <NavLink to="/" onClick={()=>this.props.onClickonCakeCompany(Chuoi_JSX_lam_dau_vao_cua_MainComponent)}><b style={{color:"white"}}>
                                THE CAKE COMPANY</b>
                            </NavLink>
                        </NavbarBrand>
                        
                        <NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow',color:'brown',fontWeight:'bold'}} onClick={this.toggleNav}><i className="fa fa-arrows-v"> Menus</i></NavbarToggler>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar class="nav">
                                <NavItem>
                                    <NavLink 
                                        className="inactive" to="/nhan_vien" onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  > <i className="fa fa-id-badge" aria-hidden="true"> </i> <b>Nhân viên </b>
                                    </NavLink>     
                                </NavItem>
                                <NavItem> 
                                    <NavLink className="inactive" to="/phong_ban" onClick={()=>this.props.onClickonLiDepartment(Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent)}   ><i className="fa fa-building-o" aria-hidden="true">  <b>Phòng ban</b></i></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="inactive" to="/bang_luong" onClick={()=>this.props.onClickonLiSalary(Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent)}><i className="fa fa-paypal" aria-hidden="true">  <b>Bảng lương</b></i> </NavLink>     
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>  
        )
    }
}

