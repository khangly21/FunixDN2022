//Controlled form Validation
   ///https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions?retiredLocale=vi
//cách trình bày (tắt) phối hợp Arrow function và If statement
   /// https://stackoverflow.com/questions/37627712/how-to-use-if-else-condition-in-arrow-function-in-javascript
   /// https://tutorial.eyehunts.com/js/javascript-array-length-0-zero-check-and-set-array-examples/
// if(variable) có nghĩa là gì?
   /// https://bobbyhadz.com/blog/javascript-check-if-variable-defined 
// What is Javascript term "truthy value" stored in a variable ??
   /// https://developer.mozilla.org/en-US/docs/Glossary/Truthy
   /// https://developer.mozilla.org/en-US/docs/Glossary/Falsy
//stackoverflow tương tự:
   /// https://stackoverflow.com/questions/65299603/react-redux-form-password-and-confirm-password-validation
   /// http://davidkpiano.github.io/react-redux-form/docs/guides/validation.html
// So sánh với Redux-form:
   /// https://appdividend.com/2017/11/05/redux-form-validation-tutorial-example/
// trang tác giả:
   /// https://davidkpiano.gitbooks.io/react-redux-form/content/field_component.html
 
function checking(a="dog",b=true){
    //return true && a
    return b && a; //cơ chế : If the first object is truthy, the logical AND operator returns the second operand
    // Nói cách khác: hàm này chỉ trả về a ONLY IF b=true
}
console.log(checking()); //dog

if("0"){
    console.log("Truthy value , so code in if is executed! ")
}

if(''){
    console.log("Chuoi co do dai khac 0")
}else{
    console.log("Chuoi rong")
}
//https://www.w3schools.com/JS/js_booleans.asp

//Form validation 
let a='';
console.log(a.length); //0
   /// An item of type undefined (and it is a type) has no length property - only items of type string and array do. Therefore, as @redneb notes, extend your condition to check for a non-falsy value before checking length.
   /// Trong form input context, thì không điền gì mà submit thì xem như biến val chứa Chuỗi rỗng và chuỗi rỗng có length 0, ngoài ra nơi lưu trữ chuỗi là biến val cũng có thể undefined => cả 2 tình huống trên đều là falsy. Dùng && để check falsy trước tiên , để ràng buộc không cho Chuỗi rỗng và biến undefined
//const required = (val) => val && val.length; //return is in Boolean context , đọc là "đối với val thì có ràng buộc là tồn tại biến val và biến val không chứa chuỗi rỗng", nếu gặp chuỗi rỗng thì val.length trả về false
   // giải thích : 
       /// if(val) trả về false nếu a  undefined , mặc dù cũng trả false nếu a là chuỗi rỗng , 0 ...  Nhưng tần số cao là dùng undefined để kiểm sự tồn tại 
       /// if(val.length) sẽ trả về true nếu chuỗi có độ dài khác 0, nghĩa là không phải ''
       /// ngược với if(val) là if(!val) nghĩa là chưa có val
       const required = (val) => val && val.length; //không ghi  val==true && val.length==true vì sẽ thu hẹp các trường hợp
       //tuy nhiên biến bình thường val không thể đứng đơn độc trong if() vì sẽ báo lỗi nên val phải là một biến thuộc tính của đối tượng input
       //https://www.spritely.net/how-to-get-target-value-in-javascript/#1
       // thực hành: không điền fields nào mà Send Feedback luôn thì tất cả đều message, hoặc onBlur 1 field nào đó thì field đó có message  . Lúc này val không tồn tại nên undefined, dĩ nhiên if(Boolean(val.length)) cũng không hoạt động, required là false
            /// Khi có điền vào vài ký tự đầu tiên thì được "validate theo thời gian thực", có val nghĩa là có tồn tại biến val.length
       /*
          //trong redux-form sẽ là:
          const validate = values => {
          const errors = {}
          if (!values.firstName) {
              errors.firstName = 'Required'
          } else if (values.firstName.length < 2) {
              errors.firstName = 'Minimum be 2 characters or more'
          }
       */
