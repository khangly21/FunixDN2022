import React, { Component } from 'react'; 
import { BrowserRouter, Link, HashRouter } from 'react-router-dom';
import {Media,Breadcrumb,BreadcrumbItem,Navbar,NavLink,NavItem,NavbarBrand,NavbarToggler,Collapse,Nav} from 'reactstrap';
//import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'; không hỗ trợ
//import Breadcrumb from 'react-bootstrap/Breadcrumb';   //đã import nhưng react-bootstrap bị lỗi
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

        const input_field=(
           
            <div>
                
                <input type="text" placeholder="enter name" onChange={this.handleInputChanged} />
               
                <button onClick={() => this.props.onChangeInValueInput(this.state.currentInputValue)}>
                    Double click please
                </button>
            </div>
            
        )

         
        const mang_Nut_va_Hinh_nhan_vien=mang_cac_doi_tuong_nhan_vien.map(
            (nhan_vien)=>{
                
                var DOB = new Date(nhan_vien.doB);  //object  
                var enterDate=new Date(nhan_vien.startDate);
                
                let dateForma_dd_mm_yyyy=DOB.toLocaleDateString('en-GB', {
                    month: '2-digit',day: '2-digit',year: 'numeric'})
             

                let enterCompanyDate=enterDate.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})

               //tạm chưa xác định Phòng ban: <em>{nhan_vien.department.departmentId}</em> <br/>
                const Chuoi_JSX_employee_details=(
                    <span key={nhan_vien.id} style={{backgroundColor:'yellow'}}>
                        Họ và tên: <em>{nhan_vien.name}</em> <br/>
                        Ngày sinh: <em>{dateForma_dd_mm_yyyy}</em> <br/>
                        Ngày vào công ty: <em>{enterCompanyDate}</em>  <br/>
                         


                        Số ngày nghỉ còn lại: <em>{nhan_vien.annualLeave}</em> <br/>
                        Số ngày đã làm thêm: <em>{nhan_vien.overTime}</em>
                    </span>
                    
                
                )


                //tạm chưa xác định Phòng ban: <em>{nhan_vien.department.name}</em> <br/> 
                const Chuoi_JSX_employee_Hinh_and_details=(
                   
                    <div className="container">
                        <nav aria-label="breadcrumb" style={{backgroundColor:"black"}}>  
                             
                                    <span ><a href="/">Cake Company</a> </span>  
                                    <Link className="navitem_css" exact to="/nhan_vien" onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  >/ Nhân viên</Link>
                                    <span>  
                                        / {nhan_vien.name}
                                    </span>  
                            
                        </nav>  
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12">
                                <Media style={{width:"10vw"}} object src={nhan_vien.image} alt={nhan_vien.name}/>
                            </div>

                            <div className="col-lg-9 col-md-8 col-sm-12">
                                Họ và tên: <em>{nhan_vien.name}</em> <br/>
                                Ngày sinh: <em>{dateForma_dd_mm_yyyy}</em> <br/>
                                Ngày vào công ty: <em>{enterCompanyDate}</em>  <br/>
                                


                                Số ngày nghỉ còn lại: <em>{nhan_vien.annualLeave}</em> <br/>
                                Số ngày đã làm thêm: <em>{nhan_vien.overTime}</em>                             
                            </div>
                        </div>
                    </div>
                    
                )

                
                return(
                    // NavLink sau không biết để làm gì, vì hiển thị chi tiết nhận viên bằng hàm advanced_generat_employee_list_with_button
                    <div style={{textAlign:"center"}}>
                      
                        <NavItem>
                            <NavLink style={{fontSize:"8px",color:"black"}} to={{pathname:`/nhan_vien/${nhan_vien.id}`}} className="navitem_css"  onClick={()=>this.props.onClick_to_image_of_employee_to_get_more_facts(Chuoi_JSX_employee_Hinh_and_details)} >
                                <Media  style={{width:"14vw"}} object src={nhan_vien.image} alt={nhan_vien.name}/>
                            </NavLink> 
                        </NavItem>    

                        <button key={nhan_vien.id} onClick={()=>this.props.Button_event_handler_lay_chi_tiet_nhan_vien(Chuoi_JSX_employee_details)} id="nut_nhan_vien">{nhan_vien.name}</button>
                    </div>
                    
                )
            }
        )
 
       

        //PHÒNG BAN
           ///chỉ sử dụng máy chủ /departments 
        console.log("Mảng các Phòng ban",mang_cac_doi_tuong_phong_ban);

        const Mang_thong_tin_ve_phong_ban=mang_cac_doi_tuong_phong_ban.map(
            (phong_ban)=>{
                //trích thông tin
                    var ten_phong_ban= phong_ban.name ;
                    var So_luong_nhan_vien_trong_phong_ban=phong_ban.numberOfStaff;
                //xuất
                return(
                    
                        <div className="proportion_according_to_screen_size">
                            <div className="boxes">
                               <h1>{ten_phong_ban}</h1>
                               <p>Số lượng nhân viên: {So_luong_nhan_vien_trong_phong_ban}</p>
                            </div>
                        </div>
                        
                )
                
            }
        )

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
                            <BreadcrumbItem active >  
                                <Link to="/">Cake Company</Link> 
                            </BreadcrumbItem>   

                            
                            <BreadcrumbItem>  
                                Bảng lương
                            </BreadcrumbItem>  
                        </Breadcrumb>
                             
                    
                        <div>
                            
                            {Mang_thong_tin_ve_bang_luong}
                           
                        </div>  
                    </div>
                    
                )

                var Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent=(
                    <div>
                        
                        <div className="grid-container">

                            {mang_Nut_va_Hinh_nhan_vien}

                        </div>
                        <p id="huong_dan_su_dung">Bấm vào tên hay hình của nhân viên để xem thông tin</p>
                    </div>
                )
                console.log(typeof(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent));

                

                var Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent=(
                   
                    <div className="container">
                        <Breadcrumb>  
                            <BreadcrumbItem><a href="/"> Cake Company </a></BreadcrumbItem>  
                            <BreadcrumbItem active >  Phòng ban  </BreadcrumbItem>  
                        </Breadcrumb>

                        <div>
                        
                            {Mang_thong_tin_ve_phong_ban}
                       
                        </div>
                    </div>
                    
                    
                )

                var Chuoi_HTML_thu_nghiem="<h2>Hello khang</h2>"; 
                console.log(typeof(Chuoi_HTML_thu_nghiem));

                var Chuoi_HTML_dau_vao_bodyComponent=`
                    <div>
                        <div className="grid-container">
                            ${mang_Nut_va_Hinh_nhan_vien}
                        </div>
                        <p id="huong_dan_su_dung">Bấm vào Tên nhân viên, hoặc Hình ảnh để xem thông tin từng nhân viên</p>
                    </div>
                `

                console.log(typeof(Chuoi_HTML_dau_vao_bodyComponent));
        return(
            
                //Dùng NavLink cho đồng nhất với các components của reactstrap, vì Link là của react-router-dom
                //chỉ có Route mới có exact path="", còn Link hay NavLink không có exact to=""
                //NavbarBrand có sẵn href, nên không cần Link to="" bên trong 
                //vấn đề với Nav: https://stackoverflow.com/questions/52545074/navlink-react-router-dom-components-hover-not-working
                
                <Navbar dark="true" color="primary">
                    <div className="container">
                        <NavbarBrand href="#" style={{color:"white"}}>
                            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                            <Link to="/" onClick={()=>this.props.onClickonCakeCompany(Chuoi_JSX_lam_dau_vao_cua_MainComponent)}><b style={{color:"white"}}>
                                THE CAKE COMPANY</b>
                            </Link>
                        </NavbarBrand>
                        
                        <NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow',color:'brown',fontWeight:'bold'}} onClick={this.toggleNav}><i className="fa fa-arrows-v"> Menus</i></NavbarToggler>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar class="nav">
                             
                                    
                                        <NavItem>
                                            <NavLink className="inactive" to="/nhan_vien" onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  ><i className="fa fa-id-badge" aria-hidden="true"> <b>Nhân viên</b></i> </NavLink>     
                                        </NavItem>

                                    <li><NavLink className="inactive" to="/phong_ban" onClick={()=>this.props.onClickonLiDepartment(Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent)}   ><i className="fa fa-building-o" aria-hidden="true">  <b>Phòng ban</b></i></NavLink></li>
                                    <li><NavLink className="inactive" to="/bang_luong" onClick={()=>this.props.onClickonLiSalary(Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent)}><i className="fa fa-paypal" aria-hidden="true">  <b>Bảng lương</b></i> </NavLink></li>       
                              
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>  
                
                

       
                 
        )
    }
}

