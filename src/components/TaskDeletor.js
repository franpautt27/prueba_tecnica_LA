import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const TaskDeletor = (props) => {
  // se hace uso del elemento Modal de react-bootstrap
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return ( 
    <>
    <Button className="m-1" variant="danger" onClick={handleShow}>
        <i className="fas fa-trash-alt "></i>
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Esta seguro de eliminar la tarea {props.nombreTarea}? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="danger" 
        onClick={ ()=>{
            props.deleteTask(props.idTarea);
            handleClose();
            }
            
        }>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
};
