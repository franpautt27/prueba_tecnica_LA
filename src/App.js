import { useState, useEffect } from "react";
import {TaskRow} from "./components/TaskRow";
import {TaskBanner} from './components/TaskBanner';
import { TaskCreator } from "./components/TaskCreator";
import toast from 'react-simple-toasts';
import { VisibilityControl } from "./components/VisibilityControl";

function App() {

  const [taskItems, setTaskItems] = useState([
    { nombre: "Tarea 1", hecho: false, descripcion: "Descripcion Tarea 1" },
    { nombre: "Tarea 2", hecho: false, descripcion: "Descripcion Tarea 2" },
    { nombre: "Tarea 3", hecho: true, descripcion: "Descripcion Tarea 3" },
    { nombre: "Tarea 4", hecho: false, descripcion: "Descripcion Tarea 4" }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect( () => {
    let data = localStorage.getItem("tasks");
    if (data !== null){
      setTaskItems(JSON.parse(data));
    }else{
      setTaskItems([
        { nombre: "Tarea 1 ejemplo", hecho: false, descripcion: "Descripcion Tarea 1 ejemplo" },
        { nombre: "Tarea 2 ejemplo", hecho: false, descripcion: "Descripcion Tarea 2 ejemplo" },
        { nombre: "Tarea 3 ejemplo", hecho: true, descripcion: "Descripcion Tarea 3 ejemplo" },
        { nombre: "Tarea 4 ejemplo", hecho: false, descripcion: "Descripcion Tarea 4 ejemplo" }
      ])
      setShowCompleted(true);
    }
  }, []);
  useEffect( () => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems] );

  const createNewTask = (taskName, taskDescription) =>{
    if(!taskItems.find(t => t.nombre === taskName)){
      setTaskItems([...taskItems, {nombre: taskName, descripcion:taskDescription, hecho:false }]);
      toast("Tarea agregada correctamente :)");
    }else{
      toast("Tarea ya existe! >:(");
    }
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
      <TaskRow task={task} key={task.nombre} toggleTask={toggleTask} />
  ));

  const [searchTerm, setSearchTerm] = useState("");  
  
  

  return (
    <div >
      <TaskBanner taskItems={taskItems} />
      <div className="container ">
        <TaskCreator callback = {createNewTask} />
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
        
      </div>
      
      <table className="table table-striped table-bordered table-hover w-75 m-auto">
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

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl 
        taskItems={taskItems}
        isChecked={showCompleted} 
        callback={checked => setShowCompleted(checked)} />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered table-hover w-75 m-auto mb-5">
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
        )
      }


    </div>
  );
}

export default App;
