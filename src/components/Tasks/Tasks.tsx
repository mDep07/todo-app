import React, { useState } from "react";
import moment from "moment";
// import { IoChevronDown, IoChevronUp } from "react-icons/io5";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Divider from "../utils/Divider";

import type { ITask } from '../../interfaces/task';

import TaskForm from './TaskForm';
import Task from './Task';
// import Button from '../Button';

type Params = {
  tasks: ITask[];
  create: (task: ITask) => void;
  finish: (taskId: string, finished: boolean) => void;
  remove: (taskId: string) => void;
};

export default function Tasks({ tasks, create, finish, remove }: Params) {
  const [taskActive, setTaskActive] = useState('');
  
  const toggleTaskActive = (taskId: string) => {
    if (taskId === taskActive) setTaskActive("");
    else setTaskActive(taskId);
  };

  const createTask = (task: string, important?: boolean) => {
    const taskFather = taskActive !== '' ? taskActive : undefined;
    create({ id: '', title: task, create_date: moment().format(), finished: false, task_id: taskFather, important });
    // toast.success('Created task successfully!');
  }

  const handleDeleteTask = (taskId: string) => {
    remove(taskId);
    setTaskActive('');
    
    // toast.success('Deleted task successfully!');
  }

  const handleFinishTask = (taskId: string, finished: boolean) =>
    finish(taskId, finished);

  const getSubTasks = (taskId: string) => {
    return tasks.filter((t) => t.task_id === taskId);
  };

  return (
    <div>
      <TaskForm
        addTask={createTask}
        disabled={taskActive !== ""}
        showMoreConfig
      />

      <Divider />
      
      <div>
        <ul style={{ padding: "0", margin: "0" }}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              subtasks={getSubTasks(task.id)}
              isActive={taskActive === task.id}
              toggleActive={toggleTaskActive}
              finish={handleFinishTask}
              remove={handleDeleteTask}
            >
              <TaskForm
                addTask={createTask}
                disabled={task.finished}
              />
            </Task>
          ))}
        </ul>
      </div>

      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </div>
  );
}
