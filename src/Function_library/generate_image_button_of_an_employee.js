import React, { Component } from 'react';
import {Media} from 'reactstrap';

const generate_employee_image_and_button=(mang_nhan_vien)=>{
    let mang_Nut_va_Hinh_nhan_vien=mang_nhan_vien.map(
        (nhan_vien)=>{
            return(
                <div>
                    <Media style={{width:"10vw"}} object src={nhan_vien.image} alt={nhan_vien.name}/>
                    <br/>
                    <b>{nhan_vien.name}</b>
                </div>
            ) 
            
        }
    )
    return(
        //NẾU {{mang_Nut_va_Hinh_nhan_vien}} sẽ báo lỗi Uncaught Error: Objects are not valid as a React child (found: object with keys {mang_Nut_va_Hinh_nhan_vien}). If you meant to render a collection of children, use an array instead.
        <div className="grid-container" style={{marginTop:"0vw",marginBottom:"4vw"}}>
            {mang_Nut_va_Hinh_nhan_vien}
        </div>
        
    )
}

export default generate_employee_image_and_button;