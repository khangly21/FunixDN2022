//CLASS-BASED COMPONENT
class WebBody_of_Employees extends React.Component{
   
    constructor(props){ 
       super(props);
      
       console.log(this.props.staffs); 
       console.log(this.props.departments);

       console.log(this.props.data); 
       console.log(typeof props.data);
 
        this.state={ 
            

            //Nhóm đứng đầu state dùng object destructuring để on (khi length > 0) or off onSubmit button
            Myname:'',
            payroll:'',
            ngaynghiconlai:'',
            ngaylamthem:'',
            combobox_dropdown:'', 
            birthday:this.formatDate(new Date()),//default values for date
            ////////////////////

            entering_day:this.formatDate(new Date()),

            send_to_server:false, //button ở form Modal
            Dong_y_them_nhan_vien:false, //button ở trang Nhan_vien

            isModalOpen:false,
            formSubmitdata:0, 

            

            touched:{
               Myname:false,
               birthday:false,
               entering_day:false
            },

            on_Submit_err_warning:{ 
               name_error:"",
               ngaysinh_error:"",
               ngayvaolam_error:""
            },

            //###########################################################
            
            
            //staffs và departments
            cai_dat_danh_sach_nhan_vien:this.props.staffs,
            cai_dat_danh_sach_phong_ban:this.props.departments,
            
            STT_lon_nhat_trong_mang:this.props.staffs.length-1,
            Nhan_vien_moi:{name:""}  
       }

       console.log(typeof this.state.formSubmitdata); //undefined

       //format date and inputchange
       this.padTo2Digits=this.padTo2Digits.bind(this);
       this.formatDate=this.formatDate.bind(this);
       

       //Đồng ý thêm nhân viên mới
       this.Agree_to_add_new_employee=this.Agree_to_add_new_employee.bind(this);
       //Lấy dữ liệu form theo cách Uncontrolled Component
       this.Return=this.Return.bind(this);
       this.toggleModal=this.toggleModal.bind(this);
       this.handleAddEmployee=this.handleAddEmployee.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.referenceObject_to_DOM_form_input=React.createRef();
       this.requestForModel=this.requestForModel.bind(this);
     
       //các hàm cho Form validation:
        this.handleBlur=this.handleBlur.bind(this); 
        this.validate=this.validate.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleAddEmployeeSubmit=this.handleAddEmployeeSubmit.bind(this);
    }

    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
   formatDate(date) {
       return [
         date.getFullYear(),
         this.padTo2Digits(date.getMonth() + 1),
         this.padTo2Digits(date.getDate()),
       ].join('-');
   }

      storeDataTo_localStorage=()=>{
       
         this.setState(
            {
                Dong_y_them_nhan_vien:true
            }
         )
         console.log(this.state.Dong_y_them_nhan_vien); //khong ra do setState=({   })
         
         //2 đối số phải là string hết
         localStorage.setItem("Ho_ten",this.state.Myname);
         localStorage.setItem("Ngay_sinh",this.state.birthday);
         localStorage.setItem("Ngay_vao_lam",this.state.entering_day);
         localStorage.setItem("Phong_ban",this.state.combobox_dropdown);
         localStorage.setItem("He_so_luong",this.state.payroll);
         localStorage.setItem("So_ngay_nghi_con_lai",this.state.ngaynghiconlai);
         localStorage.setItem("So_ngay_lam_them",this.state.ngaylamthem);
       
      }

    Return(){
      this.setState(
         {formSubmitdata:0} 
      )
    }

    requestForModel(){
        let mybutton=document.getElementById("modalbutton");
        mybutton.setAttribute("data-target","#myModal");
    }

    handleAddEmployee=(event)=>{
     
       this.setState({
         isModalOpen: !this.state.isModalOpen
      });
      event.preventDefault();
       
    }

    toggleModal(){
      this.setState({
         isModalOpen: !this.state.isModalOpen
      });
    }

    onCloseModal = ()=>{
      this.setState({isModalOpen: false})
    }

    showModal=()=>{
         this.setState({
            isModalOpen:true
         })
            
   };

    handleSubmit(event){
      
      let user_input=this.referenceObject_to_DOM_form_input.current.value;
      alert("A name was submitted: " + user_input); 
    
      console.log(this.referenceObject_to_DOM_form_input.current.value);
      if(this.referenceObject_to_DOM_form_input.current.value===null){ 
         console.log("submit null");
      }else if(this.referenceObject_to_DOM_form_input.current.value=""){
         console.log("Please fill out the input field");
      }else{
         console.log(typeof(this.referenceObject_to_DOM_form_input.current.value)); 
         console.log(this.referenceObject_to_DOM_form_input.current.value);
      
      }

      this.setState(
         {
            formSubmitdata:user_input 
         }
      )
      console.log("Sau khi submit: ",this.state.formSubmitdata);
      event.preventDefault();
    }

