import { useState, useEffect } from "react";
import {TaskRow} from "./components/TaskRow";
import {TaskBanner} from './components/TaskBanner';
import { TaskCreator } from "./components/TaskCreator";
import toast from 'react-simple-toasts';
import { VisibilityControl } from "./components/VisibilityControl";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch("https://catfact.ninja/facts")
      .then( (response) => response.json())
      .then( (json) => {
        setData(json.data);
      } );
  };

  useEffect( ()=> {
    apiGet();
  }, [])

  const [taskItems, setTaskItems] = useState([
    { id: uuidv4(), nombre: "Tarea 1", hecho: false, descripcion: "Descripcion Tarea 1" },
    {  id: uuidv4(), nombre: "Tarea 2", hecho: false, descripcion: "Descripcion Tarea 2" },
    {  id: uuidv4(), nombre: "Tarea 3", hecho: true, descripcion: "Descripcion Tarea 3" },
    {  id: uuidv4(), nombre: "Tarea 4", hecho: false, descripcion: "Descripcion Tarea 4" }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

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

  const createNewTask = (taskName, taskDescription, taskId) =>{
    if(!taskItems.find(t => t.id === taskId)){
      setTaskItems([...taskItems, {id: taskId, nombre: taskName, descripcion:taskDescription, hecho:false }]);
      toast("Tarea agregada correctamente 😊");
    }else{
      toast("Tarea ya existe!");
    }
  }

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

  const deleteTask = (id) => {      
    setTaskItems(taskItems.filter( t => t.id !== id ));
    toast("Tarea eliminada correctamente 😊");
  }

  const toggleTask = task => 
    setTaskItems( taskItems.map(t => (t.nombre === task.nombre ? {...t, hecho : !t.hecho} : t )) )

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
