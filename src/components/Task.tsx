import React from 'react';
import TaskForm from './TaskForm';

import { ITask } from './Tasks';

type Params = { 
    task: ITask, 
    isActive?: boolean,
    toggleActive?: (taskId: number) => void,
    finish: (taskId: number) => void,
    remove: (taskId: number) => void,
    children?: JSX.Element[] | JSX.Element | null
    
};
export default function Task({ task, isActive, toggleActive, finish, remove, children }: Params) {

    const ToggleActiveTask = () => {
        if(!toggleActive) return null;
        
        return (
            <button onClick={() => toggleActive(task.id)}>
                {isActive ? 'Hide' : 'Show'}
            </button>
        )
    }
    return (
        <li key={task.id} style={{ 
            border: '1px solid', 
            margin: '5px 0',  
          }}>
            <div style={{
              display: 'flex',
            }}>
              <div style={{ padding: '5px', }}>
                <input type="checkbox" onChange={() => finish(task.id)} checked={task.finish} />
              </div>
              <div style={{ padding: '5px', flex: 5, }}>
                {task.id}) {task.title} - <small>Create: {task.create_date}</small>
              </div>
              <div style={{ padding: '5px',}}>
                <button onClick={() => remove(task.id)}>Delete</button>
                <ToggleActiveTask />
              </div>
            </div>
            {isActive && children}
            {/* {isActive &&
              (<div style={{ padding: '5px' }}>
                <TaskForm addTask={createTask} />
                <ul>
                {tasks.filter(t => t.task_id === task.id ).map(subtask => (
                    <li key={subtask.id} style={{ 
                      border: '1px solid', 
                      margin: '5px 0',  
                    }}>
                      <div style={{
                        display: 'flex',
                      }}>
                        <div style={{ padding: '5px', }}>
                          <input type="checkbox" onChange={() => finish(subtask.id)} checked={subtask.finish} />
                        </div>
                        <div style={{ padding: '5px', flex: 5, }}>
                          {subtask.id}) {subtask.title} - <small>Create: {subtask.create_date}</small>
                        </div>
                        <div style={{ padding: '5px',}}>
                          <button onClick={() => remove(subtask.id)}>Delete</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>)
            } */}
          </li>
    )
}