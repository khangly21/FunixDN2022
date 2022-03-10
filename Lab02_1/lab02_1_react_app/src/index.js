import React from 'react';
import ReactDOM from 'react-dom';
//Ngoài module react và react-dom thì trong package.json còn nhiều modules khác cần download vào node_modules
// https://stackoverflow.com/questions/44800993/how-to-download-and-install-all-node-modules-through-package-json
// "npm install" sẽ đọc package.json và install node_modules trong trường hợp nộp bài không có node_modules

//node: tất cả các tên modules (như react, bootstrap, reactstrap...) trong package.json đều đã npm install --save  vào node_modules
import 'bootstrap/dist/css/bootstrap.min.css' //đường dẫn không cần node_modules, cứ Ctrl+click là tới file bootstrap.min.css
//tiếp theo, trong App.js sẽ import reacstrap
//Lưu ý: khi npm start thì module "react-scripts" sẽ được gọi, nếu Error: not recognized... thì phải xóa module đó trong node_modules rồi tải lại "npm install --save react-scripts" nó sẽ đọc package.json và tải theo version đó

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render( //thường thì render( bên trong là return() , hàm return() có trong App)
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
