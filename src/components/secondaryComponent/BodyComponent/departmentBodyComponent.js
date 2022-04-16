import React, { Component } from 'react'; 
const WebBody_of_Departments=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    var Introduction=`Danh sách Phòng ban của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    var Chuoi_JSX_danh_sach_Phong_ban=props.data;
    if(Chuoi_JSX_danh_sach_Phong_ban != "") 
    {
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            <h5>{Chuoi_JSX_danh_sach_Phong_ban}</h5>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
}

export default WebBody_of_Departments;