//xử lý 2 lỗi cơ bản là 404 và 500
//https://hocweb.vn/cach-xu-ly-error-trong-ung-dung-express-va-nodejs/

//Lab8.8 phần 2 thì get404 không dùng next(), ở phần 3 này dùng next(error) để transfer error tới error-handling middleware
exports.get404 = (req,res,next) => {
  const error=new Error("We are sorry, Page not found!");
  error.status=404;
  //render tới view 404.ejs trong thư mục views
  //express deprecated res.send(status,body)--> Use res.status(status).send(body)
  
  // Cách 1 (render ra view 404)
  // res.status(404).render('404', { 
  //   pageTitle: 'Page Not Found', 
  //   path: '/404',
  //   err_mess:error.message,  //nếu err_mess:error  thì render: Error: We are sorry, Page not found!
  //   isAuthenticated:req.session.user //trang báo lỗi cũng cần navigation.ejs, nối tiếp chuỗi khởi đầu từ postLogin,
  // });

  //Cách 2: render ra view 500
  next(error);
};

//Server error (VD failed to load resources) thì phải có biến err tham gia đầu tiên
//Mentor NgoTuanAnh: Vị trí của middleware error handling 500 ở cuối cùng để thu nhận biến err được throw từ các middleware khác xuống (/errors và errorController.get404 là điển hình)
exports.get500=(error,req,res,next)=>{//err mặc định là server-side err, nếu không có next(err) từ trên đẩy xuống
  //let err_mess=req.locals.message;

  //Phía SERVER (không phải console của client) xuất lỗi để dễ kiểm tra
  console.log(error) ;
  const err={
      status:error.status || 500,
      message:error.message || 'Internal Server Error'
  }
  //response
  res.status(err.status || 500).render('500', { 
    pageTitle: err.status, 
    path: '/500',
    err_status:err.status,
    err_mess:err.message,   //trang status 500 mà còn tìm không ra tài nguyên là bị lộ bảo mật các đường dẫn 
    isAuthenticated:req.session.user //trang báo lỗi cũng cần navigation.ejs , nối tiếp chuỗi khởi đầu từ postLogin,
  });
}


