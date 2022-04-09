/*
function HomePage(props) {
    console.log(props.dish)
    return <h2>Hi, I am a Car!</h2>;
}
*/

function RenderCard(props){
    //bên trong { } là biến Javascript hay JS expression
    // các biến trong đối tượng leader
    const message=props.item;
    console.log(message);
    console.log(message.id); //3
    //React.createElement không đọc được <Reactstrap.CardBody> sẽ trả undefined type
    return(
      <Reactstrap.Card>
        <Reactstrap.CardImg src={message.image} alt={message.name}></Reactstrap.CardImg>
        <Reactstrap.Card body>
          <Reactstrap.CardTitle>{message.name} </Reactstrap.CardTitle>
             {message.designation?<Reactstrap.CardSubtitle>{message.designation}</Reactstrap.CardSubtitle>:null}
          <Reactstrap.CardText>{message.description}</Reactstrap.CardText>
        </Reactstrap.Card>
      </Reactstrap.Card>
    )
  }
  
  //https://blog.binarybits.net/call-react-function-from-html-with-parameter/
  //https://www.codingdeft.com/posts/react-calling-child-function-from-parent-component/
  function HomePage(props) {
      //update the HomeComponent.ts file to fetch and display the featured dish, promotion and leader
      //muốn call RenderCard function từ Home function thì không ghi RenderCard() mà gọi reference của nó <RenderCard/>
      const {name}=ReactRouterDOM.useParams()//https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
      console.log(name);

      const queryParams = new URLSearchParams(window.location.search);
      const USERname = queryParams.get('username');
      const rating = queryParams.get('rating');
      const comment = queryParams.get('comment');
      console.log(USERname,rating,comment); //YAY!

      return(
        
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={props.dish}/>
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