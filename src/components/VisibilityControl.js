import React from 'react'

export const VisibilityControl = (props) => {
    return (
        <div className="form-check form-switch d-flex justify-content-center my-3">
           <input 
           type="checkbox"
           className="form-check-input mx-2"
           role="switch"
           id="flexSwitchCheckDefault"
           checked={props.isChecked}
           onChange={ e => props.callback(e.target.checked) }
           /> 
           <label htmlFor="flexSwitchCheckDefault"
           className="form-check-label" > 
            Mostrar {props.taskItems.filter(t => t.hecho).length !== 1 ? props.taskItems.filter(t => t.hecho).length + " Tareas Realizadas" : props.taskItems.filter(t => t.hecho).length + " Tarea Realizada" }
            </label>
        </div>
    )
}
