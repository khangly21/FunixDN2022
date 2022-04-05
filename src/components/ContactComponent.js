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
const required = (val) => val && val.length; //return is in Boolean context , đọc là "đối với val thì có ràng buộc là tồn tại biến val và biến val không chứa chuỗi rỗng"
   // giải thích : 
       /// if(val) trả về false nếu a  undefined , mặc dù cũng trả false nếu a là chuỗi rỗng , 0 ...  Nhưng tần số cao là dùng undefined để kiểm sự tồn tại 
       /// if(val.length) sẽ trả về true nếu chuỗi có độ dài khác 0, nghĩa là không phải ''
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
      
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is : '+JSON.stringify(values));
    }

    render() {
        //chú ý: import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
             /// và import { Control, LocalForm, Errors } from 'react-redux-form';
        // https://davidkpiano.github.io/react-redux-form/docs/api/Control.html  tác giả davidkpiano và các ReactReduxForm.Control
        
        //thử gọi hàm alert(required(""))
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
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,
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
                                <Reactstrap.Label htmlFor="lastname" md={2}>Last Name</Reactstrap.Label>
                                <Reactstrap.Col md={10}>
                                    <ReactReduxForm.Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,
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
                                                required,
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
                                            required,
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
                                            //tương tự onBlur trong react và html
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
        

         
        
                
        
        
    }
}
