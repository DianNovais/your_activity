import React from "react";

// interface
import { Itask } from "../../interfaces/Itask";

// CSS
import styles from "./TaskList.module.css";

type Props = {
  viewTaskList: Itask[];
  deleteHandler(id: number): void;
  handleEdit(task: Itask):void;
};

function TaskList({ viewTaskList, deleteHandler, handleEdit }: Props) {
  return (
    <>
       {viewTaskList.length < 1 ? (
        <p>Não á nenhuma atividade aqui :(</p>
      ) : (
        viewTaskList.length > 0 && viewTaskList.map((task) => (
          <div key={task.id} className={styles.list_container}>
            <div className={styles.list_content}>
              <h3>{task.title}</h3>
              <b>Dificuldade: {task.difficulty}</b>
            </div>
            <div className={styles.list_functions}>
              <i
                className="bi bi-trash3"
                onClick={() => deleteHandler(task.id)}
              ></i>
              <i className="bi bi-pencil-fill" onClick={() => handleEdit(task)}></i>
            </div>
          </div>
        ))
      )}
      
    </>
  );
}

export default TaskList;
