import React, { Component } from 'react'; //cần vì hàm Advanced_emp_list_generating sẽ trả về JSX.Element
import { NavLink,BrowserRouter, Link, HashRouter,Switch,Route} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {Media,Breadcrumb,BreadcrumbItem} from 'reactstrap';


export const Advanced_emp_list_generating=(props)=>{//Warning: The tag <advanced_emp_list_generating> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
    const [Id_nhan_vien_duoc_chon,setEmployeeId]=React.useState(""); //useState() returns a stateful value EmplueeId="" and a function to update it
    let mang_nhan_vien=props.mang_nhan_vien //nhận từ employeeBodyComponent.js
    console.log(mang_nhan_vien); //OK. mảng 16 nhân viên
    let mang_Nut_va_Hinh_nhan_vien;
    //Có 2 nhánh, đi nhánh nào là tùy Id_nhan_vien_duoc_chon, khi không chọn hình nào thì đi nhánh if có Id_nhan_vien_duoc_chon == "", còn chọn hình thì state thay đổi thì đối tượng tự render lại view theo nhánh else 
       /// vậy là gửi nhận dữ liệu trong cùng một trang
    if(Id_nhan_vien_duoc_chon == ""){
        mang_Nut_va_Hinh_nhan_vien=mang_nhan_vien.map(
            (nhan_vien)=>{
               
                    return(
                        //note: Nếu cho Link vào BrowserRouter sẽ bị báo lỗi: Router chỉ có 1 CHild component thôi, do đó phải cho Link vào Switch
                        //note: 
                              /// Choice 1: dùng ReactRouterDOM.NavLink hoặc ReactRouterDOM.Link thì mới có http://localhost:3000/nhan_vien/1 khi chọn hình có STT 1 , sau đó có thể định nghĩa path tới component employeeDetails và không sử dụng , hoặc cập nhật state trong else{//Id_nhan_vien_duoc_chon != ""
                              /// Choice 2: còn nếu Reactstrap.NavLink thì cũng có SPA, onClick={() => setEmployeeId(`${nhan_vien.id}`)} nhưng tới cùng 1 đường dẫn http://localhost:3000/nhan_vien  , không có param :staffId  và không thực hiện else{//Id_nhan_vien_duoc_chon != ""
                        <div style={{textAlign:"center"}}>
                            <Link to={`/nhan_vien/${nhan_vien.id}`} style={{fontSize:"8px",color:"black"}} className="navitem_css"  >
                                <Media   style={{width:"14vw"}} object src={nhan_vien.image} alt={nhan_vien.name}  />
                            </Link> 
                            <button key={nhan_vien.id} id="nut_nhan_vien">{nhan_vien.name}</button>
                        </div>     

                       
                    ) 
                //Sau khi click Media thì cập nhật stateful Id_nhan_vien_duoc_chon bằng hàm setEmployeeId(), khi đó Id_nhan_vien_duoc_chon != "" và component Advanced_emp_list_generating sẽ re-render
            }
        )
    }else{//Id_nhan_vien_duoc_chon != ""
        //https://youtu.be/eGaaw1Py2aY
        let nhan_vien_duoc_chon=mang_nhan_vien[Id_nhan_vien_duoc_chon];//tình cờ STT index của từng đối tượng Nhân viên trong mảng trùng với id của Nhân viên

        var DOB = new Date(nhan_vien_duoc_chon.doB);  //object  
        var enterDate=new Date(nhan_vien_duoc_chon.startDate);
        let DOB_dd_mm_yyyy=DOB.toLocaleDateString('en-GB', {
                    month: '2-digit',day: '2-digit',year: 'numeric'})
        let enterDate_dd_mm_yyyy=enterDate.toLocaleDateString('en-GB', {
                        month: '2-digit',day: '2-digit',year: 'numeric'})
        //https://www.w3docs.com/snippets/javascript/how-to-loop-through-an-array-in-javascript.html
        mang_Nut_va_Hinh_nhan_vien=(
            //đã có EmployeeId != "", bây giờ filter mang_nhan_vien lấy ra nhan_vien có STT là EmployeeId
            // nếu truy xuất <p>Phòng ban: {nhan_vien_duoc_chon.department}</p> sẽ báo lỗi do department là 1 mảng 
            //Uncaught Error: Objects are not valid as a React child (found: object with keys {id, name, numberOfStaff}). If you meant to render a collection of children, use an array instead.

            //Lưu ý : trong company.jsx có 15 nhân viên, tới nhân viên thứ 16 được lưu trong localStorage khi hiện chi tiết sẽ có department.name là không xác định  <p>Phòng ban: {nhan_vien_duoc_chon.department.name}</p>
            <div className="container">
                <div className="row">
                    <Breadcrumb>  
                        <BreadcrumbItem >  
                            <Link to="/">Cake Company</Link> 
                        </BreadcrumbItem>   
                        <BreadcrumbItem >  
                            <Link to="/nhan_vien">Nhân viên</Link> 
                        </BreadcrumbItem>    
                        <BreadcrumbItem active>  
                            {nhan_vien_duoc_chon.name}
                        </BreadcrumbItem>  
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col">
                        <b>Chi tiết nhân viên có <br/>  STT {Id_nhan_vien_duoc_chon}</b>
                        <p>Ngày sinh: {DOB_dd_mm_yyyy}</p>
                        <p>Ngày vào làm: {enterDate_dd_mm_yyyy}</p>
                        <p>Hệ số lương: {nhan_vien_duoc_chon.salaryScale}</p>
                       
                        <p>Số ngày annualLeave: {nhan_vien_duoc_chon.annualLeave}</p>
                        <p>Số ngày overtime: {nhan_vien_duoc_chon.overTime} </p>
                    </div>
                    <div className="col"> <Media style={{width:"14vw"}} object src={nhan_vien_duoc_chon.image} alt={nhan_vien_duoc_chon.name}  /></div>
                    <div className="col"><button key={nhan_vien_duoc_chon.id} id="nut_nhan_vien">{nhan_vien_duoc_chon.name}</button></div>
                </div>
            </div>
            
        )
    }
    


    return(
        <div className="grid-container" style={{marginTop:"0vw",marginBottom:"4vw"}}>
            {mang_Nut_va_Hinh_nhan_vien}
        </div>
        
    )
}

export default Advanced_emp_list_generating;