    handleInputChange(event) {
      const target_DOM_element=event.target;
      let value_of_input_DOM;
      if(target_DOM_element.type === 'text'){
         value_of_input_DOM=target_DOM_element.value;
      }else if(target_DOM_element.type === 'checkbox'){
         value_of_input_DOM=target_DOM_element.checked;
      }else{
         value_of_input_DOM=target_DOM_element.value;
        
      }
      
 
      const name = target_DOM_element.name;
    
      this.setState({ 
        [name]: value_of_input_DOM 
      });
   }

   handleAddEmployeeSubmit(event){
    
      if( this.state.Myname==='' || this.state.birthday===this.formatDate(new Date()) || this.state.entering_day===this.formatDate(new Date()) ){
      
         let on_Submit_err_warning = { ...this.state.on_Submit_err_warning } 
    
         if(this.state.Myname===''){
             on_Submit_err_warning.name_error="Please fill out the field name!"
         }else{
             on_Submit_err_warning.name_error="Thank you"  
         }
        
         if(this.state.birthday===this.formatDate(new Date())){
             on_Submit_err_warning.ngaysinh_error="Please fill out the field Birthday!"
         }else{
             on_Submit_err_warning.ngaysinh_error="Thank you"
         }

         if(this.state.entering_day===this.formatDate(new Date())){
            on_Submit_err_warning.ngayvaolam_error="Please fill out the field companyEnterDay!"
        }else{
            on_Submit_err_warning.ngayvaolam_error="Thank you"
        }
         
         this.setState({
            
             on_Submit_err_warning
         })
       

         event.preventDefault(); 

   }}
   
   Agree_to_add_new_employee(total_employee_array, total_department_array){
        

         let {Ho_ten,Ngay_sinh,Ngay_vao_lam,Phong_ban,He_so_luong,So_ngay_nghi_con_lai,So_ngay_lam_them}=localStorage;
         
         let new_index=(total_employee_array.length-1)+1;
         console.log(new_index)
         
         let doi_tuong_phong_ban_tuong_ung_keyword = total_department_array.filter(department => department.name === Phong_ban)[0]; 

         let new_employee={
            id: new_index,
            name: Ho_ten,
            doB: Ngay_sinh,
            salaryScale: He_so_luong,
            startDate: Ngay_vao_lam,
            department: doi_tuong_phong_ban_tuong_ung_keyword,
            annualLeave: So_ngay_nghi_con_lai,
            overTime: So_ngay_lam_them,
            image: '../../../src/sharing_data/Hinh/alberto.png',
         }
         console.log("new_employee: ",
                      new_employee.id, 
                      new_employee.name,
                      new_employee.doB,
                      new_employee.startDate,
                      new_employee.department,
                      new_employee.salaryScale,
                      new_employee.annualLeave,
                      new_employee.overTime
                     )

         this.setState({ 
            Nhan_vien_moi:{
               id:new_index,
               name:Ho_ten,
               doB: Ngay_sinh,
               salaryScale: He_so_luong,
               startDate: Ngay_vao_lam,
               department: Phong_ban,
               annualLeave: So_ngay_nghi_con_lai,
               overTime: So_ngay_lam_them,
               image: '../../../src/sharing_data/Hinh/alberto.png'
            }
         
         },()=>{
            console.log(this.state.Nhan_vien_moi)
         })
         
         alert(`Bạn vừa đồng ý thêm nhân viên ?`); 
         
         //CÁCH 1
         /*
         this.setState(previousState => ({cai_dat_danh_sach_nhan_vien: [...previousState.cai_dat_danh_sach_nhan_vien,
            {
               id:new_index,
               name:Ho_ten,
               doB: Ngay_sinh,
               salaryScale: He_so_luong,
               startDate: Ngay_vao_lam,
               department: Phong_ban,
               annualLeave: So_ngay_nghi_con_lai,
               overTime: So_ngay_lam_them,
               image: '../../../src/sharing_data/Hinh/alberto.png'
            }

         ]})); 
         */

         //CÁCH 2: thử push nhân viên mới vô mảng trạng thái hiện tại
         console.log(this.state.cai_dat_danh_sach_nhan_vien) 
         console.log(new_employee)
         this.state.cai_dat_danh_sach_nhan_vien.push(new_employee);
         console.log(this.state.cai_dat_danh_sach_nhan_vien) 

   }

