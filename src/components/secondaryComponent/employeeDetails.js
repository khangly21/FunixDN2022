import React, { Component } from 'react'; 

const Chi_tiet_nhan_vien=(props) =>{
    console.log(props.chitietnhanvien); //ok
    var Introduction="<b>Chi tiết nhân viên</b>"
    var Chuoi_JSX_chi_tiet_nhan_vien=props.chitietnhanvien;//ok!

    if(Chuoi_JSX_chi_tiet_nhan_vien != ""){
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            <h5>{Chuoi_JSX_chi_tiet_nhan_vien}</h5>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
    
}

export default Chi_tiet_nhan_vien;