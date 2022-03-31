class ModalExample extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props);
    }
  
    render() {
      return (
        <div>
          
  
          <Reactstrap.Modal
            isOpen={this.props.isModalOpen}
            toggle={this.props.toggleModalView}
            className={this.props.className}
          >
            <Reactstrap.ModalHeader toggle={this.props.toggleModalView}>
              Modal title
            </Reactstrap.ModalHeader>
            <Reactstrap.ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Reactstrap.ModalBody>
            <Reactstrap.ModalFooter>
              <Reactstrap.Button color="primary" onClick={this.props.toggleModalView}>
                Do Something
              </Reactstrap.Button>
              <Reactstrap.Button color="secondary" onClick={this.props.toggleModalView}>
                Cancel
              </Reactstrap.Button>
            </Reactstrap.ModalFooter>
          </Reactstrap.Modal>
        </div>
      );
    }
  }