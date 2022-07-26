exports.get404 = (req, res, next) => {
  let isLoggedIn;
      if(req.get('Cookie')){
         isLoggedIn=req
         .get('Cookie')
         .split('=')[1]
      }
  console.log("session của error404: \n",req.session); 
  res.status(404).render('404', { 
    pageTitle: 'Page Not Found', 
    path: '/404',
    isAuthenticated:isLoggedIn
  });
};
