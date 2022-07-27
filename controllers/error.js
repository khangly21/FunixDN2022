//xử lý 2 lỗi cơ bản là 404 và 500


exports.get404 = (req, res) => {
  //không ghi err là tham số đầu tiên vì page not found không phải là error của app (error của phía server)
  // let isLoggedIn;
  //     if(req.get('Cookie')){
  //        isLoggedIn=req
  //        .get('Cookie')
  //        .split('=')[1]
  //     }
  console.log("session của error404: \n",req.session); 
  //let err_mess="404";   //trường hợp 1: muốn err_mess defined thì uncomment 
  let err_mess;           //trường hợp 2: muốn err_mess undefined (thì không hiển thị trong trình duyệt)
  //..........            //trường hợp 3: muốn err_mess không tồn tại luôn , thì comment cả TH1 và TH2

  //render tới view 404.ejs trong thư mục views
  //express deprecated res.send(status,body)--> Use res.status(status).send(body)
  res.status(404).render('404', { 
    pageTitle: 'Page Not Found', 
    path: '/404',
    err_mess:err_mess,
    isAuthenticated:req.session.isLoggedIn //trang báo lỗi cũng cần navigation.ejs
  });
};

//Server error (VD failed to load resources) thì phải có biến err tham gia đầu tiên
//Mentor NgoTuanAnh: Vị trí của middleware error handling 500 ở cuối cùng để thu nhận biến err được throw từ các middleware khác xuống (/errors và errorController.get404 là điển hình)
exports.get500=(err,req,res,next)=>{//err mặc định là server-side err, nếu không có next(err) từ trên đẩy xuống
  //let err_mess=req.locals.message;

  //Phía SERVER (không phải console của client) xuất lỗi để dễ kiểm tra
  console.log(err) 
  //response
  res.status(500).render('500', { 
    pageTitle: 'Internal Server Error', 
    path: '/505',
    //err_mess:err_mess,   //trang status 500 mà còn tìm không ra tài nguyên là bị lộ bảo mật các đường dẫn 
    isAuthenticated:req.session.isLoggedIn //trang báo lỗi cũng cần navigation.ejs
  });
}
