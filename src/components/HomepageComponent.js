import React from 'react'; 
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//dùng destructuring gán cho biến mới cùng tên
//Khi MainComponent gửi props qua HomepageComponent thì props có chứa 3 thuộc tính : dish,dishesLoading,dishesErrMess sẽ được gán cho 3 biến cùng tên
export function RenderCard({ item,isLoading,errMess}){
  //still do the generic structure
  console.log(item)
  if (isLoading) {
    return(
            <Loading />
    );
  }
  else if (errMess) {
    return(
      //các row và col đã có ở HomePage
            <h4>{errMess}</h4>
    );
  }
  else 
    return(
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
        <CardBody>
          <CardTitle>{item.name} </CardTitle>
             {item.designation?<CardSubtitle>{item.designation}</CardSubtitle>:null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    )
}
  
  //https://blog.binarybits.net/call-react-function-from-html-with-parameter/
  //https://www.codingdeft.com/posts/react-calling-child-function-from-parent-component/
  export default function HomePage(props) {
      //update the HomeComponent.ts file to fetch and display the featured dish, promotion and leader
      //muốn call RenderCard function từ Home function thì không ghi RenderCard() mà gọi reference của nó <RenderCard/>
      //const {name}=useParams()//https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
      //console.log(name);

      /*
      const queryParams = new URLSearchParams(window.location.search);
      const USERname = queryParams.get('username');
      const rating = queryParams.get('rating');
      const comment = queryParams.get('comment');
      console.log(USERname,rating,comment); //YAY!
      */
      console.log(props.dish)

      return(
        
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md m-1">
                <RenderCard item={props.DISHES} isLoading={props.DISHLOADING} errMess={props.DISHERRORMESSAGE}/>
            </div> 
            <div className="col-12 col-md m-1">
                <RenderCard item={props.PROMOTION} isLoading={props.PROMOLOADING} errMess={props.PROMOERRORMESSAGE} />
            </div>
            <div className="col-12 col-md m-1">
                <RenderCard item={props.LEADERS}/>
            </div>
          </div>
        </div>
      );
  }