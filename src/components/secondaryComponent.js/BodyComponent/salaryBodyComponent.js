const WebBody_of_Salaries=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    var Introduction=`Danh sách Bảng lương của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    
    var Chuoi_JSX_danh_sach_Bang_luong=props.data;
    if(Chuoi_JSX_danh_sach_Bang_luong != "") //tức là có emitted event từ phía onClick của tag li "Phòng ban" của Header làm cập nhật this.state.Chuoi_JSX_tat_ca_Phong_ban != 0 và đồng thời các Chuoi_JSX khác == 0
    {
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            <h5>{Chuoi_JSX_danh_sach_Bang_luong}</h5>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
}