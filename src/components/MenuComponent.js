//biểu diễn Menu Component bằng arrow-Functional component

//http://127.0.0.1:5500/index.html#/menu/2

const Menu = (props) =>{
    // class cha references to Menu là Main
    // map phải return something và mỗi child được return phải có key
    // nhận mảng props.dishes và phân tích nó ra thành nhiều dish, mỗi dish đều sử dụng props.onClick để nếu được click vào sẽ gọi cho class cha là Main
    const menu=props.dishes.map((dish)=>{ //xử lý Javascript cho mảng ngay trong JSX JSX_column_child để tạo ra JSX khác
        //trả về nhiều columns, mỗi column có key riêng, và mỗi column tái sử dụng hàm RenderMenuItem bằng cách gọi reference của hàm
        //gọi hàm RenderMenuItem bằng cách dùng reference<RenderMenuItem/>
        return(
            <div className="col-12 col-md-5 m-1"  key={dish.id}>
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        )
    })

    //bootstrap row
    return (
        <div className="container">
            <div className="row">
                <Reactstrap.Breadcrumb>

                    <Reactstrap.BreadcrumbItem>
                        <ReactRouterDOM.Link to="/home">Home</ReactRouterDOM.Link>  
                    </Reactstrap.BreadcrumbItem>

                    <Reactstrap.BreadcrumbItem active>
                        Menu
                    </Reactstrap.BreadcrumbItem>

                </Reactstrap.Breadcrumb>
            </div>

            <div className="row">
                {menu}
            </div>
        </div>
    );
}

function RenderMenuItem ({dish}) { //Nhận 2 biến thuộc tính từ Menu là {dish} và {onClick};  hàm onClick này được gọi với tham số dish.id khi Card được click vào
    //<Card/> is not defined, vì nó phải thuộc về một đối tượng nào
    //Không dùng </Reactstrap.CardImgOverlay> vì  bị "noise" làm khó thấy chữ
    return (
        <Reactstrap.Card>
            <ReactRouterDOM.Link to={`/menu/${dish.id}`}>
                <Reactstrap.CardImg width="100%" src={dish.image} alt={dish.name} />
                <Reactstrap.CardTitle>{dish.name}</Reactstrap.CardTitle>
            </ReactRouterDOM.Link>
        </Reactstrap.Card>
    );
}




