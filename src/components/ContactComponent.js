//Controlled form Validation (không dùng input required="true" như thông thường)

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
class Contact extends React.Component { //Create a react component by extending the Component class

    constructor(props){
        super(props);

        //Component takes fomr's current value through props
        this.state={
            //key là các thuộc tính tên (name) của thẻ input, VD thẻ input type="date" thì có name="ngaythang"
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            ngaythang:this.formatDate(new Date()),  //tên key mà sai thì UI ô input date không cho thay đổi, chỉ read-only vì onChange không được setState
            agree:false,
            contactType:'Tel.',
            message:'',
            //indicator touched cho thấy false nghĩa là mặc định user chưa touch/fill out input field
            //khi click chuột vô input field thì thấy border xanh
            //khi cho chuột ra khỏi input field  border đỏ nếu thông tin điền sai thì hiện ra validation error cho input đó,
            //https://www.w3schools.com/jsref/event_onblur.asp
            touched:{
                firstname:false,
                lastname:false,
                telnum:false,
                email:false,
                ngaythang:false,
            },

            //Nested object : https://www.geeksforgeeks.org/how-to-update-nested-state-properties-in-reactjs/s
            on_Submit_err_warning:{
                fName_error:"",
                Lname_error:"",
                tel_error:"",
                email_error:"",
                ngaythang_error:""
            }
        }
        console.log(this.state.ngaythang);//2022-03-30
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this); //this contains a reference to React DOM Contact
        //https://codegrepr.com/question/jquery-checkbox-event-handling/

