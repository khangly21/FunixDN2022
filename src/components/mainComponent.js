//Container component
class Main extends React.Component {
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
                </div>
            )    
               
    } 
}