//FUNCTIONAL COMPONENT
const WebBody_of_Employees=(props) => {
    //return sẽ không hiển thị lên trang web, mà phải nằm trong hàm render
    //Warning:  <webBody /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
  
    //nhận gói dữ liệu từ Head
    //console.log(props.location.state); không nhận dữ liệu ngang cấp từ Header_Reactstrap bằng props được!
    console.log(props.data); //ok, vì từ Class cha Main truyền xuống class con là WebBody
    console.log(typeof props.data);

    //Props ONLY passed from parent component to child (if you don't use Redux or another state management library).
      /// https://stackoverflow.com/questions/50077235/send-data-from-child-to-parent-react
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    console.log(currentDate_DDMMYYYY)
    

    var Introduction=`Danh sách nhân viên của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
    var Chuoi_JSX_danh_sach_nhan_vien=props.data;//ok!

    if(Chuoi_JSX_danh_sach_nhan_vien != "") //tức là có emitted event từ phía onClick của tag li "Nhân viên" của Header làm cập nhật this.state.Chuoi_JSX_tat_ca_Nhan_vien != 0 và đồng thời các Chuoi_JSX khác == 0
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
    
    //Warning: validateDOMNesting(...): <h1> cannot appear as a child of <h4>.
}