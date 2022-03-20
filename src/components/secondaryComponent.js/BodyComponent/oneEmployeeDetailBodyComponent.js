const WebBody_of_EmployeeDetail=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    var Introduction=`Chi tiết Nhân viên của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    
    var Chuoi_JSX_Chi_tiet_nhan_vien=props.data;
    if(Chuoi_JSX_Chi_tiet_nhan_vien != "") //tức là có emitted event từ phía onClick của tag li "Phòng ban" của Header làm cập nhật this.state.Chuoi_JSX_tat_ca_Phong_ban != 0 và đồng thời các Chuoi_JSX khác == 0
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