import React, { Component } from 'react'; 
import  {Button,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
class ModalExample extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props);
    }
  
    render() {
      return (
        <div>
          
  
          <Modal
            isOpen={this.props.isModalOpen}
            toggle={this.props.toggleModalView}
            className={this.props.className}
          >
            <ModalHeader toggle={this.props.toggleModalView}>
              Modal title
            </ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggleModalView}>
                Do Something
              </Button>
              <Button color="secondary" onClick={this.props.toggleModalView}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }