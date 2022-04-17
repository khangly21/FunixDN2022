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
//define xong thì Main sẽ gọi fetchStaffs() async với componentDidMount() sẽ tăng tốc
import {fetchStaffs} from '../redux/Action_Creators/asynchronous/staff_Thunk';
import {fetchDepartments} from '../redux/Action_Creators/asynchronous/department_Thunk';
import {fetchStaffsWage} from '../redux/Action_Creators/asynchronous/staffWage_Thunk';

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
        //không có hàm này thì Erro commitLifeCycel, fetchStaffs is not a function
        fetchStaffs: () => {
            dispatch(fetchStaffs());
            dispatch(fetchStaffsWage());
        },

        //fetchDepartments() is not a function vì nó tạo ra 1 action object
        fetchDepartments:()=>{
            dispatch(fetchDepartments());
        }
    }   
)


class Main extends Component { //không export default class Main, mà phải export default withRouter cho connectedMain
    //ban đầu Main phải lưu state riêng trong đó có 2 mảng STAFFS và DEPARTMENTS để truyền tới Header sản xuất Chuoi_JSX
    //now, Main truy cập STAFFS và DEPARTMENTS từ store
    constructor(props) {
        super(props);
        this.state={
            //staffs:STAFFS,   <== không dùng nữa
            //departments:DEPARTMENTS,  <== không dùng nữa

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
        //constructor đối tượng, Mount đối tượng, gọi 3 hàm Thunk 
        //https://stackoverflow.com/questions/53301726/react-componentdidmount-fetch-api
        this.props.fetchStaffs(); //gọi cùng lúc với ngay khi componentDidMount chạy
        this.props.fetchDepartments(); //Error commitLifeCycle, fetchDepartments is not a function , maybe caused by mis-using the props
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
       
        //Trong render, test dữ liệu thu được từ store:
            /// map state :  staffs,  departments,    staffsWage
            console.log(this.props.staffs);//ok, chú ý là object
            console.log(this.props.staffs.staffs); //ok
            //muốn lấy mảng thì this.props.staffs.staffs để truyền mảng nhân viên tới HeaderComponent
            console.log(this.props.departments);//ok, truy cập mảng với this.props.departments.departments
            console.log(this.props.staffsWage);//ok, truy cập mảng với this.props.staffsWage.staffsWage
             
            /// map dispatch :  đã dùng trong componentDidMount()
            return(

                //làm sao không có báo lỗi <Route path="/nhan_vien" component={<WebBody_of_Employees departments={this.state.departments} staffs={this.state.staffs}  data={this.state.Chuoi_JSX_tat_ca_Nhan_vien} />} />
                //xem bài TranTienDat có dùng Route path, còn bài này không dùng Route path, chỉ dùng Link trong SPA
                    ///https://codesandbox.io/s/asm3-msqopy?file=/src/components/MainComponent.js:404-463
                <div>
                    <HeaderClassComponent 

                        //dữ liệu 3 mảng lấy từ store
                        departments={this.props.departments.departments} 
                        staffs={this.props.staffs.staffs} 
                        staffsWage={this.props.staffsWage.staffsWage}

                        //others
                        inputValue={this.state.inputEmployeeName}
                        onClickonLiEmployee={(Chuoi_JSX)=>this.onReceive_JSX_Nhanvien_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiDepartment={(Chuoi_JSX)=>this.onReceive_JSX_Phongban_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiSalary={(Chuoi_JSX)=>this.onReceive_JSX_BangLuong_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonCakeCompany={(Chuoi_JSX)=>this.onReceive_JSX_CakeCompany_from_HeaderClassComponent(Chuoi_JSX)}
                        onClick_to_image_of_employee_to_get_more_facts={(Chuoi_JSX)=>this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent(Chuoi_JSX)}
                        onChangeInValueInput={(Chuoi_JSX)=>this.onReceive_JSX_EmployeeSearchByName_from_HeaderClassComponent(Chuoi_JSX)}

                        Button_event_handler_lay_chi_tiet_nhan_vien={(Chuoi_JSX)=>this.receiveEmployeeDetails(Chuoi_JSX)}
                        
                    />

                    <WebBody_of_Employees 
                        //dữ liệu mảng lấy từ store, nhưng chưa lấy được department.name
                        phong_ban_gui_EmpBody={this.props.departments.departments} 
                        nhan_vien_gui_EmpBody={this.props.staffs.staffs} 
                        //others, Chuoi_JSX do HeaderComponent sản xuất gửi về MainComponent rồi truyền tiếp cho WebBody_of_Employees
                        data={this.state.Chuoi_JSX_tat_ca_Nhan_vien} //không bỏ được
                     />
                    <WebBody_of_Departments data={this.state.Chuoi_JSX_tat_ca_Phong_ban}/>
                    <WebBody_of_Salaries data={this.state.Chuoi_JSX_tat_ca_Bang_luong}/>


                    <WebBody_of_EmployeeDetail data={this.state.Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien}/>
                    <WebBody_of_InputEmployeeName 
                        //dữ liệu mảng lấy từ store
                        staffs={this.props.staffs.staffs} 
                        //others
                        Chuoi_tim_kiem={this.state.inputEmployeeName}/>
                    
                    <Chi_tiet_nhan_vien chitietnhanvien={this.state.Chuoi_JSX_chi_tiet_Nhan_vien}/>
                    <Footer_ResponsiveGrid_CSSBootstrap5/>

                    
                   
                </div>
            )    
               
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //đầu ra là 1 connectMain như 1 InferableComponentEnhancerWithProps
//https://newbedev.com/what-is-withrouter-for-in-react-router-dom  , ở đây không có <Router/>