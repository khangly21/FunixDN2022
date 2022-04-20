import React, { Component } from 'react';
import { BrowserRouter, Link, HashRouter,Switch,Route} from 'react-router-dom';
import {NavLink,Button,Media,Breadcrumb,BreadcrumbItem} from 'reactstrap'; //NavLink thuộc reactstrap chỉ trang trí hay điều hướng cùng 1 chứ không điều hướng như Link trong react-router-dom
import { FadeTransform } from 'react-animation-components';

export class makeCardUI extends React.Component{
    constructor(props){ 
        super(props);
    }
    render(){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}
            >
                <div className="card">
                    <div className="card__body">
                        <img style={{width:'26vw',height:'23vw'}} src="https://source.unsplash.com/1600x1050/?nature" alt="my image"/>
                        <h2 className="card__title">Our staff in {} department</h2>
                        <p className="card__description"></p>
                    </div>
                    <button className="card__btn">View details</button>
                </div>

            </FadeTransform>
            
        )
    }
        
}


export const Advanced_department_list_generating=(props)=>{
    const [Id_phong_ban_duoc_chon,set_Dept_Id]=React.useState(""); //useState() returns a stateful value EmplueeId="" and a function to update it
    
    //hàm tạo card
    const make_cardui=(dept,chosen_staff_array)=>(
        <div>
            <div className="card">
                <div className="card__body">
                    <img style={{width:'30vw',height:'23vw'}} src="https://source.unsplash.com/1600x1050/?nature" alt="my image"/>
                    <h2 className="card__title" style={{textAlign:'center'}}>Our <b style={{color:'orangered'}}>staff</b> in <b style={{color:'orangered'}}>{dept}</b></h2>
                    <article className="card__description" style={{textAlign:'center'}}>
                        <ul style={{listStyle:'none'}}>
                            {chosen_staff_array.map(staff=><li>{staff.name}</li>)}
                        </ul>
                    </article>
                </div>
                <button className="card__btn">View details</button>
            </div>
        </div>
            
        
        
    );
    //nhận từ departmentBodyComponent.js 2 mảng 
    let mang_phong_ban=props.mang_phong_ban 
    let mang_nhan_vien=props.mang_nhan_vien //Khi click 1 pòng ban phải đưa ra danh sách NV tương ứng

    console.log(mang_phong_ban); //OK. mảng 

    //mặc định
    let mang_JSX_phong_ban=(<div></div>);
    let breadcrumb=(<div></div>);

    
    //Có 2 nhánh, đi nhánh nào là tùy Id_nhan_vien_duoc_chon, khi không chọn hình nào thì đi nhánh if có Id_nhan_vien_duoc_chon == "", còn chọn hình thì state thay đổi thì đối tượng tự render lại view theo nhánh else 
       /// vậy là gửi nhận dữ liệu nhan_vien.id trong cùng một trang
    if(Id_phong_ban_duoc_chon == ""){//chưa chọn phòng nào
        breadcrumb=(
                 <Breadcrumb>  
                     <BreadcrumbItem>
                         <Link to="/"> Cake Company </Link>
                     </BreadcrumbItem> 
                     <BreadcrumbItem active >  Phòng ban  </BreadcrumbItem>  
                 </Breadcrumb>
        )
        
        mang_JSX_phong_ban=mang_phong_ban.map(
            (phongban)=>{
                    return(
                             <div style={{float:'left'}}>                              
                                    <NavLink to={{pathname:`/phong_ban/${phongban.id}`}} style={{fontSize:"8px",color:"black"}} className="navitem_css"  >
                                        <Button onClick={() => set_Dept_Id(`${phongban.id}`)}  style={{width:"14vw"}}>
                                            <div className="proportion_according_to_screen_size">
                                                <div className="boxes">
                                                   <h1>{phongban.name}</h1>
                                                   <b>Mã phòng ban: {phongban.id}</b>
                                                   <p>Số lượng nhân viên: {phongban.numberOfStaff}</p>
                                                </div>
                                            </div>  
                                        </Button>
                                    </NavLink> 
                                    <button key={phongban.id} id="nut_nhan_vien">{phongban.name}</button>
                             </div>    
                    ) 
            }
        )
        return(
            <div>
                  <div>
                    {breadcrumb}
                  </div>
                  <div className="grid-container" style={{marginTop:"0vw",marginBottom:"4vw"}}>
                    {mang_JSX_phong_ban}
                    
                  </div>
            </div>
        )
        
    }
    else{
        //Id_phong_ban_duoc_chon != "" do đã được update state bằng hàm set_Dept_Id()
        //hiển thị danh sách Nhân viên thuộc phòng ban Click vào
        console.log(Id_phong_ban_duoc_chon);//ok
        //duyệt từng đối tượng trong mảng phòng ban chọn ra đối tượng duy nhất có mã là Id_phong_ban_duoc_chon
        //Với mang_nhan_vien thì duyệt từng đối tượng, chọn ra danh sách các nhan_vien có departmentId là Id_phong_ban_duoc_chon
        //https://www.encodedna.com/javascript/create-ul-and-li-elements-dynamically-using-javascript.htm
        let Mang_Nhan_vien_duoc_chon=[];

        //https://www.javascripttutorial.net/javascript-array-filter/
   
        //chọn tất cả Nhân viên có phòng ban được chọn 
        Mang_Nhan_vien_duoc_chon=mang_nhan_vien.filter(function(element_in_array){
            return element_in_array.departmentId === Id_phong_ban_duoc_chon;
        })
        console.log(Mang_Nhan_vien_duoc_chon);//ok, sau đó map từng phần tử mảng vào Chuoi_JSX

        //syntax: Mang_Nhan_vien_duoc_chon.map(my_function)  https://www.w3schools.com/jsref/jsref_map.asp

        
        breadcrumb="";
        mang_JSX_phong_ban="";
        
        return(
            <div>
                <div>
                  {breadcrumb}
                </div>
                <div className="grid-container" style={{marginTop:"0vw",marginBottom:"4vw"}}>
                  {mang_JSX_phong_ban}
                  {make_cardui(Id_phong_ban_duoc_chon,Mang_Nhan_vien_duoc_chon)}
                  <makeCardUI/>
                </div>
            </div>
        )
    }
}



//https://youtu.be/4KxHcbQ8GYQ

export default Advanced_department_list_generating;
