import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import type { ITask } from '../interfaces/task';

import TaskForm from './TaskForm';
import Task from './Task';
import Button from './Button';

type Params = { 
  tasks: ITask[], 
  create: (task: ITask) => void, 
  finish: (taskId: string) => void, 
  remove: (taskId: string) => void 
};

export default function Tasks({ tasks, create, finish, remove }: Params) {

  type TGroupedTasks = { today: ITask[], pending: ITask[], overdue: ITask[] };
  const initialState: TGroupedTasks = { today: [], pending: [], overdue: [] };
  const [groupedTasks, setGroupedTasks] = useState(initialState);

  useEffect(() => {
    
    const todaysTasks = tasks.filter(t => moment().startOf('day').isSame(moment(t.create_date).startOf('day')));
    const pendingTasks = tasks.filter(t => moment(t.create_date).isBefore(moment().startOf('day')));
    const overdueTasks = tasks.filter(t => moment(t.create_date).isBefore(moment().startOf('day')) && t.expiration_date);
    
    setGroupedTasks({
      today: todaysTasks,
      pending: pendingTasks,
      overdue: overdueTasks
    });

  }, [tasks]);

  // useEffect(() => console.log({groupedTasks}), [groupedTasks])
  
  const [taskActive, setTaskActive] = useState('');
  const toggleTaskActive = (taskId: string) => {
    if(taskId === taskActive) setTaskActive('');
    else setTaskActive(taskId);
  }

  const [showGroupedTasks, setShowGroupedTasks] = useState(['today', 'pending', 'overdue']);
  const toggleShowGroupedTasks = (groupedTask: string) => {
    if(!showGroupedTasks.includes(groupedTask)) {
      setShowGroupedTasks([...showGroupedTasks,groupedTask])
    } else {
      const groupedTasksIndex = showGroupedTasks.indexOf(groupedTask);
      setShowGroupedTasks([
        ...showGroupedTasks.slice(0, groupedTasksIndex), 
        ...showGroupedTasks.slice(groupedTasksIndex + 1)
      ])
    }
  }

  const createTask = (task: string) => {
    const taskFather = taskActive !== '' ? taskActive : undefined;
    create({ id: '', title: task, create_date: moment().format(), finished: false, task_id: taskFather });
  }

  const handleDeleteTask = (taskId: string) => remove(taskId);

  const handleFinishTask = (taskId: string) => finish(taskId);

  const getSubTasks = (taskId: string) => {
    return tasks.filter(t => t.task_id === taskId);
  }

  return (
    <div>
      <TaskForm addTask={createTask} disabled={taskActive !== ''} />
      {
        Object.keys(groupedTasks).map((g, index) => {

          if(g !== 'today' && g !== 'pending' && g !== 'overdue') return null

          return (
            <div key={index}>
              <Button small onClick={() => toggleShowGroupedTasks(g)}>
                {g} { showGroupedTasks.includes(g) ? <IoChevronUp /> : <IoChevronDown /> }
              </Button>
              {
                showGroupedTasks.includes(g) &&
                <div>
                  <ul style={{ padding: '0', margin: '0' }}>
                    {groupedTasks[g].filter(t => !t.task_id).map(task => (
                      <Task 
                        key={task.id}
                        task={task} 
                        isActive={taskActive === task.id} 
                        toggleActive={toggleTaskActive} 
                        finish={handleFinishTask}
                        remove={handleDeleteTask}
                      >
                        <div style={{padding: 10}}>
                          <TaskForm addTask={createTask} disabled={task.finished} />
                          {getSubTasks(task.id).map(t => (
                            <Task
                              key={t.id}
                              task={t}
                              finish={handleFinishTask}
                              remove={handleDeleteTask}
                              isChild
                              disabled={task.finished}
                            />
                          ))}
                        </div>
                      </Task>
                    ))}
                  </ul>
                </div>
              }
            </div>
          )
        })
      }
    </div>
  ) 
}