   validate(name,birthday,enterDay){ 
            
      const errors={
      
          name:'',
          birthday:'',
          enterDay:'' 
  
      } 
    
      if (this.state.touched.Myname && name.length < 3)
          errors.name = 'Name should be >= 3 characters';
      else if (this.state.touched.Myname && name.length > 10)
          errors.name = 'Name should be <= 10 characters';

      let Nam_hien_tai=new Date().getFullYear(); 
      let Thang_hien_tai=new Date().getMonth()+1;
      let Ngay_hien_tai=new Date().getDate();
      console.log(Nam_hien_tai); //ok
      console.log(Thang_hien_tai); //ok
      console.log(Ngay_hien_tai); //ok

      console.log(this.formatDate(new Date()));
  
  
      console.log(this.formatDate(new Date()).slice(0,4)) //https://www.w3schools.com/jsref/jsref_slice_string.asp
      let namsinh=parseInt(birthday.slice(0,4))  //upto position 4 , but not including
      let namvaolam=parseInt(enterDay.slice(0,4))
      console.log(namsinh) 
      console.log(namvaolam) 
      console.log(namsinh-namvaolam)
      console.log(namvaolam-namsinh)
      

     //Tháng
        ///let x=parseInt("04");  --> x=4
     let thangsinh=parseInt(birthday.slice(5,7));
     let thangvaolam = parseInt(enterDay.slice(5,7));

     //Ngày
     let ngaysinh= parseInt(birthday.slice(8,10));
     let ngayvaolam=parseInt(enterDay.slice(8,10));
  
      if(this.state.touched.birthday && namsinh>=Nam_hien_tai){
          errors.birthday="Year of Birthday is supposed to be smaller than this year";
      }

      if(this.state.touched.entering_day && ((namvaolam>Nam_hien_tai) || (namvaolam===Nam_hien_tai && thangvaolam>Thang_hien_tai) || (namvaolam===Nam_hien_tai && thangvaolam===Thang_hien_tai && ngayvaolam>Ngay_hien_tai)) ){
          errors.entering_day="The entering time must be smaller or the same today";
      }

      return errors
  }

      handleBlur=(field)=>(event)=>{
        
         this.setState(
             { 
                 
                 touched:{...this.state.touched,[field]:true} 
             },()=>{ 
               console.log(this.state.touched.Myname);
               console.log(this.state.touched.birthday);
               console.log(this.state.touched.entering_day);
             }
         )
         
      }

      handleInputChange(event) {
         
         const target_DOM_element=event.target;
       
         let value_of_input_DOM=''; 
         if(target_DOM_element.type === 'checkbox'){
             value_of_input_DOM=target_DOM_element.checked 
         }else if(target_DOM_element.type === 'date'){
             value_of_input_DOM=target_DOM_element.value  
             console.log(value_of_input_DOM); 
             console.log(event.target.value);
         }else{
             value_of_input_DOM=target_DOM_element.value 
         }
       
         const name = target_DOM_element.name;
      
         this.setState({
               [name]: value_of_input_DOM
            },()=>{
               console.log(this.state.birthday) 
               console.log(this.state.entering_day)
            } 
         );
         
      }

