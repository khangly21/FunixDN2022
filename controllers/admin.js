
exports.getAddProduct = (req, res, next) => { //Nếu thêm tham số err là render ra "page not found"
  res.send("Hi");
  // res.render('admin/edit-product', {
    
  //   pageTitle: 'Add Product',
  //   path: '/admin/add-product',
  //   editing: false
  // });
};


//Để ý hàm trong Javascript là 1 đối tượng
   /// mỗi action trong đây đều là là đối tượng riêng biệt, hoàn toàn có thể cho thành Entity để có thể ghi nhận vào phiếu (ngày, giờ thực hiện ...) hay cài vào CSDL