import React, { Component } from 'react'; //cần vì hàm Advanced_emp_list_generating sẽ trả về JSX.Element
import { BrowserRouter, Link, HashRouter,Switch,Route} from 'react-router-dom';
import {Media,NavLink} from 'reactstrap';


export const Advanced_emp_list_generating=(props)=>{//Warning: The tag <advanced_emp_list_generating> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
    const [EmployeeId,setEmployeeId]=React.useState("");
    let mang_nhan_vien=props.mang_nhan_vien //nhận từ employeeBodyComponent.js
    console.log(mang_nhan_vien); //OK. mảng 16 nhân viên
    let mang_Nut_va_Hinh_nhan_vien;

    if(EmployeeId == ""){
        mang_Nut_va_Hinh_nhan_vien=mang_nhan_vien.map(
            (nhan_vien)=>{
               
                    return(
                        //note: Nếu cho Link vào BrowserRouter sẽ bị báo lỗi: Router chỉ có 1 CHild component thôi, do đó phải cho Link vào Switch
                        <div style={{textAlign:"center"}}>
                            
                                
                        
 
                             
                                    <NavLink style={{fontSize:"8px",color:"black"}} className="navitem_css" to={{pathname:`/nhan_vien/${nhan_vien.id}`}} >
                                        <Media onClick={() => setEmployeeId(`${nhan_vien.id}`)}  style={{width:"14vw"}} object src={nhan_vien.image} alt={nhan_vien.name}  />
                                    </NavLink> 
                                    
                        
                          
                      
                            
                            <button key={nhan_vien.id} id="nut_nhan_vien">{nhan_vien.name}</button>
                        </div>     
                    ) 
                //this.props.Button_event_handler_lay_chi_tiet_nhan_vien() tới từ mainComponent.js
            }
        )
    }else{// đang THỰC HIỆN ROUTING KHÔNG CẦN SWITCH ROUTER
        //https://youtu.be/eGaaw1Py2aY
        let nhan_vien_duoc_chon=mang_nhan_vien[EmployeeId];
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
                    <div className="col">
                        <b>Chi tiết nhân viên có <br/>  STT {EmployeeId}</b>
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