import React, { Component } from 'react';
import './App.css';
import Main from './components/mainComponent'; //ĐK trước tiên là class Main phải được export default
import { HashRouter , BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import ConfigureStore from './redux/Store';


//const store = ConfigureStore();  //Ctrl+click vào ConfigureStore sẽ tới chỗ file nó trỏ tới
//console.log(store);//ok, store is available to me

//tạo thể hiện của store
const store=ConfigureStore();
export default class App extends Component {

    render(){
      //the createStore() method which creates a store to keep together the state tree of your application.
      
      return (
        //the Provider component passes the store as props
        // thầy ẤN: the Provider component allows me to configure the React app so that the Redux tool become available to all components in React application
          /// Provider takes 1 attribute : store
          /// Ctrl+Click vào biến store vế phải sẽ trỏ tới const store bên trên đầu trang (cho thấy sự liên kết giữa các tên biến giống nhau), tương tự CtrlClick ConfigureStore() đầu trang 
          /// không có <ReactRouterDOM.BrowserRouter> sẽ không hiện trang web
          <Provider store={store}>
            <BrowserRouter>
              <div>
                <Main/>
              </div>
            </BrowserRouter>
          </Provider>
            
      
        // đã có BrowserRouter do đó trong Main không cần tới nữa
        //tiếp theo, connect() để kết nối React application to Redux store , tới trang MainComponent
        //react_devtools_backend.js:3973 Warning: <connectedMainComponent /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
      )
    }
}

