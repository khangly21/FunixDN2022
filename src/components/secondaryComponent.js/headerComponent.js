//chú ý cách casing tên class
class HeaderClassComponent extends React.Component {
    //50% render component's view --> Container component
    //https://www.geeksforgeeks.org/reactjs-reactstrap-navbar-component/
    //có hay không Reactstrap.NavbarText?? 
    //https://fontawesome.com/v4/icons/  <i className="fa fa-bars" aria-hidden="true"></i>
    //NavbarToggler:
        /// C:\localhost\HK120212022_cacMonHoc\FUNIX\KHOA_3_WebFrontEnd_ReactJS\ĐỒ_ÁN_VÀ EXERCISES_VÀ_LABS\LABS\Lab05_3 --> xem HeaderComponent.js
        /// tại sao sai: const fontawesome_bars=<i className="fa fa-bars" aria-hidden="true"></i> <Reactstrap.NavbarToggler style={{backgroundColor:"black",background:{fontawesome_bars}}}/>
        /// className="fa fa-arrows-v" của reactstrap chỉ để thêm 1 arrow icon 
    // tại sao <Reactstrap.NavbarToggler></Reactstrap.NavbarToggler> đứng trước <Reactstrap.Collapse/> ? vì nếu để sau thì sau khi menu xổ xuống, Button sẽ bị đẩy xuống
    //<Reactstrap.NavItem className="navitem_css"> để tô màu chữ là sai, vì NavItem không dịch thành <a></a>, mà là <Reactstrap.NavLink
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false //muốn hiện thì để true
        };
        this.toggleNav = this.toggleNav.bind(this);
        //this.Button_event_handler=this.Button_event_handler.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
 
    //mảng STAFFS nhận từ Main
    //sự kiện nhấn nút để xem thông tin chi tiết của nhân viên:

    /*
    Button_event_handler(emp) {
        const Chuoi_JSX=(
            <div key={emp.id}>
                <b>Họ và tên</b>: <em>{emp.name}</em> <br/>
                <b>Ngày sinh</b>: <em>{emp.doB}</em> <br/>
                <b>Ngày vào công ty</b>: <em>{emp.startDate}</em>  <br/>
                <b>Phòng ban</b>: <em>{emp.department.name}</em> <br/> 
                <b>Số ngày nghỉ còn lại</b>: <em>{emp.annualLeave}</em> <br/>
                <b>Số ngày đã làm thêm</b>: <em>{emp.overTime}</em>
            </div>
            
        )//object là CHuoi_JSX để cùng emit event để tới class cha
        console.log(emp.name);//ok
        console.log("Sau khi click chọn, thông tin NV đó là: ",Chuoi_JSX);
        return(Chuoi_JSX);//sẽ gửi lên Main, sau đó Main chuyển qua cho Chi_tiet_nhan_vien
    }
    */

    render(){
        
        const mang_cac_doi_tuong_nhan_vien=this.props.staffs;
        const mang_cac_doi_tuong_phong_ban=this.props.departments;

        //NHÂN VIÊN:
        console.log("Mảng các nhân viên",mang_cac_doi_tuong_nhan_vien);
        //mảng nút tuy chứa các Chuoi_HTML nhưng là đầu vào của Chuoi_JSX     
        const mang_Nut_va_Hinh_nhan_vien=mang_cac_doi_tuong_nhan_vien.map(
            (nhan_vien)=>{
                //const formatted_doB=dateFormat(nhan_vien.doB,"dd/mm/yyyy"); và dateFormat phải import
                //https://www.tutorialspoint.com/How-to-create-JavaScript-Date-object-from-date-string
                var DOB = new Date(nhan_vien.doB);  //object  
                var enterDate=new Date(nhan_vien.startDate);
                //var formattedDOB =DOB.toLocaleDateString("en-GB")// => Problem: https://stackoverflow.com/questions/22719346/tolocaledatestring-is-not-returning-dd-mm-yyyy-format
                //var ddmmyyyyDOB_string=DOB.format('dd-mm-yyyy'); // => Problem: https://stackoverflow.com/questions/9132930/javascript-date-format-is-not-a-function
                // Solution => https://stackoverflow.com/questions/22719346/tolocaledatestring-is-not-returning-dd-mm-yyyy-format
                let dateForma_dd_mm_yyyy=DOB.toLocaleDateString('en-GB', {
                    month: '2-digit',day: '2-digit',year: 'numeric'})
                console.log(DOB,dateForma_dd_mm_yyyy); //https://www.w3schools.com/js/js_date_formats.asp Independent of input format, JavaScript will (by default) output dates in full text string format: Sun Mar 20 2022 07:53:19 GMT+0700 (GMT+07:00)
                //https://www.w3docs.com/snippets/javascript/how-to-format-a-javascript-date.html
                //https://www.w3schools.com/js/js_dates.asp
                   ///Lý do của kết quả của console.log(DOB); là vì When you display a date object in HTML, it is automatically converted to a string, with the toString() method.
                //https://www.w3docs.com/snippets/javascript/how-to-format-a-javascript-date.html  (Không dùng javascript default string display of a Date object, now you should convert Date object to a various date string)

                let enterCompanyDate=enterDate.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})

                //loop qua từng nhân viên rồi lưu được Chuoi_JSX_employee_details cho mỗi button
                const Chuoi_JSX_employee_details=(
                    <span key={nhan_vien.id} style={{backgroundColor:'yellow'}}>
                        Họ và tên: <em>{nhan_vien.name}</em> <br/>
                        Ngày sinh: <em>{dateForma_dd_mm_yyyy}</em> <br/>
                        Ngày vào công ty: <em>{enterCompanyDate}</em>  <br/>
                        Phòng ban: <em>{nhan_vien.department.name}</em> <br/> 
                        Số ngày nghỉ còn lại: <em>{nhan_vien.annualLeave}</em> <br/>
                        Số ngày đã làm thêm: <em>{nhan_vien.overTime}</em>
                    </span> 
                )//object là CHuoi_JSX để cùng emit event để tới class cha

                const Chuoi_JSX_employee_Hinh_and_details=(
                    //https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp
                    // Laptop: ảnh 3 cột, chữ 9 cột.
                    // Tablet: ảnh 4 cột, chữ 8 cột.
                    // Mobile: ảnh 12 cột, chữ 12 cột.

                    //https://www.w3schools.com/bootstrap/bootstrap_grid_examples.asp
                    //mặc dù div nhưng lại cùng hàng và div không chiếm toàn chiều rộng browser
                    <div className="container">
                        <nav aria-label="breadcrumb">  
                            <ol class="breadcrumb">  
                                <li class="breadcrumb-item"><a href="#" role="button" tabindex="0">The Cake Company</a></li>  
                                <li class="breadcrumb-item"><a href="#" role="button" tabindex="0">Nhân viên</a></li>  
                                <li class="breadcrumb-item active" aria-current="page">{nhan_vien.name}</li>  
                            </ol>  
                        </nav>  
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12">
                                <Reactstrap.Media style={{width:"10vw"}} object src={nhan_vien.image} alt={nhan_vien.name}/>
                            </div>

                            <div className="col-lg-9 col-md-8 col-sm-12">
                                Họ và tên: <em>{nhan_vien.name}</em> <br/>
                                Ngày sinh: <em>{dateForma_dd_mm_yyyy}</em> <br/>
                                Ngày vào công ty: <em>{enterCompanyDate}</em>  <br/>
                                Phòng ban: <em>{nhan_vien.department.name}</em> <br/> 
                                Số ngày nghỉ còn lại: <em>{nhan_vien.annualLeave}</em> <br/>
                                Số ngày đã làm thêm: <em>{nhan_vien.overTime}</em>
                                
                            </div>
                        </div>
                    </div>
                    
                )

                return(
                    //https://www.techboxweb.com/how-to-add-images-in-react/
                    //React Media can wrap both Text and Image
                    //render Hình thì chỉ dùng 1 thẻ Media
                    //<div style={{textAlign:"center"}}> nếu không hình sẽ lệch trái so với ảnh

                    //từng phần tử của mang_Nut_va_Hinh_nhan_vien . Lợi thế của map là giúp thiết kế từng phần tử của mảng đầu ra
                    <div style={{textAlign:"center"}}>
                        <ReactRouterDOM.BrowserRouter>  
                            <ReactRouterDOM.Link className="navitem_css" exact to={{pathname:`/nhan_vien/${nhan_vien.id}`}} onClick={()=>this.props.onClick_to_image_of_employee_to_get_more_facts(Chuoi_JSX_employee_Hinh_and_details)} >
                                <Reactstrap.Media  style={{width:"14vw"}} object src={nhan_vien.image} alt={nhan_vien.name}/>
                            </ReactRouterDOM.Link> 
                        </ReactRouterDOM.BrowserRouter>
                        
                        <button key={nhan_vien.id} onClick={()=>this.props.Button_event_handler_lay_chi_tiet_nhan_vien(Chuoi_JSX_employee_details)} id="nut_nhan_vien">{nhan_vien.name}</button>
                    </div>
                    
                )
            }
        )
 
        //const fontawesome_bars=<i className="fa fa-bars" aria-hidden="true"></i>
        //Note: Reactstrap.NavLink + href=""   ==  ReactRouterDOM.Link + to=""   vì đều render ra <a href=""  , nhưng NavLink và a tới trang mới (cùng browser tab), trong khi Link tới cùng trang
        // Yêu cầu single page application --> phải sử dụng Link
           /// tuy nhiên, dùng Link thì cũng như dùng a sẽ tạo underline decoration phía dưới , nên phải remove underline from anchor tag bằng CSS a { text-decoration: none; }
        // <ReactRouterDOM.Link className="navitem_css" to="/nhan_vien"><i className="fa fa-id-badge" aria-hidden="true">  Nhân viên</i> nên để icon và Nhân viên cùng dòng để tab khoảng cách, nếu nhiều hàng thì không tab khoảng cách được! 
        // https://stackoverflow.com/questions/22639534/pass-props-to-parent-component-in-react-js
        //https://stackoverflow.com/questions/41736048/what-is-a-state-in-link-component-of-react-router
        //to={{pathname="/body",state:{message:"From Head to Body"}}}  Invalid shorthand property initializer  vì pathname:"/body
        //<ReactRouterDOM.Link className="navitem_css" to={  {pathname:"/nhanvien",state: { mes: "hi" }} }><i className="fa fa-id-badge" aria-hidden="true"></i>  Nhân viên</ReactRouterDOM.Link>  sẽ đụng độ state bên main và chỉ to="/nhanvien" mới điều hướng single page được
        /*
            //Nội dung bên trong Reactstrap.Nav nên để Link trong li vì Link không dùng với onClick để gửi dữ liệu lên class cha Main được
                <Reactstrap.NavItem className="navitem_css">
                    <ReactRouterDOM.Link onClick={()=>this.props.onSend("2103")} className="navitem_css" to={{pathname:"/nhan_vien",state:"Hi nhanvien"}} ><i className="fa fa-id-badge" aria-hidden="true"> Nhân viên</i> </ReactRouterDOM.Link>
                </Reactstrap.NavItem>
                <Reactstrap.NavItem className="navitem_css">
                    <ReactRouterDOM.Link className="navitem_css" to={{pathname:"/phong_ban",state:{id:2}}}><i className="fa fa-building-o" aria-hidden="true">  Phòng ban</i></ReactRouterDOM.Link>
                </Reactstrap.NavItem>
                <Reactstrap.NavItem className="navitem_css">
                    <ReactRouterDOM.Link className="navitem_css" to="/bang_luong"><i className="fa fa-paypal" aria-hidden="true">  Bảng lương</i> </ReactRouterDOM.Link>
                </Reactstrap.NavItem>
                <Reactstrap.NavItem className="navitem_css">
                    <ReactRouterDOM.Link className="navitem_css" to={{pathname:"/body",state:{id:4}}}><i className="fa fa-paypal" aria-hidden="true"> Phần thân trang</i> </ReactRouterDOM.Link>
                </Reactstrap.NavItem>
        */
        //Trong li, <li><ReactRouterDOM.Link className="navitem_css" to={{pathname:"/body",state:{id:4}}}><i className="fa fa-paypal" aria-hidden="true"> Phần thân trang</i> </ReactRouterDOM.Link></li> hoàn toàn có thể tới trang body và gửi dữ liệu cho nó bằng cách <ReactRouterDOM.Route path="/body" component={WebBody} />
        //<div className="grid-container col-sm-6 col-md-4 col-lg-2">

        //PHÒNG BAN
        console.log("Mảng các Phòng ban",mang_cac_doi_tuong_phong_ban);
        const Mang_thong_tin_ve_phong_ban=mang_cac_doi_tuong_phong_ban.map(
            (phong_ban)=>{
                //trích thông tin
                    var ten_phong_ban= phong_ban.name ;
                    var So_luong_nhan_vien_trong_phong_ban=phong_ban.numberOfStaff;
                //xuất
                return(
                    // mỗi phong_ban cần có: phong_ban.name , phong_ban.numberOfStaff
                    // cho mỗi phong_ban div.one-third float:left width:33% , text-align: center;. Và div bọc ngoài sẽ có width:100%
                    //https://stackoverflow.com/questions/15674131/three-columns-with-33-width-and-margins-padding-why-is-last-column-breaking
                    /*
                        <div class="one_third">
                           <div class="boxes">
                               Hi there!
                           </div>
                        </div>
                        <div class="one_third">
                            <div class="boxes">
                                Hi there!
                            </div>
                        </div>
                        <div class="one_third">
                            <div class="boxes">
                                Hi there!
                            </div>
                        </div>

                        .one_third {
                             width: 33%;
                             float: left;
                             text-align: center;
                        }
                        .boxes {
                            background: #8888ff;
                            margin: 3px;
                            padding: 10px;
                        }   

                    */

                    //phần tử của mảng kết quả từ map
                    
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
        const Mang_thong_tin_ve_bang_luong=mang_cac_doi_tuong_nhan_vien.map(
            (nhan_vien)=>{
                //thông tin cần có trong return 1 item : nhan_vien.name, nhan_vien.id, nhan_vien.salaryScale , nhan_vien.overTime , Luong
                //Công thức tính lương: salaryScale * 3000000 + overTime * 200000. Trong đó, số giờ làm thêm cần được quy đổi ra đơn vị ngày bằng cách chia cho 8h/ngày (tức là 200000 cho 8h làm thêm).
                var Ten_Nhan_vien=nhan_vien.name;
                var Ma_so_Nhan_vien=nhan_vien.id;
                var He_so_luong_Nhan_vien=nhan_vien.salaryScale;
                var So_ngay_lam_them=nhan_vien.overTime/8;
                var Luong_lam_tron=Math.floor(He_so_luong_Nhan_vien*3000000+So_ngay_lam_them*200000);
                //3325000.0000000005
                //
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

        //CHỐT CHUOI_JSX gửi TRỞ LẠI CHO MAINCOMPONENT
                var Chuoi_JSX_lam_dau_vao_cua_MainComponent="";
                
                var Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent=(
                    <div className="container">
                        <Reactstrap.Breadcrumb>  
                            <Reactstrap.BreadcrumbItem href="#">Cake Company </Reactstrap.BreadcrumbItem>  
                            <Reactstrap.BreadcrumbItem active >  
                                Bảng lương
                            </Reactstrap.BreadcrumbItem>  
                        </Reactstrap.Breadcrumb>
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
                console.log(typeof(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent));//object (tức là Chuoi_JSX)

                var Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent=(
                    //TIP: thử tới .footerCSS trong file App.css để bỏ đi clear:left; thì thấy nguyên div của footer cũng float left theo các div  phía trên nó
                    <div>
                        
                        {Mang_thong_tin_ve_phong_ban}
                       
                    </div>
                )



                var Chuoi_HTML_thu_nghiem="<h2>Hello khang</h2>"; //Lưu ý: nếu onClick={()=>this.props.onClickonLi({Chuoi_HTML_thu_nghiem})} thì render ra [object Object]
                console.log(typeof(Chuoi_HTML_thu_nghiem)); //string (Chuoi_HTML)

                var Chuoi_HTML_dau_vao_bodyComponent=`
                    <div>
                        <div className="grid-container">
                            ${mang_Nut_va_Hinh_nhan_vien}
                        </div>
                        <p id="huong_dan_su_dung">Bấm vào Tên nhân viên, hoặc Hình ảnh để xem thông tin từng nhân viên</p>
                    </div>
                `

                console.log(typeof(Chuoi_HTML_dau_vao_bodyComponent)); //string
        return(
            <ReactRouterDOM.BrowserRouter>  
                <Reactstrap.Navbar dark="true" color="primary">
                    <div className="container">
                        <Reactstrap.NavbarBrand href="#" style={{color:"white"}}>
                            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                            <ReactRouterDOM.Link exact to="/" onClick={()=>this.props.onClickonCakeCompany(Chuoi_JSX_lam_dau_vao_cua_MainComponent)}><b style={{color:"white"}}>THE CAKE COMPANY</b></ReactRouterDOM.Link>
                        </Reactstrap.NavbarBrand>
                        
                        <Reactstrap.NavbarToggler className="fa fa-arrows-v" style={{backgroundColor:'yellow'}} onClick={this.toggleNav}><i className="fa fa-arrows-v"> Menus</i></Reactstrap.NavbarToggler>
                        <Reactstrap.Collapse isOpen={this.state.isNavOpen} navbar>
                            <Reactstrap.Nav className="mr-auto" navbar>
                                <ul>
                                    <li><ReactRouterDOM.Link className="navitem_css" exact to={{pathname:"/nhan_vien",state:"Hi nhanvien"}} onClick={()=>this.props.onClickonLiEmployee(Chuoi_JSX_lam_dau_vao_cua_employeebodyComponent)}  ><i className="fa fa-id-badge" aria-hidden="true"> Nhân viên</i> </ReactRouterDOM.Link></li>
                                    <li><ReactRouterDOM.Link className="navitem_css" exact to={{pathname:"/phong_ban",state:{id:2}}} onClick={()=>this.props.onClickonLiDepartment(Chuoi_JSX_lam_dau_vao_cua_Department_bodyComponent)}   ><i className="fa fa-building-o" aria-hidden="true">  Phòng ban</i></ReactRouterDOM.Link></li>
                                    <li><ReactRouterDOM.Link className="navitem_css" exact to="/bang_luong" onClick={()=>this.props.onClickonLiSalary(Chuoi_JSX_lam_dau_vao_cua_Salary_bodyComponent)}><i className="fa fa-paypal" aria-hidden="true">  Bảng lương</i> </ReactRouterDOM.Link></li>       
                                </ul>
                            </Reactstrap.Nav>
                        </Reactstrap.Collapse>
                    </div>
                </Reactstrap.Navbar>  
                
                

            </ReactRouterDOM.BrowserRouter>  
                 
        )
    }
}

/*
//Phía dưới Reactstrap.Nav, bên trong BrowserRouter có thể chuyển tới các trang khác như Nhanvien,Phongban,Bangluong, nhưng không cần do thay vì cần path để gọi component, thì chuyển dữ liệu cho class cha là Main thông qua emitting events (thực chất cũng như path component, cũng dùng Link "to" để gọi component)
<ReactRouterDOM.Route path="/nhan_vien" component={Nhanvien} />
<ReactRouterDOM.Route path="/phong_ban" component={Phongban} /> 
<ReactRouterDOM.Route path="/bang_luong" component={Bangluong} /> 
const Nhanvien = (props) => {
    console.log(props.location.state); //props.location.state.id
    return <h1>Nhanvien</h1>;
};

const Phongban = (props) => {
    console.log(props.location.state.id);
    return <h1>Phongban</h1>;
};

const Bangluong = () => {
    return <h1>Bangluong</h1>;
};

*/