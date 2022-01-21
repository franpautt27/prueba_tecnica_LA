import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from 'uuid';

export const TaskCreator = (props) => {
    // creamos una variable de estado para almacenar el nuevo nombre de la tarea a crear
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const newTaskId = uuidv4();

    // creamos una variable de estado para almacenar el nuevo nombre de la decripcion a crear
    const updateNewTaskValue = e => setNewTaskName(e.target.value);
    const updateNewTaskDescription = e => setNewTaskDescription(e.target.value);

    // funcion que permite la agregacion de una nueva tarea (con validaciones)
    const createNewTask = () => {
        let inputTitulo = document.getElementById("titulo");
        let inputDescripcion = document.getElementById("descripcion");
        if(inputTitulo.value !== "" && inputDescripcion.value !== ""){
            props.callback(newTaskName, newTaskDescription, newTaskId)
            console.log(newTaskName);
            setNewTaskName("");
            console.log(newTaskDescription);
            setNewTaskDescription("");
            handleClose();
        }else{
            alert("Por favor, no dejar ningun campo vacio");
        }
        
    }
    // Modals functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setNewTaskName("");
        setNewTaskDescription("");
    };

    return (

        <>
      <Button className="m-4" variant="primary" onClick={handleShow}>
        <i className="fas fa-plus"></i> Agregar nueva tarea
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="my-1">
            <label htmlFor="titulo" className="m-2">Ingrese el titulo de la tarea:</label>
            <input id="titulo" type="text" placeholder="Ingrese el titulo de la tarea"
            className="form-control"
            value={newTaskName}
            onChange={updateNewTaskValue}
            />
            <label htmlFor="descripcion" className="m-2">Ingrese la descripcion de la tarea:</label>

            <input className="form-control"
             type="text" id="descripcion"
              list="lista"
               placeholder="Ingrese la descripcion de la tarea"
               value={newTaskDescription}
               onChange={updateNewTaskDescription}
               />
            <datalist id="lista">
                { props.data.map( item => 
                  <option key={item.fact} value={item.fact}> {item.fact} </option>
                  ) }         
            </datalist>

            

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={createNewTask}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>



    )
}