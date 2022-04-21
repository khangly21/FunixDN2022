import React from 'react'; 
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,CardText } from 'reactstrap';
import { FadeTransform } from 'react-animation-components'; //now both fading and transformation can be applied to React app that is enclosed inside FadeTransformation
import { baseUrl } from '../shared/baseUrl';

//Khi 1 file có 2 function components là RenderCard và Home , thì export default cái nào? Home (đồng thời trước function RenderCard sẽ không có chữ export nào là bài anh Đạt, cũng nên có chữ export để xem references trong cùng file)
export function RenderCard({item, isLoading, errMess}){
  if(isLoading){
    return(
        <Loading />
    );
  }
    else if(errMess) {
        return(
            <h4>{errMess}</h4>
        );
  }
  else
     return(
       //ngoài FadeTransform còn rất nhiều components nữa trong packkage react-animation-components
       //translate Y là above to in place
       //THÊM keyword "in"  , do đó nó cần in prop
       //card will be out of the screen and then in a small random pop up to the screen and then rendered
       <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
           <Card>
             <CardImg src={baseUrl+item.image} alt={item.name}/>
             <CardBody>
               <CardTitle>{item.name} </CardTitle>
               {item.designation?<CardSubtitle>{item.designation}</CardSubtitle>:null}
               <CardText>{item.description}</CardText>
             </CardBody>
           </Card>
       </FadeTransform>
       
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
              <RenderCard item={props.dish}
                   isLoading={props.dishesLoading}
                   errMess={props.dishesErrMess}
              />
          </div> 
          <div className="col-12 col-md m-1">
              <RenderCard item={props.promotion}
                    isLoading={props.promoLoading}
                    errMess={props.promoErrMess}
              />
          </div>
          <div className="col-12 col-md m-1">
              <RenderCard item={props.leader}/>
          </div>
        </div>
      </div>
    );
}