//sẽ không ra kết quả nào, do chưa có liên kết react-redux-form
//tiếp, arrow function of arrow functions
   /// https://iztuts.com/bai-3-cac-cong-logic-and-or-nand-xor-not/
   ///https://stackoverflow.com/questions/13952423/what-does-if-variable-name-mean-in-c-language
   ///CHÚ Ý ==> https://stackoverflow.com/questions/39426043/how-to-check-length-of-variable-with-property-length-of-undefined

   var myNiceVar; //undefined
   console.log(!myNiceVar); //true (do if(undefined){ //block } sẽ không chạy block)
   
   if(!myNiceVar ||myNiceVar.length <= 15){
       console.log("true!!!")  //true!!!
   }else{
       console.log("false");
   }
   //console.log(myNiceVar.length <= 15); // ContactComponent.js:41 Uncaught TypeError: Cannot read properties of undefined (reading 'length')
 

   if(myNiceVar && myNiceVar.length){
       console.log("true!!!") 
   }else{
       console.log("false");  //FALSE here! chứng tỏ máy đọc tới myNiceVar thấy false là không đọc tới length, vì nếu đọc tới là báo lỗi
   }

   /*
   if(myNiceVar.length){  //Uncaught TypeError: Cannot read properties of undefined (reading 'length')
       console.log("true")
   }else{
       console.log("false")
   }
   */



   /*
   //báo lỗi do myNiceVar là undefine nên không đọc thuộc tính length được
   if(myNiceVar.length){
     console.log("I have value!"); 
   }else{
      console.log("I am empty"); 
   }
   */

//coursera
const maxLength=(len)=>(val)=>!(val) || (val.length <= len)  //hover lên maxLength thì thấy nó trả về boolean
//make sure that val.length smaller or equivalent to len :   const maxLength: (len:any) => (val:any)=> boolean. Nhưng trước khi đọc length của đối tượng nào đó, phải đảm bảo đối tượng đó khác undefined (nếu không sẽ báo lỗi)
   /// nếu val undefined thì biểu thức trái !(val) true nên cả biểu thức là true
   /// nếu val là các empty string values như '',"",`` thì là các falsy value. Do đó !(val) là true. Thì cả !(val) || (val.length <= len) là true
   /// nếu val có giá trị (defined) và khác rỗng (tức là val.length > 0 ), thì !(val) là false. Do bên trái false thì cả biểu thức !(val) || (val.length <= len) có giá trị trùng với bên phải là (val.length <= len)

//minLength thì có biểu thức trong return ngược với của masLength
const minLength=(len)=>(val)=>(val) && (val.length >= len) //val phải khác undefined thì mới tính tới length, ngoài ra (val) && còn giúp tránh các Chuỗi rỗng

//check whatever it is , is there a number?
   /// https://kungfutech.edu.vn/bai-viet/javascript/cac-kieu-du-lieu-trong-javascript#ki%E1%BB%83u-d%E1%BB%AF-li%E1%BB%87u-number
   /// Trong Javascript có kiểu dữ liệu Number dành cho các loại số nguyên, số thực, Infinity, -Infinity và NaN.
   /// isNaN(number) returns a Boolean value that indicates whether a value is the reserved value NaN (not a number)

let n1=-66;
let n2=-66; //số nguyên âm
let n4=-3.14; //số thực âm
let n5="";
let n6=Infinity;
console.log(Number(n4)); //-3.14
console.log(Number(n2)); //-66
console.log(Number(n5)); //0

console.log(Number([]));//0
console.log(Number(""));//0
console.log(isNaN(Number(""))); //false
console.log(Number("Aasdas")); //NaN
console.log(isNaN(NaN)); //true  


console.log(isNaN(n5)); //false

console.log(Number('')); //0
console.log(isNaN('')); //false , vì console.log(Number('')); //0
console.log(isNaN(n6)); //false
console.log(-Infinity); //-Infinity
console.log(isNaN('hello world'));   // true
console.log(isNaN("123")); //false. WHY? The isNaN() method converts the value to a number before testing it (nên phù hợp cho input field).

const isNumber=(val) => !isNaN(Number(val));// nếu chuỗi rỗng thì isNaN(Number("")) = isNaN(0) = false, phủ định là true

console.log(isNumber("")) //true
console.log(isNumber("123")) //true
console.log(isNumber("khang")) //false

