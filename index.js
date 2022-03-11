//Let’s add bootstrap CSS in our application, you need to add the below line in your index.js
//chỉ import 1 file nhưng download nặng
//https://youtu.be/yVYk5XkLVPU
//https://reactstrap.github.io/?path=/story/home-installation--page
//import './node_modules/bootstrap/dist/css/bootstrap.min.css';  khong can? vì package json có version của reactstrap

//https://techoverflow.net/2019/04/01/how-to-fix-npm-err-missing-script-start/  khi npm start báo lỗi
/*
import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar , NavbarBrand} from 'reactstrap'; //tự truy cập node_module
import 'bootstrap/dist/css/bootstrap.min.css'; //không cần ./node_modules
import { Button } from 'reactstrap';
*/

/* dùng import rất dễ báo lỗi, nên dùng CDN */

function Hello() {
    return <h1>Hello World!</h1>;
}

//using JSX to define the view of component
const React_element=(
    <div>
        <Hello />
        <Reactstrap.Button>Button using Reactstrap</Reactstrap.Button>
    </div>
    
)
  
ReactDOM.render(React_element, document.getElementById("root"));