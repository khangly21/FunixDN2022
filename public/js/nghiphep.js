
const Dog=require('../../models/dog');

var date=1;
var hour=1;
var elementS=document.getElementsByClassName('section_removable'); 
var r= document.getElementById('section_removable');
var s=document.getElementsByTagName('article')
var t=document.getElementsByClassName('')


function add_fields(){
    date++;
    hour++;

    var objTo=document.getElementById('fields_unremovable');

    var DateAdded=document.createElement("div");

    DateAdded.innerHTML='<article class="section_removable"><div class="row"> <div class="col"><div> Date ' + date + '</div> <input type="date" name="date_to_off[]" value="" ></div> <div class="col"><div>Hours'+hour+':</div><input class="hours" type="number" min="1" max="8" name="hour_to_off[]" value="" > </div></div></article>'

    objTo.appendChild(DateAdded);
}

function delete_this_date(){
  
    while(elementS.length > 0){
        elementS[0].parentNode.removeChild(elementS[0]);
    }
}

function sum_registered_hours(){ 
    var sumChia8=0.0
    var sum=0;
    
    $('.hours').each(function(){
        sum += parseInt(this.value); 
        sumChia8=parseFloat(sum/8);
        
        window.alert(sum) 
        window.alert("GIÁ TRỊ sumChia8:")
        window.alert(sumChia8)
       
        $("#target_for_sum_hours").html(sum); 
        $("#target_for_day_in_var").html(sumChia8)
          
      

        $("#target_for_day").html(sum/8).promise().done(function(){
            
        })

        
    }
        
    
    );
    
    

    //https://api.jquery.com/promise/
    
    // $('.hours')
    // .promise().done(function(){
    //     window.alert("done for '#target_for_sum_hours' and '#target_for_day'  "); //tuy nhiên vẫn alert SAU khi gán vào '#target_for_sum_hours' and '#target_for_day'
        
    // }).promise().done(function(){
    //     window.alert('fish')
    // }).promise().done(function(){
    //     const So_ngay_phep_nam_da_dang_ky= document.getElementById('target_for_day').innerHTML;  //value hay innerHTML? DÙNG value trong trường hợp 1 button có thuộc tính value và cần lấy giá trị của thuộc
    //     window.alert("gia tri x tu html element là: \n",So_ngay_phep_nam_da_dang_ky); //undefined
    //     const jquery_So_ngay_phep_nam_da_dang_ky=$('#target_for_day').html()  //3 lựa chọn là hàm html() hoặc text() hay val()
    //     window.alert("jquery_So_ngay_phep_nam_da_dang_ky: \n",jquery_So_ngay_phep_nam_da_dang_ky)
    // })

    //Không thể gọi hàm hay viết hàm trong ejs file, vì sẽ báo lỗi undefined

    
    
}

//không có tác dụng do không có res,req,next
function store_target_for_day_value(){
   
        const filter = { _id: req.user._id };
        const update = { ngaynghiphepnamdangky: 8 };
        Dog.findByIdAndUpdate(filter,update)
           .exec() 
           .then(result=> console.log(result))
           .catch(err=>console.log(err))

    
}


$('#jquery_store_songayphepnamdadangky_vao_bien').on("click",function(){
    window.alert("đã click vào HTML button #jquery_store_songayphepnamdadangky_vao_bien");
    $("#longtermTarget").html("Hello <b>world!</b>");
 
    $("#longtermTarget").promise().done(function(){
        var total = $("#longtermTarget").html() ;
        alert("your total is :"+ total ); 
    })
})

// $(document).ready(()=>{}) đã bị deprecated
$(function() {
    var total = $("#longtermTarget").html() ;
    alert("your total is :"+ total );    
});


function authen_inputValues(){
    window.alert("authen_inputValues -> Tổng giờ đăng ký nghỉ phải nhỏ hơn annualLeave");
    
    let annualLeave_on_mongodb = document.getElementById("annualLeave").value;
    
    let registered_offdays=document.getElementById("registered_offdays").value;
  
    if(parseFloat(registered_offdays) > parseFloat(annualLeave_on_mongodb)){
        alert("ngày đăng ký nghỉ phép phải nhỏ hơn phép năm hiện tại!")  
    }
}