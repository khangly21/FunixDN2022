const path=require('path');
//export đường dẫn tuyệt đối tới thư mục chứa main script là app.js
module.exports = path.dirname(require.main.filename); //path.dirname returns the directory names on a file path (a path to a file)
// we just have to find out which directory or for which file we want to get the directory name.
//process là biến toàn cục available in all files, you don't need to import it
//a "main module" property. This will refer to the main, module that started your application
    /// to the module we created here in app.js

//https://www.w3schools.com/nodejs/met_path_dirname.asp
//https://stackoverflow.com/questions/32950534/passing-require-main-to-path-dirname
    /// I'm trying to figure out why  path.dirname(require.main)

