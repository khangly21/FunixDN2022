import React, { Component } from 'react'; 
//NavLink và Link --> react-router-dom
import {Media,Breadcrumb,BreadcrumbItem,Navbar,NavLink,NavItem,NavbarBrand,NavbarToggler,Collapse,Nav} from 'reactstrap';
import Advanced_department_list_generating from '../../../Function_library/advanced_generate_department_list_with_button' ;

const WebBody_of_Departments=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    let Introduction=`Danh sách Phòng ban của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    //let Chuoi_JSX_danh_sach_Phong_ban=props.data;//ok, nhận từ Main
    let mang_cac_doi_tuong_phong_ban=props.phong_ban_gui_DeptBody;
    let mang_cac_doi_tuong_nhan_vien=props.nhan_vien_gui_DeptBody;

    const Mang_thong_tin_ve_phong_ban=mang_cac_doi_tuong_phong_ban.map(
        (phong_ban)=>{
            //trích thông tin
                var ten_phong_ban= phong_ban.name ;
                var So_luong_nhan_vien_trong_phong_ban=phong_ban.numberOfStaff;
            //NavLink tới cùng url không  to={{pathname:`/phong_ban/${phong_ban.id}`}}
            return( 
                <NavLink>
                    <div className="proportion_according_to_screen_size">
                        <div className="boxes">
                           <h1>{ten_phong_ban}</h1>
                           <p>Số lượng nhân viên: {So_luong_nhan_vien_trong_phong_ban}</p>
                        </div>
                    </div>  
                </NavLink> 
            )
        }
    )

        return(  
          
            <div className="container-fluid">
            
                <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
       
                <Advanced_department_list_generating
                    mang_phong_ban={mang_cac_doi_tuong_phong_ban}
                    mang_nhan_vien={mang_cac_doi_tuong_nhan_vien}
                />
            </div>
        )
    
}

export default WebBody_of_Departments;