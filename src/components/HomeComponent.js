function RenderCard({item, isLoading, errMess}){
  if (isLoading) {
      return(
              <Loading />
      );
  }
  else if (errMess) {
      return(
              <h4>{errMess}</h4>
      );
  }
  else 
  return(
    <Reactstrap.Card>
      <Reactstrap.CardImg src={item.image} alt={item.name}></Reactstrap.CardImg>
      <Reactstrap.Card body>
        <Reactstrap.CardTitle>{item.name} </Reactstrap.CardTitle>
        {item.designation?<Reactstrap.CardSubtitle>{item.designation}</Reactstrap.CardSubtitle>:null}
        <Reactstrap.CardText>{item.description}</Reactstrap.CardText>
      </Reactstrap.Card>
    </Reactstrap.Card>
  )
}

//https://blog.binarybits.net/call-react-function-from-html-with-parameter/
//https://www.codingdeft.com/posts/react-calling-child-function-from-parent-component/
function Home(props) {
    //update the HomeComponent.ts file to fetch and display the featured dish, promotion and leader
    //muốn call RenderCard function từ Home function thì không ghi RenderCard() mà gọi reference của nó <RenderCard/>
    return(
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
          <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess}  />
          </div> 
          <div className="col-12 col-md m-1">
              <RenderCard item={props.promotion}/>
          </div>
          <div className="col-12 col-md m-1">
              <RenderCard item={props.leader}/>
          </div>
        </div>
      </div>
    );
}