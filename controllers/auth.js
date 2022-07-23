exports.getLogin = (req, res, next) => {
   
      res.render('auth/login', {
        path: '/login', //để hightlight nav Login khi path là /login
        pageTitle: 'Login'
        //I don't pass any other data here
      });
 
};

//it's a really simple controller action which render view auth/login I(EJS template + data ==> HTML ) to page '/login' requested
// will render the login page with the appropriate title.

