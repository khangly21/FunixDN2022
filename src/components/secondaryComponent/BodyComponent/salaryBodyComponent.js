import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';


const WebBody_of_Salaries=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    var Introduction=`Danh sách Bảng lương của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    
    var Mang_luong=props.bang_luong_gui_salaryBody; //nhận từ Main
    console.log(Mang_luong);
    //BẢNG LƯƠNG
            //////chỉ sử dụng máy chủ /staffsSalary bởi mang_cac_doi_tuong_luong_nhan_vien, chứ không dùng mang_cac_doi_tuong_nhan_vien như thông thường
    const Mang_thong_tin_ve_bang_luong=Mang_luong.map( //nếu mảng undefined thì map cũng undefined
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

    return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
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
        </div>
    )
    
}

export default WebBody_of_Salaries;