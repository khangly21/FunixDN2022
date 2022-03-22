const WebBody_of_InputEmployeeName =(props)=>{
    
    let currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {
        month: '2-digit',day: '2-digit',year: 'numeric'})
    
  
    var Chuoi_tim_kiem=props.Chuoi_tim_kiem;
    var Introduction=`Danh sách nhân viên của công ty theo tìm kiếm ${Chuoi_tim_kiem}, ngày <b>${currentDate_DDMMYYYY}</b>`;
    var staffs=props.staffs;

    console.log(Chuoi_tim_kiem); //nice!
    console.log(staffs); //nice!
    
    const array_Searching_for_Name=(array,Chuoi_tim_kiem)=>{
        const lowercase_Chuoi_tim_kiem=Chuoi_tim_kiem.toLowerCase();
        return array.filter(element=>{
            return element.name.toLowerCase().match(new RegExp(lowercase_Chuoi_tim_kiem, 'g'));
        })
    }

    const Mang_da_loc_ten_nhan_vien=array_Searching_for_Name(staffs,Chuoi_tim_kiem);

    const Tao_Chuoi_JSX_tu_mang_Nhan_vien_loc_theo_ten_nhan_vien=Mang_da_loc_ten_nhan_vien.map(
        (staff)=>{
            var DOB = new Date(staff.doB);  //object  
            var enterDate=new Date(staff.startDate);
            
            let dateForma_dd_mm_yyyy=DOB.toLocaleDateString('en-GB', {
                    month: '2-digit',day: '2-digit',year: 'numeric'})
            let enterCompanyDate=enterDate.toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})

            const Chuoi_JSX_employee_details=(
                <span key={staff.id} style={{backgroundColor:'yellow'}}>
                    Họ và tên: <em>{staff.name}</em> <br/>
                    Ngày sinh: <em>{dateForma_dd_mm_yyyy}</em> <br/>
                    Ngày vào công ty: <em>{enterCompanyDate}</em>  <br/>
                    Phòng ban: <em>{staff.department.name}</em> <br/> 
                    Số ngày nghỉ còn lại: <em>{staff.annualLeave}</em> <br/>
                    Số ngày đã làm thêm: <em>{staff.overTime}</em><br/>
                </span>
                 
            )
          
            return(
                <div>
                    {Chuoi_JSX_employee_details}   
                    <hr/>
                </div>  
                      
            )
        }
        
    )

    console.log("Chuoi_tim_kiem khi ở file inputEmployeeNameBodyComponent.js:",Chuoi_tim_kiem);
    if(Chuoi_tim_kiem!="chưa có gì"){
        return(
            <div className="inputRenderingCSS">
                <h3 dangerouslySetInnerHTML={{ __html: Introduction }} />
                {Tao_Chuoi_JSX_tu_mang_Nhan_vien_loc_theo_ten_nhan_vien}
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}