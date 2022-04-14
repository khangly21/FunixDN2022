import React from 'react'; 
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,CardText } from 'reactstrap';


//Khi 1 file có 2 function components là RenderCard và Home , thì export default cái nào? Home (đồng thời trước function RenderCard sẽ không có chữ export nào là bài anh Đạt, cũng nên có chữ export để xem references trong cùng file)
export function RenderCard(props){
  //bên trong { } là biến Javascript hay JS expression
  // các biến trong đối tượng leader
  const message=props.item;
  console.log(message);
  console.log(message.id); // 0 
  //React.createElement không đọc được <Reactstrap.CardBody> sẽ trả undefined type
  //chú ý : nếu `CardBody` không render được phải chuyển thành `Card body`
  return(
    <Card>
      <CardImg src={message.image} alt={message.name}></CardImg>
      <CardBody>
        <CardTitle>{message.name} </CardTitle>
        {message.designation?<CardSubtitle>{message.designation}</CardSubtitle>:null}
        <CardText>{message.description}</CardText>
      </CardBody>
    </Card>
  )
}

//https://blog.binarybits.net/call-react-function-from-html-with-parameter/
//https://www.codingdeft.com/posts/react-calling-child-function-from-parent-component/
export default function Home(props) {
    //update the HomeComponent.ts file to fetch and display the featured dish, promotion and leader
    //muốn call RenderCard function từ Home function thì không ghi RenderCard() mà gọi reference của nó <RenderCard/>
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