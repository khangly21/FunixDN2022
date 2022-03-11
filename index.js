


function Hello() {
    return <h1>Hello World!</h1>;
}

function Reactstrap_button() { //nếu ghi không viết hoa ký tự đầu tiên : reactstrap_button() thì:
    //Warning: the tag <reactstrap_button/> is unrecognised in this browser. If you meant to render a React component, start its name with an uppercase letter.
    return <Reactstrap.Button>Button using Reactstrap</Reactstrap.Button>
}

//using JSX to define the view of component
const React_element=(
    <div>
        <App/>
    </div>
    
)
  
ReactDOM.render(React_element, document.getElementById("root"));