   render(){
      //https://stackoverflow.com/questions/30187781/how-to-disable-a-button-when-an-input-is-empty
      const { Myname, payroll, ngaynghiconlai,ngaylamthem, combobox_dropdown,birthday} = this.state; //destructuring vào 4 biến cùng tên
      const enabled = Myname.length > 0 && payroll.length > 0 && ngaynghiconlai.length > 0 && ngaylamthem.length > 0 && combobox_dropdown.length>0 && birthday !== this.formatDate(new Date()) ;
      const transfer_to_server=this.state.send_to_server;
      console.log(enabled);

      //đối tượng errors
      const errors=this.validate(this.state.Myname,this.state.birthday,this.state.entering_day);
      
      const FontAwesome_search= `<i className="fa fa-search"></i>`
      var currentDate_DDMMYYYY=new Date().toLocaleDateString('en-GB', {month: '2-digit',day: '2-digit',year: 'numeric'})
     
      var Introduction=`Danh sách nhân viên của công ty, ngày <b>${currentDate_DDMMYYYY}</b>`;
      var Chuoi_JSX_danh_sach_nhan_vien=this.props.data;


      if(typeof(this.state.formSubmitdata)==="number"){ 
         if(Chuoi_JSX_danh_sach_nhan_vien != "") 
         {

            return( 
                 
                 <div className="container-fluid">
               
       
                       <div className="row" style={{padding:"2vw",margin:"2vw",textAlign:"center"}}>
                              <div className="col"><h3 dangerouslySetInnerHTML={{ __html: Introduction }} /></div>
                              <div id="col1" className="col">
                                 <button type="button" id="MybtnPreventHTML" className="btn btn-primary" data-target="#MymodalPreventHTML" data-toggle="modal" data-backdrop="static" data-keyboard="false">Thêm nhân viên</button>
    	                           
                                 <button disabled={!this.state.Dong_y_them_nhan_vien} onClick={()=>{this.Agree_to_add_new_employee(this.state.cai_dat_danh_sach_nhan_vien,this.state.cai_dat_danh_sach_phong_ban)}} style={{margin:"2vw"}} type="button" className="btn btn-warning">Đồng ý thêm nhân viên</button>
                               	<div className="modal" id="MymodalPreventHTML">
                               		<div className="modal-dialog modal-dialog-scrollable">
                               			<div className="modal-content">
                               				<div className="modal-header">
                               					<button type="button" className="close" data-dismiss="modal">Close without save</button> 
                               					<h4 className="modal-title">Thêm nhân viên</h4>                                                             
                               				</div> 
                               				<div className="modal-body" style={{overflowY: "auto"}}>
                                                <Reactstrap.Form action="" onSubmit={this.handleAddEmployeeSubmit}>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="companyName" md={2}>Tên công ty:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input autoComplete="off" value="THE CAKE COMPANY" type="text" name="TenCongTy" id="companyName"/>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="ten" md={2}>Tên:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <Reactstrap.Input
                                                            autoComplete="off" type="text" name="Myname" id="ten"
                                                            onChange={this.handleInputChange} 
                                                            value={this.state.Myname} 
                                                            onBlur={this.handleBlur('Myname')} //Chú ý: 4/ đổi input thành Reactstrap.Input cũng false false false 3/ onblur không kích hoạt hàm  2/ onBlur toàn false false false 1/ HTML input nhận onblur chứ không phải onBlur của Reactstrao, 2/ param vào handleBlur phải trùng input's name và thuộc tính của touched
                                                            onChange={this.handleInputChange}
                                                            //nhóm thuộc tính valid và invalid
                                                            invalid={errors.name!==''}
                                                            valid={errors.name===''}
                                                            //FormFeedback phải cùng cấp hierarchy với Input thì mới có tác dụng, khi Input có invalid=true thì valid FormFeedback bị ẩn đi, còn invalid FormFeedBack hiện ra
                                                         />
                                                         
                                                        <Reactstrap.FormFeedback invalid><b style={{color:"red"}}>{errors.name}</b></Reactstrap.FormFeedback>    
                                                        <Reactstrap.FormFeedback valid><b style={{color:"green"}}>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                                        <Reactstrap.FormFeedback valid><b style={{color:"orangered"}}>{this.state.on_Submit_err_warning.name_error}</b></Reactstrap.FormFeedback>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="ngaySinh" md={2}>Ngày sinh:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input 
                                                            autoComplete="off" type="date" name="birthday" id="ngaySinh"
                                                            value={this.state.birthday}  
                                                            onChange={this.handleInputChange} 
                                                            onBlur={this.handleBlur('birthday')}
                                                            onChange={this.handleInputChange}
                                                            //nhóm thuộc tính valid và invalid
                                                            invalid={errors.birthday!==''}
                                                            valid={errors.birthday===''}
                                                         />
                                                         <Reactstrap.FormFeedback invalid><b style={{color:"red"}}>{errors.birthday}</b></Reactstrap.FormFeedback>
                                                         <Reactstrap.FormFeedback valid><b style={{color:"green"}}>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                                         <Reactstrap.FormFeedback valid><b style={{color:"orangered"}}>{this.state.on_Submit_err_warning.ngaysinh_error}</b></Reactstrap.FormFeedback>        
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="ngayVaoCongTy" md={2}>Ngày vào công ty:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input 
                                                            autoComplete="off" type="date" name="entering_day" id="ngayVaoCongTy"
                                                            value={this.state.entering_day} 
                                                            onChange={this.handleInputChange} 
                                                            onBlur={this.handleBlur('entering_day')} 
                                                            onChange={this.handleInputChange}
                                                            //nhóm thuộc tính valid và invalid
                                                            invalid={errors.entering_day!==''}
                                                            valid={errors.entering_day===''}
                                                         />
                                                         <Reactstrap.FormFeedback invalid><b style={{color:"red"}}>{errors.entering_day}</b></Reactstrap.FormFeedback>
                                                         <Reactstrap.FormFeedback valid><b style={{color:"green"}}>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                                         <Reactstrap.FormFeedback valid><b style={{color:"orangered"}}>{this.state.on_Submit_err_warning.ngayvaolam_error}</b></Reactstrap.FormFeedback>        
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="phongban" md={2}>Phòng ban:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <select required value={this.state.combobox_dropdown} onChange={this.handleInputChange}  name = "combobox_dropdown" id="phongban">
                                                            <option value = "">None</option>
                                                            <option value = "IT">IT</option>
                                                            <option value = "Sale">Sale</option>
                                                            <option value = "HR" >HR</option>
                                                            <option value = "Marketing">Marketing</option>
                                                            <option value = "Finance">Finance</option>
                                                         </select>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="hesoluong" md={2}>Hệ số lương:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input value={this.state.payroll} onChange={this.handleInputChange} autoComplete="off" type="number" name="payroll" id="hesoluong"/>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="remaining_dayoff" md={2}>Số ngày nghỉ còn lại:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input value={this.state.ngaynghiconlai} onChange={this.handleInputChange} autoComplete="off" type="number" name="ngaynghiconlai" id="remaining_dayoff"/>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                      <Reactstrap.Label htmlFor="adding_workday" md={2}>Số ngày đã làm thêm:</Reactstrap.Label>
                                                      <Reactstrap.Col md={10}>
                                                         <input value={this.state.ngaylamthem} onChange={this.handleInputChange} autoComplete="off" type="number" name="ngaylamthem" id="adding_workday"/>
                                                      </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                                   <br/>
                                                   <Reactstrap.FormGroup row>
                                                       <Reactstrap.Col md={{size: 10, offset: 2}}>
                                                           <Reactstrap.Button disabled={!transfer_to_server} type="submit" color="primary">
                                                               Send to server
                                                           </Reactstrap.Button>
                                                       </Reactstrap.Col>
                                                   </Reactstrap.FormGroup>
                                               </Reactstrap.Form>
                               				</div>   
                               				<div className="modal-footer">
                               					<button disabled={!enabled} onClick={this.storeDataTo_localStorage} type="button" className="btn btn-success" data-dismiss="modal">SAVE to client, CLOSE</button> 
                               				</div>
                               			</div>                                                                       
                               		</div>                                          
                               	</div>
                              </div>

                              
                             
                              <div id="col3" className="col">
                                 <div className="searcher">
                                      <div>
                                         <form onSubmit={this.handleSubmit}>
                                          
                                               Tìm kiếm nhân viên theo Họ tên
                                               <input autoComplete="off" id="filter" ref={this.referenceObject_to_DOM_form_input} type="text" placeholder="Nguyễn Văn A"/> 
                                               <button type="submit" id="submitButton" style={{backgroundColor:"white",border:"none"}}>
                                                  <i className="fa fa-search"></i>  
                                               </button>
                                            
                                         </form>
                                         
                                         
                                      </div>
                                 </div>
                              </div>
                       </div>
  
                       
                       <Advanced_emp_list_generating mang_nhan_vien={this.state.cai_dat_danh_sach_nhan_vien}/>
                 
                 
                 </div>
             
           )
         }else{
              return(
                <div></div>
              )
         }
      }else{
         //CHUỖI TÌM KIẾM
         
         let Chuoi_tim_kiem=this.state.formSubmitdata;
         let Mang_ten_nhan_vien_theo_Chuoi_tim_kiem=array_Searching_for_Name(this.state.cai_dat_danh_sach_nhan_vien,Chuoi_tim_kiem);
         console.log("Mảng theo Chuỗi tra cứu: ",Mang_ten_nhan_vien_theo_Chuoi_tim_kiem);
         let mang_Nut_va_Hinh_nhan_vien=generate_employee_image_and_button(Mang_ten_nhan_vien_theo_Chuoi_tim_kiem);

         return(
            
            <div className="container text-center" >
               <div className="row" style={{padding:"2vw",margin:"2vw"}}>
                  <div className="col">
                     <h5 style={{color:'blue'}}>Chuỗi tìm kiếm: {Chuoi_tim_kiem}</h5>
                  </div>
                  <div className="col">
                     <Reactstrap.Button className="btn btn-success" onClick={this.Return}>Trở về toàn bộ danh sách Nhân viên</Reactstrap.Button>
                  </div>
               </div>

               <div>
                  {mang_Nut_va_Hinh_nhan_vien}
               </div>
               
            </div>
         )
      }



       
    }
}

