import React from 'react';
import logo from "../logoLA.jpg";
import "./styleTaskBanner.css";

export const TaskBanner = (props) => (
    <h4 className="bg-primary text-white text-center p-4" >
        <img src={logo} alt="" style={{'borderRadius':'50%'}} width="80" height="80" />
        <b> Aplicacion de Tareas 📝 ({props.taskItems.filter(t => !t.hecho).length !== 1 ? props.taskItems.filter(t => !t.hecho).length + " Tareas Pendientes" : props.taskItems.filter(t => !t.hecho).length + " Tarea Pendiente"  })</b>
        <p className="h6" id="creditos" >With ❤ by Francisco Pautt </p>
    </h4>
)