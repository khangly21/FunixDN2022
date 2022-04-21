//do không có JSX nên không cần import React from 'react';
export const InitialFeedback={
    firstname:'',
    lastname:'',
    telnum:'',
    email:'',
    agree:false,
    contactType:'Tel.',
    message:''
};//thông thường trước khi vào hàm createForms thì InitialFeedback={}, sau khi người dùng nhập form thì qua các components khác như Homepage hay Aboutus rồi trở về Contact thấy dữ liệu vẫn còn, do state của form được lưu trong formReducer của store

//đã tạo model InitialFeedback như và các thuộc tính của nó
//giờ phải tới configureStore.js để configure store để lưu model này
//vì vậy cần sự trợ giúp của createForms của react-redux-form
    ///https://davidkpiano.github.io/react-redux-form/docs/api/createForms.html
       /// createForms(forms, [model], [options])
       /// The createForms() helper function takes a forms object where 