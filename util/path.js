const path=require('path');
module.exports = path.dirname(require.main.filename); //dirname returns the directory name of a path
// we just have to find out which directory or for which file we want to get the directory name.
//process là biến toàn cục available in all files, you don't need to import it
//a "main module" property. This will refer to the main, well module that started your application
    /// to the module we created here in app.js


