function Modal(){
    const [modal,setModal]=React.useState(false); 
    //Toggle for Modal
    const toggle=()=>setModal(!modal); 

    return(
      
        <div style={{
            display:'block',width:700,padding:30
        }}>
            <h4>ReactJS Reactstrap Modal component</h4>
            <Reactstrap.Button color="primary"
                onClick={toggle}
            >
                Open Modal
            </Reactstrap.Button>

             
            <Reactstrap.Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{timeout:2000}}
            >
                <Reactstrap.ModalBody>
                    Simple Modal with just ModalBody...
                    <Reactstrap.Button color="success"
                        onClick={toggle}
                    >
                        Close Modal
                    </Reactstrap.Button>
                </Reactstrap.ModalBody>
            </Reactstrap.Modal>
        </div>
    )
}