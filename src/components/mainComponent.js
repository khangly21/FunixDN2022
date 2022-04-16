import React, { Component } from 'react'; //để dùng RJX 

import HeaderClassComponent from './secondaryComponent/headerComponent';
import Footer_ResponsiveGrid_CSSBootstrap5 from './secondaryComponent/footerComponent';

import WebBody_of_Employees from './secondaryComponent/BodyComponent/employeeBodyComponent';
import WebBody_of_Departments from './secondaryComponent/BodyComponent/departmentBodyComponent';
import WebBody_of_Salaries from './secondaryComponent/BodyComponent/salaryBodyComponent';
import WebBody_of_EmployeeDetail from './secondaryComponent/BodyComponent/oneEmployeeDetailBodyComponent';
import WebBody_of_InputEmployeeName from './secondaryComponent/BodyComponent/inputEmployeeNameBodyComponent';

import Chi_tiet_nhan_vien from './secondaryComponent/employeeDetails';

import {STAFFS} from '../../src/shared/company.jsx';
import {DEPARTMENTS} from '../../src/shared/company.jsx';
import { Switch, Route, Redirect ,withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {fetchStaffs} from '../redux/Action_Creators/asynchronous/staff_Thunk';


export const mapStateToProps = state => {//Hàm  mapStateToProps được gọi mỗi khi state trong store thay đổi, đầu vào là global state của store?
    //trả về đối tượng props chứa 3 thuộc tính, VD this.props.staffs
    return{
        staffs:state.staffs_Reducer, //làm sao có reference từ state.staffs_Reducer tới Store.js?
        departments:state.departments_Reducer,
        staffsWage:state.staffsSalary_Reducer
    }
}

export const mapDispatchToProps=(dispatch)=>(//HÀM nhận dispatch 
    //và trả về đối tượng props chứa hàm fetchStaffs , VD this.props.fetchStaffs() được kích hoạt khi đối tượng Main được tải vào DOM's node componentDidMount()
    {
        fetchStaffs: () => {
            dispatch(fetchStaffs());
        },
    }   
)


class Main extends Component { //không export default class Main, mà phải export default withRouter cho connectedMain
    constructor(props) {
        super(props);
        this.state={
            staffs:STAFFS,
            departments:DEPARTMENTS,

            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:"",
            Chuoi_JSX_tat_ca_Bang_luong:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Ma_so_nhan_vien_duoc_chon:null, 
        
            inputEmployeeName:"chưa có gì" 
        };


        this.onReceive_JSX_Nhanvien_from_HeaderClassComponent=this.onReceive_JSX_Nhanvien_from_HeaderClassComponent.bind(this);
        this.onReceive_JSX_Phongban_from_HeaderClassComponent=this.onReceive_JSX_Phongban_from_HeaderClassComponent.bind(this);
        this.onReceive_JSX_BangLuong_from_HeaderClassComponent=this.onReceive_JSX_BangLuong_from_HeaderClassComponent.bind(this);
        
        this.receiveEmployeeDetails=this.receiveEmployeeDetails.bind(this);
        
        this.onReceive_JSX_CakeCompany_from_HeaderClassComponent=this.onReceive_JSX_CakeCompany_from_HeaderClassComponent.bind(this);
        this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent=this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent.bind(this);
        
        this.onReceive_JSX_EmployeeSearchByName_from_HeaderClassComponent=this.onReceive_JSX_EmployeeSearchByName_from_HeaderClassComponent.bind(this);
    }

    //sau khi mapDispatchToProps thì Main có thể gọi hàm componentDidMount để lấy dữ liệu về cùng lúc fetchStaffs()
    componentDidMount(){
        this.props.fetchStaffs();
    }


    onReceive_JSX_EmployeeSearchByName_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            inputEmployeeName:Chuoi_JSX
        })
        console.log("this.state.inputEmployeeName sau khi nhập Ten nhan vien cần tìm ở HeaderClassComponent: ",this.state.inputEmployeeName); //ok
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"", 
            Chuoi_JSX_tat_ca_Phong_ban:"", 
            Chuoi_JSX_tat_ca_Bang_luong:"", 
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
    }

   
    onReceive_JSX_Nhanvien_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:Chuoi_JSX, 
            Chuoi_JSX_tat_ca_Phong_ban:"", 
            Chuoi_JSX_tat_ca_Bang_luong:"", 
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
        console.log("state Chuoi_JSX toàn nhân viên hiện tại: ",this.state.Chuoi_JSX_tat_ca_Nhan_vien)
    }

    onReceive_JSX_Phongban_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:Chuoi_JSX, 
            Chuoi_JSX_tat_ca_Bang_luong:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
    }

    onReceive_JSX_BangLuong_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:"", 
            Chuoi_JSX_tat_ca_Bang_luong:Chuoi_JSX,
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
    }

    onReceive_JSX_CakeCompany_from_HeaderClassComponent(Chuoi_JSX){
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:"", 
            Chuoi_JSX_tat_ca_Bang_luong:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
    }

    onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent(Chuoi_JSX){
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:"", 
            Chuoi_JSX_tat_ca_Bang_luong:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:Chuoi_JSX,
        })
    }


    receiveEmployeeDetails(Chuoi_JSX) {
        this.setState({Chuoi_JSX_chi_tiet_Nhan_vien:Chuoi_JSX});
        console.log("this.state.Chuoi_JSX_chi_tiet_Nhan_vien sau khi click button Ten nhan vien ở HeaderClassComponent: ",this.state.Chuoi_JSX);
    }

 
    render(){
        console.log("Chuoi_JSX_sau_khi_click_menuNhan_vien_o_HeaderClassComponent: ",this.state.Chuoi_JSX_tat_ca_Nhan_vien);
        console.log(this.state.staffs.filter((staff) => staff.id === this.state.Ma_so_nhan_vien_duoc_chon)[0]);  

            return(

                //làm sao không có báo lỗi <Route path="/nhan_vien" component={<WebBody_of_Employees departments={this.state.departments} staffs={this.state.staffs}  data={this.state.Chuoi_JSX_tat_ca_Nhan_vien} />} />
                //xem bài TranTienDat có dùng Route path, còn bài này không dùng Route path, chỉ dùng Link trong SPA
                    ///https://codesandbox.io/s/asm3-msqopy?file=/src/components/MainComponent.js:404-463
                <div>
                    <HeaderClassComponent 
                        departments={this.state.departments} 
                        staffs={this.state.staffs} 
                        inputValue={this.state.inputEmployeeName}

                        onClickonLiEmployee={(Chuoi_JSX)=>this.onReceive_JSX_Nhanvien_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiDepartment={(Chuoi_JSX)=>this.onReceive_JSX_Phongban_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiSalary={(Chuoi_JSX)=>this.onReceive_JSX_BangLuong_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonCakeCompany={(Chuoi_JSX)=>this.onReceive_JSX_CakeCompany_from_HeaderClassComponent(Chuoi_JSX)}
                        onClick_to_image_of_employee_to_get_more_facts={(Chuoi_JSX)=>this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent(Chuoi_JSX)}
                        onChangeInValueInput={(Chuoi_JSX)=>this.onReceive_JSX_EmployeeSearchByName_from_HeaderClassComponent(Chuoi_JSX)}

                        Button_event_handler_lay_chi_tiet_nhan_vien={(Chuoi_JSX)=>this.receiveEmployeeDetails(Chuoi_JSX)}
                        
                    />
                    <WebBody_of_Employees departments={this.state.departments} staffs={this.state.staffs}  data={this.state.Chuoi_JSX_tat_ca_Nhan_vien} />
                    <WebBody_of_Departments data={this.state.Chuoi_JSX_tat_ca_Phong_ban}/>
                    <WebBody_of_Salaries data={this.state.Chuoi_JSX_tat_ca_Bang_luong}/>
                    <WebBody_of_EmployeeDetail data={this.state.Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien}/>
                    <WebBody_of_InputEmployeeName staffs={this.state.staffs}  Chuoi_tim_kiem={this.state.inputEmployeeName}/>
                    
                    <Chi_tiet_nhan_vien chitietnhanvien={this.state.Chuoi_JSX_chi_tiet_Nhan_vien}/>
                    <Footer_ResponsiveGrid_CSSBootstrap5/>

                    <Redirect to='/'/>
                   
                </div>
            )    
               
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //đầu ra là 1 connectMain như 1 InferableComponentEnhancerWithProps
//https://newbedev.com/what-is-withrouter-for-in-react-router-dom  , ở đây không có <Router/>