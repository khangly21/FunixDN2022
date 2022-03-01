import './App.css';

import Hien_thi_ten_NV from './components/class_component_to_displaydata_on_autogrid';
import Menubar from './components/Thanh_menu'; 

function App() {
  return (
    <div className="App">
       <Menubar/> 
       
       <Hien_thi_ten_NV/>
     
    </div>
  );
}

export default App;