console.log(Number(true)); //1
console.log(Number(false)); //0
console.log(isNaN(true)); //false
console.log(isNaN(false)) //false

console.log(isNaN('NaN')); 
console.log(isNaN(NaN));
console.log(Number(undefined)); //NaN
console.log(Number(null)); //0
console.log(isNaN(undefined)); //true
console.log(isNaN(null)); //false

const validEmail=(val)=> /^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,4}$/i.test(val)

//Tóm lại:
    /// required
    /// maxLength
    /// minLength
    /// isNumber
    /// validEmail

//idea: NHững gì nhập vào sẽ được đối tượng Contact lưu lại trong instance property trạng thái state, khi submit sẽ alert
class Contact extends React.Component { //Create a react component by extending the Component class

    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this); 
        this.Check=this.Check.bind(this);
      
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is : '+JSON.stringify(values));
    }

    Check(val){ //val là những ký tự người dùng nhập, chứ không phải value mặc định của input field
        //https://stackoverflow.com/questions/2281633/javascript-isset-equivalent to PHP
        if(typeof val !== 'undefined'){
            if(typeof val.length > 0){ //if(val.length)  //nghĩa là middle name exist (theo tài liệu tác giả react-redux-form)
                return true;
            } 
        }else{
            return false; //nghĩa là Boolean(typeof val !== 'undefined') trả ra false thì hàm Check trả về false
        }
    }

    render() {
        //chú ý: import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
             /// và import { Control, LocalForm, Errors } from 'react-redux-form';
        // https://davidkpiano.github.io/react-redux-form/docs/api/Control.html  tác giả davidkpiano và các ReactReduxForm.Control
        
        //thử gọi hàm alert(required(""))

        //chú ý các Input không đặt giá trị value="xsass" vì không có onChange, nên sẽ không sửa đươc
        return(
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                
                <ReactReduxForm.LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="firstname" md={2}>First Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".firstname" id="firstname" name="firstname"
                                        //xem các child components của Control tại tác giả: https://davidkpiano.github.io/react-redux-form/docs/api/Control.html
                                        //placeholder="First Name"
                                        
                                        className="form-control"
                                        validators={{
                                            required:(val) => val && val.length, //val chính là giá trị yêu cầu người dùng gõ vào, chứ không phải value của input field
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                            //we allow from 3 to 15 characters, "must be greater than 3 and less than 15"
                                        }}
                                    />

                                    
                                    <ReactReduxForm.Errors
                                        className="text-danger" //bootstrap renders danger as red color
                                        //this error is applied to the model firstname
                                        model=".firstname"
                                        //tương tự onBlur trong react và html
                                        show="touched" 
                                        //these messages is showed only after the item is touched
                                        //If not touched at all, these messages will NOT be shown/displayed:
                                        messages={{
                                            //if required is evaluated to true
                                            required:`Required`,
                                            //if minLength is true
                                            minLength: 'Must be greater than 2 characters',
                                            //if maxLength is true
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                    />
                                   
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="middlename" md={2}>Middle Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".middlename" id="middlename" name="middlename"
                                      
                                        placeholder="Middle Name"
                                        className="form-control"
                                        validators={{
                                            required:this.Check, //lúc nào cũng thông báo 
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                            //we allow from 3 to 15 characters, "must be greater than 3 and less than 15"
                                        }}
                                    />
                                    <ReactReduxForm.Errors
                                            className="text-danger" //bootstrap renders danger as red color
                                            
                                            model=".middlename"    
                                            //tương tự onBlur trong react và html
                                            show="touched" 
                                            //these messages is showed only after the item is touched
                                            //If not touched at all, these messages will NOT be shown/displayed:
                                            messages={{
                                                //if required is evaluated to true
                                                required:'Required field. ',
                                                //if minLength is true
                                                minLength: ' Must be greater than 2 characters',
                                                //if maxLength is true
                                                maxLength: 'Must be 15 characters or less',
                                            }}
                                    />
                                </Reactstrap.Col>
                            </Reactstrap.Row>
                            
                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="nickname" md={2}>Nick Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".nickname" id="nickname" name="nickname"
                                        className="form-control"
                                        validators={{
                                            required, //video của thầy Ấn Độ
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                            //we allow from 3 to 15 characters, "must be greater than 3 and less than 15"
                                        }}
                                    />
                                    <ReactReduxForm.Errors
                                            className="text-danger" //bootstrap renders danger as red color
                                            model=".nickname"    
                                            //tương tự onBlur trong react và html
                                            show="touched" 
                                            //these messages is showed only after the item is touched
                                            //If not touched at all, these messages will NOT be shown/displayed:
                                            messages={{
                                                //if required is evaluated to true
                                                required:'Required ',
                                                //if minLength is true
                                                minLength: ' Must be greater than 2 characters',
                                                //if maxLength is true
                                                maxLength: 'Must be 15 characters or less',
                                            }}
                                    />
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".lastname" id="lastname" name="lastname"
                                       
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required:false, //lúc nào cũng thông báo 
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                            //we allow from 3 to 15 characters, "must be greater than 3 and less than 15"
                                        }}
                                    />
                                    <ReactReduxForm.Errors
                                            className="text-danger" //bootstrap renders danger as red color
                                            //this error is applied to the model firstname

                                            //NẾU CHỖ NÀY ĐỂ model=".firstname" thì onBlur ô lastname sẽ không có gì, trong khi onBlur firstname sẽ thông báo cùng lúc 2 chỗ là firstname và lastname
                                                ///model=".firstname"

                                            model=".lastname"    
                                            //tương tự onBlur trong react và html
                                            show="touched" 
                                            //these messages is showed only after the item is touched
                                            //If not touched at all, these messages will NOT be shown/displayed:
                                            messages={{
                                                //if required is evaluated to true
                                                required:`Required`,
                                                //if minLength is true
                                                minLength: 'Must be greater than 2 characters',
                                                //if maxLength is true
                                                maxLength: 'Must be 15 characters or less',
                                            }}
                                    />
                                </Reactstrap.Col>
                            </Reactstrap.Row>
        
                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="telnum" md={2}>Contact Tel.</Reactstrap.Label>
                                    <Reactstrap.Col md={10}>
                                        <ReactReduxForm.Control.text model=".telnum" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            className="form-control"
                                            //kế thừa và bổ sung validators as firstname and lastname
                                            validators={{
                                                required:(val) => val && val.length,
                                                minLength:minLength(3),
                                                maxLength:maxLength(15),
                                                //we allow this string from 3 to 15 characters, "must be greater than 3 and less than 15"
                                                isNumber //now this number has 3-15 numbers in the telephone number field
                                            }}
                                         />

                                        <ReactReduxForm.Errors
                                            className="text-danger" //bootstrap renders danger as red color
                                            //this error is applied to the model firstname

                                            //NẾU CHỖ NÀY ĐỂ model=".firstname" thì onBlur ô lastname sẽ không có gì, trong khi onBlur firstname sẽ thông báo cùng lúc 2 chỗ là firstname và lastname
                                                ///model=".firstname"

                                            model=".telnum"    
                                            //tương tự onBlur trong react và html
                                            show="touched" 
                                            //these messages is showed only after the item is touched
                                            //If not touched at all, these messages will NOT be shown/displayed:
                                            messages={{
                                                //if required is evaluated to true
                                                required:`Required`,
                                                //if minLength is true
                                                minLength: 'Must be greater than 2 numbers',
                                                //if maxLength is true
                                                maxLength: 'Must be 15 numbers or less',
                                                isNumber: 'Must be a number'
                                            }}
                                        />
                                    </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="email" md={2}>Email</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required:(val) => val && val.length,
                                            validEmail
                                        }}
                                        //khanglvFX15073@funix.edu.vn  vì sao báo lỗi "Invalid email address , do quy định sau @ chỉ có 1 . ??" , trong khi ab@cd.ef thì ok, ab@cd.ereee sẽ báo lỗi. Do sau . có quy định từ 2-4 characters
                                    />

                                    <ReactReduxForm.Errors
                                            className="text-danger" //bootstrap renders danger as red color
                                            //this error is applied to the model firstname

                                            //NẾU CHỖ NÀY ĐỂ model=".firstname" thì onBlur ô lastname sẽ không có gì, trong khi onBlur firstname sẽ thông báo cùng lúc 2 chỗ là firstname và lastname
                                                ///model=".firstname"

                                            model=".email"    
                                            //tương tự onBlur trong react và html, chỉ show Errors message sau khi onBlur
                                            show="touched" 
                                            //these messages is showed only after the item is touched
                                            //If not touched at all, these messages will NOT be shown/displayed:
                                            messages={{
                                                //if required is evaluated to true
                                                required:`Required`,
                                                validEmail:'Invalid email address'
                                            }}
                                    />
                                
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Reactstrap.Label check>
                                            <ReactReduxForm.Control.checkbox model=".agree"
                                                name="agree"
                                                className="form-check-input" /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Reactstrap.Label>
                                    </div>
                                </Reactstrap.Col>

                                <Reactstrap.Col md={{size: 3, offset: 1}}>
                                    <ReactReduxForm.Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </ReactReduxForm.Control.select>
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Label htmlFor="message" md={2}>Your Feedback</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Reactstrap.Col>
                            </Reactstrap.Row>

                            <Reactstrap.Row className="form-group">
                                <Reactstrap.Col md={{size: 10, offset: 2}}>
                                    <Reactstrap.Button type="submit" color="primary">
                                        Send Feedback
                                    </Reactstrap.Button>
                                </Reactstrap.Col>
                            </Reactstrap.Row>


                    </ReactReduxForm.LocalForm>
                </div>
            </div>
        )
        

        //Test:
            ///Không điền field nào, bấm "Send Feedback" thì tất cả các fields sẽ ra message
        //Kết luận:
            /// val chính là built-in user input của react-redux-form, chứ không phải giá trị value mặc định của form control input
            /// Khi không nhập gì mà Submit hay onBlur event, thì val có giá trị undefined nên có kiểu undefined, từ đó thuộc tính val.length cũng sẽ undefined 
            /// Các hàm sau sẽ ứng với các hành vi người dùng:
                //// const required=(val)=>val && val.length;
                //// const maxLength = (len) = (val) => !val || val.length;
                //// const minLength = (len) = (val) => val && val.length ;
        ///Hướng tiếp theo:
            /// https://stackoverflow.com/questions/65299603/react-redux-form-password-and-confirm-password-validation
            /// https://github.com/davidkpiano/react-redux-form/blob/master/docs/guides/validation.md  
            /// https://github.com/davidkpiano/react-redux-form
            /// https://stackoverflow.com/questions/47593345/how-to-implement-validation-restriction-in-react-datepicker
            /// https://www.thegreatcodeadventure.com/form-validation-in-react-with-redux-middleware/
    }
}
if(0){
    console.log("Boolean của 0 là true")
}else{
    console.log("Boolean của 0 là false")
}

