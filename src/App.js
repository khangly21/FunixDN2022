class App extends React.Component {
    //dùng Reference tới Main
    render(){
      return (
        <ReactRouterDOM.BrowserRouter>
           <div className="App">
              <Main />
           </div>
        </ReactRouterDOM.BrowserRouter>
      )
    }
}