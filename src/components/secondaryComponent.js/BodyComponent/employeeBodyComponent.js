//FUNCTIONAL COMPONENT
const WebBody_of_Employees=(props) => {
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    console.log(currentDate_DDMMYYYY)
    
    var Introduction=`Danh sách nhân viên của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    var Chuoi_JSX_danh_sach_nhan_vien=props.data;//ok!

    if(Chuoi_JSX_danh_sach_nhan_vien != "")
    {
      return(  
        <div className="container-fluid">
            <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
            <h5>{Chuoi_JSX_danh_sach_nhan_vien}</h5>
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
}