if(Boolean(-0)){
    console.log("Boolean của -0 là true")
}else{
    console.log("Boolean của -0 là false")
}

if(Boolean(undefined)){
    console.log("Boolean của undefined là true")
}else{
    console.log("Boolean của undefined là false")
}

//SỰ TỒN TẠI CỦA BIẾN TRONG MỘT ĐỐI TƯỢNG
const error={}
//let error2;  Uncaught TypeError: Cannot read properties of undefined (reading 'cryptoniter') trong if(error2.cryptoniter)
if(error.cryptoniter){ //see if error.cryptoniter VALUE exists inside an object
    console.log("Boolean của undefined variable (không phải undefined variable bình thường mà là undefined variable bên trong 1 đối tượng đã được defined) là true")
}else{
    console.log("Boolean của undefined variable là false")
}

// SỰ TỒN TẠI CỦA BIẾN TỰ DO
/*
if(trophy){ //Uncaught ReferenceError: trophy is not defined
    console.log("Boolean của undefined variable  là true")
}else{
    console.log("Boolean của undefined variable là false")
}
*/

const array=[];
if(array.length){
    console.log("Mảng có chứa phần tử");
}else{
    console.log("Mảng rỗng")
}
if(Boolean(array.length)){
    console.log("Boolean của Mảng có chứa phần tử được đánh giá  true");
}else{
    console.log("Boolean của Mảng rỗng được đánh giá  false")
}

let Chuoi=''
if(Boolean(Chuoi.length)){
    console.log("Boolean của Chuoi có chứa ký tự được đánh giá  true");
}else{
    console.log("Boolean của Chuỗi rỗng được đánh giá  false")
}

