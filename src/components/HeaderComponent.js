class Header extends React.Component {
    //render component's view
    render(){
        //return() không có { } bên cạnh như render(){}. Sẽ báo lỗi "Error: expected '=>' "
        //https://reactjs.org/docs/fragments.html  thay vì trong return có <> </> hay <div></div> thì dùng <React.Fragment></React.Fragment>
        //<React.Fragment dark> thì Warning: Invalid prop `dark` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.
        return(
            <React.Fragment>
                <Reactstrap.Navbar dark color="success">
                   <div>
                       <Reactstrap.NavbarBrand href="/" style={{color:"white"}}>Ristorante Con </Reactstrap.NavbarBrand>
                   </div>
                </Reactstrap.Navbar>
                    
                <Reactstrap.Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Reactstrap.Jumbotron>
            </React.Fragment>
        )
    }
}