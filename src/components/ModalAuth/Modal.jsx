import { Modal,Button } from "react-bootstrap";
import Login from "./Login";
import { useState } from "react";
import Register from "./Register";

function ModalAuth({show,handleClose,handleShow}) {
    const [isType, setIsType] = useState(true)

  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
              {isType ? <Login handleClose={handleClose} /> : <Register/>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{setIsType(!isType)}}>
             {isType ? "Register" : "Login"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ModalAuth;