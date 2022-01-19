import React from "react";
import { TaskDeletor } from "./TaskDeletor";
import { TaskEditor } from "./TaskEditor";
export const TaskRow = (props) => (
   
        <tr key= {props.task.id} >
          <td className="col-md-2" > { props.task.nombre }</td>
          <td className="col-md-8"> { props.task.descripcion }</td>
          <td> <input 
                    type="checkbox" 
                    checked={props.task.hecho} 
                    onChange={ () => props.toggleTask(props.task) } 
                    /></td>
            <td>
                <TaskEditor nombreTarea = { props.task.nombre } descripcionTarea = {props.task.descripcion} idTarea = { props.task.id } editTask = {props.editTask} />
                <TaskDeletor nombreTarea = { props.task.nombre } idTarea = { props.task.id } deleteTask = { props.deleteTask } />
                
            </td>
        </tr> 
    
);