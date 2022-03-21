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
            Ma_so_nhan_vien_duoc_chon:null //đây là id của món ăn (không phải đối tượng) //mặc định là 0 
        };
        //this.onEmployeeSelected=this.onEmployeeSelected.bind(this);
        this.onReceive_JSX_Nhanvien_from_HeaderClassComponent=this.onReceive_JSX_Nhanvien_from_HeaderClassComponent.bind(this);
        this.onReceive_JSX_Phongban_from_HeaderClassComponent=this.onReceive_JSX_Phongban_from_HeaderClassComponent.bind(this);
        this.onReceive_JSX_BangLuong_from_HeaderClassComponent=this.onReceive_JSX_BangLuong_from_HeaderClassComponent.bind(this);
        this.receiveEmployeeDetails=this.receiveEmployeeDetails.bind(this);
        this.onReceive_JSX_CakeCompany_from_HeaderClassComponent=this.onReceive_JSX_CakeCompany_from_HeaderClassComponent.bind(this);
        this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent=this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent.bind(this);
    }

    //Main nhận Chuoi_JSX từ Header để gửi cho (employee||department||salary) BodyComponent tương ứng
    onReceive_JSX_Nhanvien_from_HeaderClassComponent(Chuoi_JSX) {
        //bên trong hàm setState sẽ không có this.
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:Chuoi_JSX, //sẽ enable <WebBody_of_Employees/> , từ đó return tương ứng
            Chuoi_JSX_tat_ca_Phong_ban:"", //sẽ disable luôn <WebBody_of_Departments/>
            Chuoi_JSX_tat_ca_Bang_luong:"", //sẽ disable luôn <WebBody_of_Salaries/>
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
        console.log("state Chuoi_JSX toàn nhân viên hiện tại: ",this.state.Chuoi_JSX_tat_ca_Nhan_vien)
    }

    onReceive_JSX_Phongban_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:Chuoi_JSX, //sẽ kích hoạt hàm return của Main
            Chuoi_JSX_tat_ca_Bang_luong:"",
            Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien:""
        });
    }

    onReceive_JSX_BangLuong_from_HeaderClassComponent(Chuoi_JSX) {
        this.setState({
            Chuoi_JSX_tat_ca_Nhan_vien:"",
            Chuoi_JSX_chi_tiet_Nhan_vien:"",
            Chuoi_JSX_tat_ca_Phong_ban:"", //sẽ kích hoạt hàm return của Main
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


    //Main nhận Chuoi_JSX từ Header để gửi cho (employee||department||salary)Details tương ứng để render
    receiveEmployeeDetails(Chuoi_JSX) {
        this.setState({Chuoi_JSX_chi_tiet_Nhan_vien:Chuoi_JSX});
        console.log("this.state.Chuoi_JSX_chi_tiet_Nhan_vien sau khi click button Ten nhan vien ở HeaderClassComponent: ",this.state.Chuoi_JSX);
    }

    /*
    onEmployeeSelected(empId) {
        this.setState(
            {Ma_so_nhan_vien_duoc_chon:empId}
        ); //chỉ có thể được cập nhật từ <Employee/> sự kiện onClick, sau đó sẽ cập nhật props dish truyền cho <EmployeeDetails/>
    }
    */

    render(){
        console.log("Chuoi_JSX_sau_khi_click_menuNhan_vien_o_HeaderClassComponent: ",this.state.Chuoi_JSX_tat_ca_Nhan_vien);
        console.log(this.state.staffs.filter((staff) => staff.id === this.state.Ma_so_nhan_vien_duoc_chon)[0]);  
        
            //this.setState({Chuoi_JSX_tat_ca_Nhan_vien:""}); sẽ disable luôn <WebBody_of_Employees/>
           

                //note: BrowserRouter, Route , Switch đều thuộc Router, nếu ghi Reactstrap là undefined type
                //note: react_devtools_backend.js:3973 Warning: <Header_Reactstrap /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
                //PascalCase là một quy ước đặt tên, trong đó chữ cái đầu tiên của mỗi từ trong một từ ghép được viết hoa. phát triển phần mềm thường sử dụng PascalCase khi viết mã nguồn để chức năng tên, lớp, và các đối tượng khác.
                //https://techterms.com/definition/pascalcase
                /*
                <ReactRouterDOM.BrowserRouter>
                        <ReactRouterDOM.Link to="/">  </ReactRouterDOM.Link>
                        <ReactRouterDOM.Route path="/" component="HeaderClassComponent"></ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path="/a" component="WebBody"></ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path="/sss" component="Footer_ResponsiveGrid_CSSBootstrap5"></ReactRouterDOM.Route>
        
                </ReactRouterDOM.BrowserRouter>
                */
                //sẽ báo lỗi ở HeaderClassComponent vì nó là class component, còn WebBody và Footer_ResponsiveGrid_CSSBootstrap5 thì không vì chúng là functional component
                //https://learningprogramming.net/modern-web/react-functional-components/use-router-in-react-functional-components/
                //https://www.letsreact.org/usestate-managing-state-in-react-functional-components/
                //https://www.w3schools.com/react/react_usestate.asp
                
                

                
                //"this" giúp phân biệt staffs của vế trái và vế phải
                //có lẽ không cần thêm component Chi_tiet_nhan_vien, để phần chi tiết ngay trên WebBody luôn

            return(
                //để Single Page Application thì HeaderClassComponent và Footer_ResponsiveGrid_CSSBootstrap5 được tái sử dụng, và Body thì biến thiên. Vì không dùng quá nhiều if else
                <div>
                    <HeaderClassComponent 
                        departments={this.state.departments} 
                        staffs={this.state.staffs} 

                        onClickonLiEmployee={(Chuoi_JSX)=>this.onReceive_JSX_Nhanvien_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiDepartment={(Chuoi_JSX)=>this.onReceive_JSX_Phongban_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonLiSalary={(Chuoi_JSX)=>this.onReceive_JSX_BangLuong_from_HeaderClassComponent(Chuoi_JSX)} 
                        onClickonCakeCompany={(Chuoi_JSX)=>this.onReceive_JSX_CakeCompany_from_HeaderClassComponent(Chuoi_JSX)}
                        onClick_to_image_of_employee_to_get_more_facts={(Chuoi_JSX)=>this.onReceiveJSX_nhanvien_Hinh_va_text_from_HeaderClassComponent(Chuoi_JSX)}
                        
                        Button_event_handler_lay_chi_tiet_nhan_vien={(Chuoi_JSX)=>this.receiveEmployeeDetails(Chuoi_JSX)}
                        
                    />
                    <WebBody_of_Employees data={this.state.Chuoi_JSX_tat_ca_Nhan_vien} />
                    <WebBody_of_Departments data={this.state.Chuoi_JSX_tat_ca_Phong_ban}/>
                    <WebBody_of_Salaries data={this.state.Chuoi_JSX_tat_ca_Bang_luong}/>
                    <WebBody_of_EmployeeDetail data={this.state.Chuoi_JSX_chi_tiet_Hinh_text_nhan_vien}/>
                    
                    <Chi_tiet_nhan_vien chitietnhanvien={this.state.Chuoi_JSX_chi_tiet_Nhan_vien}/>
                    <Footer_ResponsiveGrid_CSSBootstrap5/>
                </div>
            )    
                //"Error: CANNOT GET /phong_ban khi và chỉ khi HeaderClassComponent thiếu onClickonLiDepartment", đó là lý do click "Nhân viên" thì danh sách nhân viên hiện ra trong http://127.0.0.1:5501/nhan_vien trong khi click "Phòng ban" thì báo lỗi CANNOT GET /phong_ban
                //Lưu ý: Phải có điều kiện chỉ khi nhấn li "Nhân viên" thì mới gọi <WebBody_of_Employees/>, 
                    /// khi nhấn li "Phòng ban" thì mới gọi WebBody_of_Departments , đồng thời <WebBody_of_Employees/> và WebBody_of_Salaries không được gọi nữa
                    /// khi nhấn li "Bảng lương" thì mới gọi <WebBody_of_Salaries/>

            
    } 
}