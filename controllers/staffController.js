const Attendance = require('../models/recordedDiemDanh.js');
const Dog=require('../models/dog');
const getDb=require('../util/MongoDB_without_ODM'); 

const service=require('../services/staff.js');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

exports.staffHomepage=(req,res,next)=>{
    res.render('staff/index',{
        title:"trang nhân viên",
        path:'/staff',
        Working:undefined,
        attendance_danh_cho_Notice1:{}, 
        attendance_danh_cho_Notice2:{}  
    });
}

exports.staffDiemdanh=(req,res,next)=>{
    res.render('staff/index',{
        title:"trang nhân viên",
        path:'/staff/diemdanh',   
        Working:true,
        ten_nhan_vien:req.user.name,
        gio_bat_dau_lam_viec:new Date().getHours(),
        //parseTime:'',
        attendance_danh_cho_Notice1:{}, 
        attendance_danh_cho_Notice2:{}  
    });
}

exports.getKetthuclam=(req,res,next)=>{
   
    Attendance.find({})
              .select('work_location createdAt updatedAt -_id') 
              .exec()
              .then(attendances=>{
                Chuoi_ngay_gio_de_tinh_gio_lam=(new Date(attendances[0].createdAt)).toLocaleString();  
                
                Chuoi_ngay_gio_de_tinh_gio_lam=new Date().toLocaleString();

                Chuoi_ngay_de_tinh_gio_lam=Chuoi_ngay_gio_de_tinh_gio_lam.split(',')[0]; 
               
              
                res.render('staff/index',{
                    title:"trang nhân viên",
                    path:'/staff/ketthuclam', 
                    Working:false,
                    //lấy document cuối cùng
                    attendance_danh_cho_Notice2:attendances[attendances.length-1], 
                    mang_cac_doi_tuong_3_thuoc_tinh:attendances,
                   
                    Chuoi__ngay__de_tinh_gio_lam:Chuoi_ngay_de_tinh_gio_lam
                });
              })
  
             
}

exports.getAddDiemDanh=(req,res,next)=>{
    
    Attendance.find({})
              .exec()
              .then(attendances=>{
                  console.log(attendances);
                  res.render('staff/index',{
                      
                      title:"trang nhân viên",
                      ten_nhan_vien:req.user.name,
                      gio_bat_dau_lam_viec:'',
                      Working:true,
                      path:'/staff/submitted_and_received_diemdanh', 
                      attendance_danh_cho_Notice1:attendances[attendances.length-1],
                      attendance_danh_cho_Notice2:{}  

                  })
              })
}

exports.postCheckout=(req,res,next)=>{
    Attendance.find({})  
    .exec()
    .then(attendances=>{
      
      attendances[attendances.length-1].checkout= `${req.user._id} checked out`
      attendances[attendances.length-1].save()
                                      
                                      .then(result=>{
                                          
                                          res.render('staff/index',{
                                            title:"trang nhân viên",
                                            ten_nhan_vien:req.user.name,
                                            gio_bat_dau_lam_viec:'',
                                            Working:true,
                                            path:'/staff/checkout',
                                          
                                            attendance_danh_cho_Notice1:attendances[attendances.length-1],
                                            attendance_danh_cho_Notice2:attendances[attendances.length-1]

                                          })

                                      })
                                      .catch(err=>console.log(err))
    })
}

exports.postAddDiemDanh=(req,res,next)=>{
    

    console.log("req.body sau khi hành động postAddDiemDanh: \n",req.body); 
    
    const name = req.body.ten;
    const work_location = req.body.noilamviec;

    const diemdanh=new Attendance({
        name:name,
        work_location:work_location
    })

    diemdanh.save()
           
            .then(result=>{
                console.log("Created diemdanh");
                
                res.redirect('/staff/submitted_and_received_diemdanh'); 
            })
            .catch(err => {
                console.log(err);
            });
}


exports.getNghiphep=(req,res,next)=>{
  
    res.render('staff/nghiphep',{

        title:"trang nghỉ phép",   
        onLeaveForm:{
            title:'Kính gửi:',
            annualLeave:req.user.annualLeave 
            
        }
    })
}

exports.postNghiphep=(req,res,next)=>{
    res.status(201).json({message: "postNghiPhep", status: 201}) 
}

exports.postUpdateNgayNghiPhepNamDangKy=(req,res,next)=>{
 
    console.log(req.body.offdays);

    let offdays=req.body.offdays;
 
    Dog.findById(req.user._id)  
       .then(user=>{
           if(!user){
               res.redirect('/staff/nghiphep');
           }
       })

    if(req.user.annualLeave<=0){
        window.alert("annualLeave=0, vui lòng đợi đợt sau nhé")
    }

    const filter = { _id: req.user._id };
    const update = { annualLeave: req.user.annualLeave-offdays , ngaynghiphepnamdangky:offdays };
    Dog.findByIdAndUpdate(filter,update)
        .exec() 
        .then(result=>{
            console.log(result);
            res.redirect('/staff/nghiphep');
        })
        .catch(err=>console.log(err))
}

