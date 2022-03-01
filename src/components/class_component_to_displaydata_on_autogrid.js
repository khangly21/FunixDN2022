import React, { Component } from 'react'; 
import {STAFFS} from '../data/staffs';
import {DEPARTMENTS} from '../data/staffs'; 
import dateFormat from 'dateformat'; 
class Hien_thi_ten_NV extends Component {

  
    Button_event_handler(NHAN_VIEN){ 
        document.getElementById("chi_tiet_nhan_vien").innerHTML=`
            <b>Họ và tên</b>: <em>${NHAN_VIEN.name}</em> <br/>
            <b>Ngày sinh</b>: <em>${dateFormat(NHAN_VIEN.doB,"dd/mm/yyyy")}</em> <br/>
            <b>Ngày vào công ty</b>: <em>${dateFormat(NHAN_VIEN.startDate,"dd/mm/yyyy")}</em>  <br/>
            <b>Phòng ban</b>: <em>${NHAN_VIEN.department.name}</em> <br/> 
            <b>Số ngày nghỉ còn lại</b>: <em>${NHAN_VIEN.annualLeave}</em> <br/>
            <b>Số ngày đã làm thêm</b>: <em>${NHAN_VIEN.overTime}</em>
        `; 
        document.getElementById("huong_dan_su_dung").style="visibility: hidden;margin:0;";
    }  


    render() { 
        
        const danh_sach_button_chua_ten_NV=STAFFS.map(
            (NV)=>{
                return(
                    <button onClick={()=>this.Button_event_handler(NV)}>{NV.name}</button>
                )
            }
        )
       
        return(
            <div>
                <div className="grid-container">
                    {danh_sach_button_chua_ten_NV}
                </div>
                <p id="huong_dan_su_dung">Bấm vào tên nhân viên để xem thông tin</p>
      
            </div>
            
        )
    }  
}

export default Hien_thi_ten_NV;