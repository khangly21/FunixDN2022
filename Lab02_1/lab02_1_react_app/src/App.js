import logo from './logo.svg';
import './App.css';
import React from 'react'; //không có thì Error: React must be in scope when RETURNING JSX
import {Navbar,NavbarBrand} from 'reactstrap'; //nếu có export default thì không cần {}

//màn hình mặc định của React có đoạn "Edit src/App.js and save to reload."
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

//Component is not defined
class App extends React.Component {
  render() {
    return(
      <div className="App">
         <Navbar dark color="primary">
           <div className="container">
             <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
           </div>
         </Navbar>
      </div>
    )
  }
}
export default App;
