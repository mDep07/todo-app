import React, { useState, useEffect } from 'react';

import TaskForm from './TaskForm';
import Task from './Task';

export interface ITask {
  id: number;
  title: string;
  create_date: string;
  finish: boolean;
  task_id?: number;
}

const listTasks: ITask[] = [
  { id: 1, title: 'task 1', create_date: '2021-12-18', finish: false },
  { id: 2, title: 'task 2', create_date: '2021-12-18', finish: false },
  { id: 3, title: 'task 3', create_date: '2021-12-18', finish: false },
  { id: 4, title: 'sub task 1 - 1', create_date: '2021-12-18', finish: false, task_id: 1 },
  { id: 5, title: 'sub task 2 - 1', create_date: '2021-12-18', finish: false, task_id: 1 },
]

export default function Tasks() {
  //const intialState: ITask[] = []
  const [tasks, setTasks] = useState(listTasks);
  
  const createTask = (task: string) => {
    const lastId = tasks.map(t => t.id).sort().at(-1) || 0;
    const newId = lastId + 1;
    const taskFather = taskActive !== 0 ? taskActive : undefined;
    setTasks([...tasks, { id: newId, title: task, create_date: '2021-12-01', finish: false, task_id: taskFather }])
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks([...tasks.filter(t => t.id !== taskId)])
  }

  const handleFinishTask = (taskId: number) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const task = tasks.find(t => t.id === taskId);
    if(task) {
      setTasks([...tasks.slice(0, taskIndex), {...task, finish: !task.finish }, ...tasks.slice(taskIndex + 1)]);
      if(!task.finish) {
        const tasksChildren = tasks.filter(t => t.task_id === task.id);
        console.log({tasksChildren, task})
        tasksChildren.forEach(taskChild => handleFinishTask(taskChild.id))
      }
    }
  }

  const [taskActive, setTaskActive] = useState(0);
  const toggleTaskActive = (taskId: number) => {
    if(taskId === taskActive) setTaskActive(0);
    else setTaskActive(taskId);
  }

  const getSubTasks = (taskId: number) => {
    return tasks.filter(t => t.task_id === taskId);
  }

  return (
    <div>
      <TaskForm addTask={createTask} />
      <ul style={{ padding: '0', margin: '0' }}>
        {tasks.filter(t => !t.task_id).map(task => (
          <Task 
            key={task.id}
            task={task} 
            isActive={taskActive === task.id} 
            toggleActive={toggleTaskActive} 
            finish={handleFinishTask}
            remove={handleDeleteTask}
          >
            <div style={{padding: 10}}>
              <TaskForm addTask={createTask} />
              {getSubTasks(task.id).map(t => (
                <Task
                  key={t.id}
                  task={t}
                  finish={handleFinishTask}
                  remove={handleDeleteTask}
                />
              ))}
            </div>
          </Task>
        ))}
      </ul>
    </div>
  ) 
}
