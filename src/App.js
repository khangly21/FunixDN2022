class React_App extends React.Component {
    //dùng Reference tới Main
    render(){
      return (
        <ReactRouterDOM.HashRouter>
           <div className="App">
              <Main/>
           </div>
        </ReactRouterDOM.HashRouter>
        
      )
    }
}