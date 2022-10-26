import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

// CSS
import styles from "./TaskForm.module.css";

import { Itask } from "../../interfaces/Itask";

type Props = {
  btnText: string;
  taskList: Itask[];
  setTaskList?: React.Dispatch<React.SetStateAction<Itask[]>>;
  task?: Itask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
};

function TaskForm({ btnText, taskList, setTaskList, task, handleUpdate }: Props) {
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  const [id, setId] = useState<number>(0);

  console.log(taskList);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDifficulty(task.difficulty);
      setId(task.id)
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, difficulty );
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: Itask = { id, title, difficulty };

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDifficulty(0);
    }
  };

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          name="title"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Adicione um Título"
          value={title || ""}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          name="difficulty"
          type="number"
          onChange={(e) => setDifficulty(parseInt(e.target.value))}
          placeholder="Adicione uma dificuldade"
          value={difficulty || ""}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
}

export default TaskForm;
