
function App() {
  //render <Menu/> sẽ gặp Error: Media is not defined
  //https://stackoverflow.com/questions/49081549/passing-object-as-props-to-jsx
    return (
        <div>
           <Menu dishes={DISHES}/>
        </div>
    );
}

/*
Bài giảng Coursera:
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

. . .

  <Menu dishes={this.state.dishes} />   //truyền state.dishes cho Menu, và Menu nhận với this.props.dishes
*/