        //HTML "onBlur" event is very common to trigger validation as soon as the user leaves the input field (not focus, loose focus)
        this.handleBlur=this.handleBlur.bind(this); //vế phải handleBlur là functional component nên không cần bind vào class
        this.validate=this.validate.bind(this);
        //format date
        this.padTo2Digits=this.padTo2Digits.bind(this);
        this.formatDate=this.formatDate.bind(this);

    }

    //Unlike the uncontrolled component, the input form element in the controlled component is handled by the component rather than the DOM. It takes its current value through props. The changes are notified through callbacks.
    //https://www.w3schools.blog/forms-reactjs
    
    //https://newbedev.com/javascript-react-checkbox-event-target-value-code-example
    
    handleInputChange(event) {
        //input type=text thì nhận value, còn input type checkbox thì nhận checked
        //[event.target.name] là giá trị của tên của input DOM  nói cách khác là <input name="giá trị"
        const target_DOM_element=event.target;//event is already set to / contains reference to the input's DOM element
        //DOM input thì có type hoặc checkbox hoặc text
        //https://stackoverflow.com/questions/23971870/how-can-i-get-the-value-of-a-date-input-field
        //https://stackoverflow.com/questions/54261678/how-to-get-the-value-of-the-date-input-in-reactjs
        let value_of_input_DOM=''; //không để const vì báo lỗi value_of_input_DOM is read-only
        if(target_DOM_element.type === 'checkbox'){
            value_of_input_DOM=target_DOM_element.checked 
        }else if(target_DOM_element.type === 'date'){
            value_of_input_DOM=target_DOM_element.value  //đúng
            console.log(value_of_input_DOM); // OK , nhận được thay đổi
            console.log(event.target.value);//ok
        }else{
            value_of_input_DOM=target_DOM_element.value 
        }
        //const value_of_input_DOM= target_DOM_element.type === 'checkbox' ? target_DOM_element.checked : target_DOM_element.value; // <input checked={}
        const name = target_DOM_element.name;
        //https://stackoverflow.com/questions/38899884/how-to-use-square-brackets-in-react-setstate
        /// thay vì ghi target.name : value trong setState thì dynamically   [name]:value vì input's name có thể là một trong các state instance property trong this.state 
        this.setState({
          [name]: value_of_input_DOM
        });
        console.log(this.state.ngaythang) //2022-03-30  chưa được cập nhật  name="ngaythang" vì URL là http://127.0.0.1:5501/?firstname=Khang&lastname=L%C3%BDs&telnum=0932698045&email=vietkhang92%40gmail.com&ngaythang=2022-03-30&contactType=Tel.&message=#/contactus
    }

    handleSubmit(event) { //nếu submit mà không điền form thì cần báo lỗi
        //console.log('Current state is: ' + JSON.stringify(this.state));
        //alert('Current state is : '+JSON.stringify(this.state));
        
        //alert("The form was submitted");
        if( this.state.firstname==='' || this.state.lastname==='' || this.state.telnum==='' || this.state.email==='' || this.state.ngaythang===this.formatDate(new Date()) ){
            // Creating a dummy object using spread operator
            let on_Submit_err_warning = { ...this.state.on_Submit_err_warning } 
            //gán cho dummy object
            if(this.state.firstname===''){
                on_Submit_err_warning.fName_error="Please fill out the field first name!"
            }else{
                on_Submit_err_warning.fName_error="Thank you"
            }
            if(this.state.lastname==='' ){
                on_Submit_err_warning.Lname_error="Please fill out the field last name!"
            }else{
                on_Submit_err_warning.Lname_error="Thank you"
            }
            if(this.state.telnum==='' ){
                on_Submit_err_warning.tel_error="Please fill out the field Telephone number!"
            }else{
                on_Submit_err_warning.tel_error="Thank you"
            }
            if(this.state.email==='' ){
                on_Submit_err_warning.email_error="Please fill out the field Email address!"
            }else{
                on_Submit_err_warning.email_error="Thank you"
            }
            if(this.state.ngaythang===this.formatDate(new Date())){
                on_Submit_err_warning.ngaythang_error="Please fill out the field Birthday!"
            }else{
                on_Submit_err_warning.ngaythang_error="Thank you"
            }
            
            this.setState({
                //trong đây không dùng this
                //on_Submit_err_warning.fName_error="xin nhập",  là sai
                on_Submit_err_warning
            })
            //alert(`Done`);
       

        
            event.preventDefault(); //nhằm ngăn gửi tham_so=du_lieu lên URL  http://127.0.0.1:5501/?firstname=Khang&lastname=L%C3%BDs&telnum=0932698045&email=vietkhang92%40gmail.com&ngaythang=2022-03-10&contactType=Tel.&message=#/contactus
    }}

    //khi input field nào đó bị loosed focus (nghĩa là mang con trỏ ra ngoài)
    // ... là Spread Operator để combine các key:value khác [field_loosed_focus] vào trong this.state.touched 
    handleBlur=(field)=>(event)=>{
        
        this.setState(
            {
                //nghĩa là touched của handleBlur sẽ kế thừa đối tượng touch trên kia với ...this.state.touched đồng thời chuyển field onBlur thành true
                touched:{...this.state.touched,[field]:true} //khi onBlur event xảy ra thì this.state.touched của field là true, lúc này sẽ validate()
                //Ngoài ra khi touched: false mà nhấn Submit luôn thì cũng báo lỗi "Xin nhập" cho tất cả inputs
            }
        )
        console.log(this.state.touched.firstname);
        console.log(this.state.touched.lastname);
        console.log(this.state.touched.telnum);
        console.log(this.state.touched.email);
        console.log(this.state.touched.ngaythang);
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

    validate(firstname,lastname,telnum,email,ngaythang){ //WHY ??để gán dữ liệu cho đối tượng errors
          //Cho errors lên state, để onSubmit còn dùng được
        const errors={
            //chú ý nếu bỏ các if else phía sau đây thì các params bị tối màu
            //chứng tỏ các thuộc tính của đối tượng errors không liên quan gì các tham số hàm
            firstname:'',
            lastname:'',
            telnum:'',
            email:'',
            ngaythang:'' //ngaythang:new Date() rất dễ gặp báo lỗi:  Error: Objects are not valid as a React child (found: Wed Mar 30 2022 20:45:40 GMT+0700 (GMT+07:00)). If you meant to render a collection of children, use an array instead.

        } //nếu giữa nguyên được các giá trị '' thì hoàn toàn valid (vì 4 input fields trên không có lỗi nào)
        
        //if(this.state.touched.firstname)  nghĩa là if(this.state.touched.firstname==true) 
        //ONLY SHOW visible validation on blur (as soon as user leaves the input field, nghĩa là indicator touched=true)
        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last Name should be <= 10 characters';

       
        //const reg = /^[0-9\b]+$/;
        //https://www.itsolutionstuff.com/post/react-phone-number-validation-exampleexample.html
        //https://www.javatpoint.com/javascript-form-validation
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (this.state.touched.telnum && !pattern.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            //cắt chuỗi email thành từng ký tự cách nhau ''
            //https://www.w3schools.com/jsref/jsref_split.asp
            errors.email = 'Email should contain a @';

        //https://stackoverflow.com/questions/4929382/javascript-getfullyear-is-not-a-function
        //https://bobbyhadz.com/blog/javascript-typeerror-getfullyear-is-not-a-function
        //https://youtu.be/ezfi_65ew7E
          /// Làm sao validate cho Date phải khớp với input calendar?? https://bobbyhadz.com/blog/javascript-format-date-yyyy-mm-dd
        //let Nam_sinh=ngaythang.getFullYear(); //calling the getFullYear() method on an object that's not a valid Date.??
        //console.log(Nam_sinh) //2022
        let Nam_hien_tai=new Date().getFullYear(); 
        console.log(Nam_hien_tai);//"2022-03-30T13:47:10.809Z"  The specified value "Wed Mar 30 2022 20:48:08 GMT+0700 (GMT+07:00)" does not conform to the required format, "yyyy-MM-dd".
        console.log(this.formatDate(new Date()));//2022-03-30  //ReferenceError: formatDate is not defined  . LÝ do là hàm formatDate() phía trên không có thuộc/bind vào class nào
        //if(this.state.touched.ngaythang && Nam_sinh>=Nam_hien_tai){
            //errors.ngaythang=`Year of Birthday is supposed to be smaller than this year ${this.formatDate(new Date())}`;
        //}
        return errors
    }

    


    render() {

        //Tạo đối tượng errors which binds the component's state
        const errors=this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email,this.state.ngaythang);


        return(
            
            //nếu <Form><Form/> thì báo lỗi JSX element Form has no corresponding closing tag, phải là <Form></Form>
            // HTML class form-group
            //https://stackoverflow.com/questions/62426823/reactstrap-input-validation-error-help-needed
            //https://thewebdev.info/2020/08/01/reactstrap%E2%80%8A-%E2%80%8Aform-validation-and-customizations/

            //errors là tổng hợp tất cả lỗi nhập liệu trên form
            //Reactstrap.Input sẽ có thuộc tính valid=true hoặc invalid=true, tương tự <Reactstrap.FormFeedback> cũng cần

            //CHÚ Ý: khi Input có thuộc tính invalid=false thì có FormFeedback

            //tham khảo: https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                
                    <Reactstrap.Form onSubmit={this.handleSubmit}>
                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="firstname" md={2}>First Name</Reactstrap.Label>

                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="text" id="firstname" name="firstname"
                                        
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        valid={errors.firstname===''}
                                        invalid={errors.firstname!==''}
                                        onBlur={this.handleBlur('firstname')}
                                        onChange={this.handleInputChange} />
                                   
                                    <Reactstrap.FormFeedback invalid><b>{errors.firstname}</b></Reactstrap.FormFeedback>    
                                    <Reactstrap.FormFeedback valid><b>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>{this.state.on_Submit_err_warning.fName_error}</b></Reactstrap.FormFeedback> 
                                   
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="text" id="lastname" name="lastname"
                                        
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        valid={errors.lastname === ''}
                                        invalid={errors.lastname!==''}
                                        onBlur={this.handleBlur('lastname')}
                                        onChange={this.handleInputChange} />

                                    <Reactstrap.FormFeedback invalid>{errors.lastname}</Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>{this.state.on_Submit_err_warning.Lname_error}</b></Reactstrap.FormFeedback>        
                                </Reactstrap.Col> 
                            </Reactstrap.FormGroup>
        
                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="telnum" md={2}>Contact Tel.</Reactstrap.Label>
                                    <Reactstrap.Col md={10}>
                                        <Reactstrap.Input type="tel" id="telnum" name="telnum"
                                            
                                            placeholder="Tel. number"
                                            value={this.state.telnum}
                                            valid={errors.telnum === ''}
                                            invalid={errors.telnum!==''}
                                            onBlur={this.handleBlur('telnum')}
                                            onChange={this.handleInputChange} />
                                        <Reactstrap.FormFeedback>{errors.telnum}</Reactstrap.FormFeedback>
                                        <Reactstrap.FormFeedback valid><b>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                        <Reactstrap.FormFeedback valid><b>{this.state.on_Submit_err_warning.tel_error}</b></Reactstrap.FormFeedback>        
                                    </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="email" md={2}>Email</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="email" id="email" name="email"
                                        
                                        placeholder="Email"
                                        value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange} />
                                    <Reactstrap.FormFeedback>{errors.email}</Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>{this.state.on_Submit_err_warning.email_error}</b></Reactstrap.FormFeedback>        
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="ngaythang" md={2}>Ngày sinh</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="date" id="ngaythang" name="ngaythang"
                                        
                                        placeholder="Ngày sinh"
                                        value={this.state.ngaythang}
                                        valid={errors.ngaythang === ''}
                                        invalid={errors.ngaythang !== ''}
                                        onBlur={this.handleBlur('ngaythang')}
                                        onChange={this.handleInputChange} />
                                     <Reactstrap.FormFeedback>{errors.ngaythang}</Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>Yay, this green field is successfully ready!</b></Reactstrap.FormFeedback>
                                    <Reactstrap.FormFeedback valid><b>{this.state.on_Submit_err_warning.ngaythang_error}</b></Reactstrap.FormFeedback>        
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>

                                <Reactstrap.Col md={{size: 6, offset: 2}}>
                                    <Reactstrap.FormGroup check>
                                        <Reactstrap.Label check>
                                            <Reactstrap.Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Reactstrap.Label>
                                    </Reactstrap.FormGroup>
                                </Reactstrap.Col>

                                <Reactstrap.Col md={{size: 3, offset: 1}}>
                                    <Reactstrap.Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Reactstrap.Input>
                                </Reactstrap.Col>

                            </Reactstrap.FormGroup>

                            <Reactstrap.FormGroup row>
                                <Reactstrap.Label htmlFor="message" md={2}>Your Feedback</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <Reactstrap.Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}></Reactstrap.Input>
                                </Reactstrap.Col>
                            </Reactstrap.FormGroup>

                            <input type="submit"/>


                    </Reactstrap.Form>
                </div>
            </div>
        )
        

         
        
                
        
        
    }
}
