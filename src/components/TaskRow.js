import React from "react";
export const TaskRow = (props) => (
   
        <tr key= {props.task.nombre} >
          <td> { props.task.nombre }</td>
          <td> { props.task.descripcion }</td>
          <td> <input 
                    type="checkbox" 
                    checked={props.task.hecho} 
                    onChange={ () => props.toggleTask(props.task) } 
                    /></td>
            <td>
                <a style={ { cursor: 'pointer' } }>
                    <i className="fas fa-pencil-alt p-2 text-warning "></i>
                </a>
                <a style={ { cursor: 'pointer' } }>
                    <i className="fas fa-trash-alt text-danger"></i>
                </a>
                
            </td>
        </tr> 
    
);