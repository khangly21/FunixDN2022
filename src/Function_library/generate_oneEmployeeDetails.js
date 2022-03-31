const Ham_tao_Chuoi_JSX_chi_tiet_mot_nhan_vien=(nhan_vien)=>{
    const Chuoi_JSX_employee_Hinh_and_details=(
                   
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    HI
                </div>

                <div className="col-lg-9 col-md-8 col-sm-12">
                    Họ và tên: <em>nhan_vien.name</em> <br/>
                    Ngày sinh: <em>21/03/1992</em> <br/>
                    Ngày vào công ty: <em>21/3/1992</em>  <br/>
                    Phòng ban: <em></em> <br/> 
                    Số ngày nghỉ còn lại: <em></em> <br/>
                    Số ngày đã làm thêm: <em></em>                             
                </div>
            </div>
        </div>
        
    )
    return(
        //https://youtu.be/eGaaw1Py2aY
        <div>
            {Chuoi_JSX_employee_Hinh_and_details}
        </div>
    )
}