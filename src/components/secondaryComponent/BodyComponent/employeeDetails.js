import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import {Media,Breadcrumb,BreadcrumbItem} from 'reactstrap';

const StaffDetails=(props) =>{
    var Introduction="<b style={{color:'red'}}>Chi tiết nhân viên</b>"
    //nhận mảng nhân viên từ Main
    let staff_array=props.nhan_vien_gui_StaffDetails;
    console.log(staff_array) //ok
    //nhận đối tượng nhân viên được chọn, rồi truy cập thông tin để hiển thị
    let nhan_vien_duoc_chon=props.staffObject;
    console.log(nhan_vien_duoc_chon); //ok


    var DOB = new Date(nhan_vien_duoc_chon.doB);  //object  
    var enterDate=new Date(nhan_vien_duoc_chon.startDate);
    let DOB_dd_mm_yyyy=DOB.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})
    let enterDate_dd_mm_yyyy=enterDate.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})
    //https://www.w3docs.com/snippets/javascript/how-to-loop-through-an-array-in-javascript.html
    let Chuoi_JSX_nhan_vien=(
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
                        <b>Chi tiết nhân viên có <br/>  STT {nhan_vien_duoc_chon.id}</b>
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
    //return
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            {Chuoi_JSX_nhan_vien}
        </div>
      )
    
    
}

export default StaffDetails;