import { useState, useEffect } from "react";
import {TaskRow} from "./components/TaskRow";
import {TaskBanner} from './components/TaskBanner';
import { TaskCreator } from "./components/TaskCreator";
import toast from 'react-simple-toasts';
import { VisibilityControl } from "./components/VisibilityControl";
import { v4 as uuidv4 } from 'uuid';

function App() {

  //se nombra una variable de estado para almacenar la lista de frases de gatos de la API
  const [data, setData] = useState([]);

  //  con esta funcion se traen los datos de la APIRest de frases de gatos a la interfaz
  // cabe aclarar que hay mas de 300 registros de frases y se seleccionan 10 de manera aleatoria
  // cada vez que se cargue la pagina
  const apiGet = () => {
    fetch("https://catfact.ninja/facts")
      .then( (response) => response.json())
      .then( (json) => {
        setData(json.data);
      } );
  };
  // para que los datos esten en el storage una vez se cargue la pagina, se hace uso del useEffect
  useEffect( ()=> {
    apiGet();
  }, [])
  // Hacemos un useState con datos de tareas de ejemplo para hacer las pruebas 
  const [taskItems, setTaskItems] = useState([
    { id: uuidv4(), nombre: "Tarea 1", hecho: false, descripcion: "Descripcion Tarea 1" },
    {  id: uuidv4(), nombre: "Tarea 2", hecho: false, descripcion: "Descripcion Tarea 2" },
    {  id: uuidv4(), nombre: "Tarea 3", hecho: true, descripcion: "Descripcion Tarea 3" },
    {  id: uuidv4(), nombre: "Tarea 4", hecho: false, descripcion: "Descripcion Tarea 4" }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);
  //se hace uso del ultimo useEffect  para que se carguen datos de ejemplo en caso de que se limpie todo el storage
  useEffect( () => {
    let data = localStorage.getItem("tasks");
    if (data !== null){
      setTaskItems(JSON.parse(data));
    }else{
      setTaskItems([
        { id: uuidv4(), nombre: "Tarea 1 ejemplo", hecho: false, descripcion: "Descripcion Tarea 1 ejemplo" },
        { id: uuidv4(), nombre: "Tarea 2 ejemplo", hecho: false, descripcion: "Descripcion Tarea 2 ejemplo" },
        { id: uuidv4(), nombre: "Tarea 3 ejemplo", hecho: true, descripcion: "Descripcion Tarea 3 ejemplo" },
        { id: uuidv4(), nombre: "Tarea 4 ejemplo", hecho: false, descripcion: "Descripcion Tarea 4 ejemplo" }
      ])
      setShowCompleted(true);
    }
  }, []);
  useEffect( () => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems] );
  // funcion para crear una tarea nueva
  const createNewTask = (taskName, taskDescription, taskId) =>{
    if(!taskItems.find(t => t.id === taskId)){
      setTaskItems([...taskItems, {id: taskId, nombre: taskName, descripcion:taskDescription, hecho:false }]);
      toast("Tarea agregada correctamente 😊");
    }else{
      toast("Tarea ya existe!");
    }
  }
  // funcion para editar una tarea registrada
  const editTask = (taskName, taskDescription, taskId) => {
     if(taskItems.find( t=> t.id === taskId )){
       setTaskItems( taskItems.map( t =>{
         if(t.id === taskId) {
           t.nombre = taskName;
           t.descripcion = taskDescription;
         }
         return t;
       } ) );
       toast("Tarea modificada correctamente 😊");
     }else{
       toast("La tarea no existe!")
     }
   }
   // funcion para eliminar una tarea registrada
  const deleteTask = (id) => {      
    setTaskItems(taskItems.filter( t => t.id !== id ));
    toast("Tarea eliminada correctamente 😊");
  }
  // esto es para hacer que una tarea pueda modificar su atributo booleano de Hecho con un checkbox
  const toggleTask = task => 
    setTaskItems( taskItems.map(t => (t.id === task.id ? {...t, hecho : !t.hecho} : t )) )
  // esto es para separar las tareas hechas con las pendientes en tablas distintas
  //y luego se usa el segundo filtro para que lal busqueda instantanea de la descripcion funcione
  const taskTableRows = (valorHecho) => 
    taskItems
    .filter(task => task.hecho === valorHecho)
    .filter(val => {
      if(searchTerm === ""){
        return val;
      }else if( val.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ){
        return val;
      }
    })
    .map(task => (
      <TaskRow task={task} key={task.id} toggleTask={toggleTask} deleteTask = {deleteTask} editTask = {editTask} />
  ));
  // se declara la variable de estado para el valor de la busqueda 
  const [searchTerm, setSearchTerm] = useState("");  
  
  

  return (
    <div >
      <TaskBanner taskItems={taskItems} />
      <div className="container ">
        <TaskCreator callback = {createNewTask} data = {data} />
        <div className="d-flex justify-content-center mb-3">
          <i className="fas fa-search mx-3 h4" ></i>
          <input 
          className="form-control w-50 "
          type="text"
          placeholder="Buscar descripción..."
          onChange={ (e) => {
            setSearchTerm(e.target.value)
          }}
          />
        </div>
        
        <table className="table table-striped table-bordered table-hover m-auto">
        <thead >
          <tr>
            <th>Tarea</th>
            <th>Descripcion</th>
            <th>Hecho</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      </div>
      
      

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl 
        taskItems={taskItems}
        isChecked={showCompleted} 
        callback={checked => setShowCompleted(checked)} />
      </div>

      {
        showCompleted && (
          <div className="container">
            <table className="table table-striped table-bordered table-hover m-auto mb-5">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Descripcion</th>
                <th>Hecho</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
          </div>
          
        )
      }


    </div>
  );
}

export default App;
