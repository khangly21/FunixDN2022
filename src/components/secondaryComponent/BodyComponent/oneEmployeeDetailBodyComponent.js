import React, { Component } from 'react'; 


const WebBody_of_EmployeeDetail=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    var Introduction=`Chi tiết Nhân viên của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    
    var Chuoi_JSX_Chi_tiet_nhan_vien=props.data;
    if(Chuoi_JSX_Chi_tiet_nhan_vien != "") 
    {
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            <h5>{Chuoi_JSX_Chi_tiet_nhan_vien}</h5>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
}

export default WebBody_of_EmployeeDetail;