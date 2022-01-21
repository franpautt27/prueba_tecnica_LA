import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const TaskEditor = (props) => {
  //se hace uso de un elemento Modal del paquete react-bootstrap para mostrar ventanas flotantes
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); //funcion para cerrar el modal
  const handleShow = () => { //funcin para abrir el modal junto con la funcionalidad de editar
    setShow(true);
    setEditTaskName(props.nombreTarea);
    setEditTaskDescription(props.descripcionTarea);
  };
  // aqui se declara la variable de estado que contendra el nuevo valor editado del nombre
  const [editTaskName, setEditTaskName] = useState(props.nombreTarea);
  const editNewTaskValue = e => setEditTaskName(e.target.value);
  // aqui se declara la variable de estado que contendra el nuevo valor editado de la descripcion
  const [editTaskDescription, setEditTaskDescription] = useState(props.descripcionTarea);
  const editNewTaskDescription = e => setEditTaskDescription(e.target.value);

  // funcion para lograr la modificacion
  const editOldTask = () => {
    let inputTitulo = document.getElementById("tituloEdit");
    let inputDescripcion = document.getElementById("descripcionEdit");
    if(inputTitulo.value.trim() !== "" && inputDescripcion.value.trim() !== ""){
      props.editTask(editTaskName, editTaskDescription, props.idTarea);
      console.log(editTaskName);
      setEditTaskName(inputTitulo.value);
      console.log(editTaskDescription);
      setEditTaskDescription(inputDescripcion.value);
      handleClose();
    }else{
      alert("Por favor, no dejar ningun campo vacio");
    }
  }

  return (
    <>
    <Button className="m-1" variant="warning" onClick={handleShow}>
      <i className="fas fa-pencil-alt"></i>
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-1">
            <label htmlFor="titulo" className="m-2">Ingrese el nuevo titulo de la tarea a editar:</label>
            <input 
            id="tituloEdit" 
            type="text" 
            className="form-control"  
            value={editTaskName}
            onChange={editNewTaskValue} />

            <label htmlFor="descripcionEdit" className="form-label m-2">Ingrese la nueva descripcion de la tarea a editar:</label>
            <textarea 
            className="form-control" 
            id="descripcionEdit" 
            rows="3"
            defaultValue={editTaskDescription}
            onChange={editNewTaskDescription}
            ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="warning" onClick={editOldTask}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};
