/*
function HomePage(props) {
    console.log(props.dish)
    return <h2>Hi, I am a Car!</h2>;
}
*/

function RenderCard({item,isLoading,errMess}){ //ĐƯỢC GỌI BỞI HomePage
  //tham số được truyền bằng cách destructure to extract from props
  if(isLoading){
    return(
      <Loading/>
    )
  }
  else if(errMess){
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
  
//HomePage nhận props {dish,dishesLoading,dishesErrorMessage} từ MainComponent
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

      //trong RenderCard của dish sẽ nhận thêm 2 thuộc tính isLoading,errMess từ HomePage3 trong file MainComponent.js, Muppala cũng gọi chúng là parameters
      return(
        
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={props.dish} 
                            isLoading={props.dishesLoading}
                            errMess={props.dishesErrorMessage}
                />
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