import React, { useState, useEffect } from "react";

import styles from "./App.module.css";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

// Interface
import { Itask } from "./interfaces/Itask";
import Modal from "./components/Modal/Modal";

function App() {
  const json = localStorage.getItem("taskList") || "{}";
  const storage = JSON.parse(json);
  const [taskList, setTaskList] = useState<Itask[]>(storage);
  const [viewTaskList, setViewTaskList] = useState<Itask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<Itask | null>(null);

  const deleteHandler = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const taskEdit = (task: Itask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: Itask = { id, title, difficulty };

    const updatedItem = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItem);
    hideOrShowModal(false);
  };

  useEffect(() => {
    const objectToJson = JSON.stringify(taskList);
    localStorage.setItem("taskList", objectToJson);

    const json = localStorage.getItem("taskList") || "{}";
    const jsonToObject = JSON.parse(json);
    if (jsonToObject) {
      setViewTaskList([...jsonToObject]);
    }
  }, [taskList]);

  

  return (
    <div>
      <Modal
        children={
          <TaskForm
            task={taskToUpdate}
            btnText="Criar tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O quê você vai fazer?</h2>
          <TaskForm
            task={taskToUpdate}
            btnText="Criar tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas Tarefas:</h2>
          <TaskList
            viewTaskList={viewTaskList}
            deleteHandler={deleteHandler}
            handleEdit={taskEdit}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