exports.getStaffInformation=(req,res,next)=>{
    let userId=req.user._id;
    
    Dog.findById("62d5c0ec6b2caf435f14e55a")
       .then(user=>{
            if(!user){
                res.render('staff/doc_ghi.ejs',{
                    title: 'Không thể đọc - ghi CSDL do không thấy userId'
                })
            }else{
                res.render('staff/doc_ghi.ejs',{
                    title: 'Đọc - ghi CSDL',
                    user:user
                })
            }
        })
    
}

exports.getEditStaffInformation=(req,res,next)=>{
   
    const user= req.user;

    res.render('staff/edit-profile',{
        title:'Mẫu đơn điều chỉnh thông tin cá nhân nhân viên',
        user:user,
      
        doB: new Date(user.doB)
       
    })
    
}

exports.postEditStaffInformation=(req,res,next)=>{
    res.status(200).json({message:"postEditStaffInformation"}) 
}

exports.getFormCovid19=(req,res,next)=>{
   
    const user= req.user;
    const DateAndATime=new Date().toLocaleString(); 
  
    res.render('staff/covidInfo_declaration',{
        title:'Mẫu đơn khai báo Covid19 /2022',
        user:user,
        datetimeNow:DateAndATime  
    })
}

exports.postFormCovid19=(req,res,next)=>{
    res.status(200).json({message:"postFormCovid19"}) 
  
    
}

function tonghopGiolam3(mang,groupbyKey,thuoctinhcua_arrayElement){
    return mang.reduce(function(resultObject,arrayElement){ 

        let key_of_arrayElement=arrayElement[groupbyKey]
        
        if(!resultObject[key_of_arrayElement]){
          resultObject[key_of_arrayElement]=[]
        }
        resultObject[key_of_arrayElement].push(arrayElement[thuoctinhcua_arrayElement]); 
       
        return resultObject;
    }, {})
  }

exports.getHourandMonthlySalary=(req,res,next)=>{
   
    const user= req.user;
   

                Attendance.find({})
                        .then(attendances=>{
                           
                         
                            let tong_hop=[];
                            let thang_can_ghi_nhan_cho_this_attendance;

                            attendances.forEach(function(attendance){
                               
                                let doi_tuong_ghi_nhan={} 
                                    
                                    doi_tuong_ghi_nhan.ngay=new Date(attendance.createdAt).getDate() + "/" + [new Date(attendance.createdAt).getMonth()+1] +"/" + new Date(attendance.createdAt).getFullYear() ;
                                    doi_tuong_ghi_nhan.thang=new Date(attendance.createdAt).getMonth()+1;
                                    doi_tuong_ghi_nhan.nam=new Date(attendance.createdAt).getFullYear();
                                    doi_tuong_ghi_nhan.noilamviec=attendance.work_location;
                                    doi_tuong_ghi_nhan.registered_annualLeave= req.user.ngaynghiphepnamdangky;
                                    doi_tuong_ghi_nhan.createdAt=new Date(attendance.createdAt) 
                                    doi_tuong_ghi_nhan.updatedAt=new Date(attendance.updatedAt)
                                    doi_tuong_ghi_nhan.Hieu_gioRa_gioVao=(new Date(attendance.updatedAt).getTime()/1000)/3600 - (new Date(attendance.createdAt).getTime()/1000)/3600;
                                
                                    tong_hop.push(doi_tuong_ghi_nhan); 
                                    thang_can_ghi_nhan_cho_this_attendance=doi_tuong_ghi_nhan.thang; 

                                    console.log("Tháng cần ghi nhận:\n",thang_can_ghi_nhan_cho_this_attendance)
                                    
                            })
                            

                            let report_working_time_3=tonghopGiolam3(tong_hop,'ngay','Hieu_gioRa_gioVao')
                           

                            let doi_tuong_thang7_luong=tonghopGiolam3(tong_hop,'thang','Hieu_gioRa_gioVao');
                           

                            let sum;
                            for(const key in report_working_time_3){
                                console.log(`${key}:${report_working_time_3[key]}`)
                                console.log(`Sum các giá trị của ${key} : `,report_working_time_3[`${key}`].reduce(function (accumulator, currentValue) {
                                  return accumulator + currentValue
                                }, 0));
                                sum=report_working_time_3[`${key}`].reduce(function (accumulator, currentValue) {
                                    return accumulator + currentValue
                                  }, 0);
                                
                            }
                         
                            res.render('staff/hour_and_monthSalary',{  
                                title:'Tra cứu giờ làm và lương tháng',
                                titleHours:'Phần I. Tra cứu thông tin giờ làm ',
                                titleSalary:"Phần II. Chi tiết lương tháng",
                                ngaynghiphepnamdangky:req.user.ngaynghiphepnamdangky, 
                                
                                attendances:attendances,

                            
                                tong_hop:tong_hop, 

                                doi_tuong_ngay_giolamviec:report_working_time_3,
                                doi_tuong_thang7_luong:doi_tuong_thang7_luong,

                                salaryScale:req.user.salaryScale,
                                thang_cua_tung_attendance_document:thang_can_ghi_nhan_cho_this_attendance
                            })   
                            
                        }) 
                        .catch(err=>console.log(err));
                               
              }
