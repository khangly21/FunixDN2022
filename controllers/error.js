exports.get404 = (req, res, next) => {
  let isLoggedIn;
      if(req.get('Cookie')){
         isLoggedIn=req
         .get('Cookie')
         .split('=')[1]
      }

  res.status(404).render('404', { 
    pageTitle: 'Page Not Found', 
    path: '/404',
    isAuthenticated:isLoggedIn
  });
};
