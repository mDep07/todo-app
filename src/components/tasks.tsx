import React, { useState} from 'react';
import moment from 'moment';

import type { ITask } from '../App';
import TaskForm from './TaskForm';
import Task from './Task';

type Params = { 
  tasks: ITask[], 
  create: (task: ITask) => void, 
  finish: (taskId: string) => void, 
  remove: (taskId: string) => void 
};

export default function Tasks({ tasks, create, finish, remove }: Params) {
  //const [tasks, setTasks] = useState(listTasks);
  
  const [taskActive, setTaskActive] = useState('');
  const toggleTaskActive = (taskId: string) => {
    if(taskId === taskActive) setTaskActive('');
    else setTaskActive(taskId);
  }

  const createTask = (task: string) => {
    const taskFather = taskActive !== '' ? taskActive : undefined;
    create({ id: '', title: task, create_date: moment().format(), finish: false, task_id: taskFather });
  }

  const handleDeleteTask = (taskId: string) => remove(taskId);

  const handleFinishTask = (taskId: string) => finish(taskId);

  const getSubTasks = (taskId: string) => {
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
                  isChild
                />
              ))}
            </div>
          </Task>
        ))}
      </ul>
    </div>
  ) 
}
