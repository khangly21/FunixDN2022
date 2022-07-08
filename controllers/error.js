exports.get404 = (err,req, res, next) => {
  console.log("Đang ở error handler: \n ",err);
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
