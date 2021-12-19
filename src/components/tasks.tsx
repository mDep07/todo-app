import React, { FormEvent, useState, useRef } from 'react';

interface ITask {
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
  const [tasks, setTasks] = useState(listTasks)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const lastId = tasks.map(t => t.id).sort().at(-1) || 0;
    const newId = lastId + 1;
    if(inputRef.current && newId) {
      const taskFather = taskActive !== 0 ? taskActive : undefined;
      setTasks([...tasks, { id: newId, title: inputRef.current.value, create_date: '2021-12-01', finish: false, task_id: taskFather }])
      inputRef.current.value = '';
    }
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks([...tasks.filter(t => t.id !== taskId)])
  }

  const handleFinishTask = (taskId: number) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const task = tasks.find(t => t.id === taskId);
    if(task) setTasks([...tasks.slice(0, taskIndex), {...task, finish: !task.finish }, ...tasks.slice(taskIndex + 1)])
  }

  const [taskActive, setTaskActive] = useState(0);
  const toggleTaskActive = (taskId: number) => {
    if(taskId === taskActive) setTaskActive(0);
    else setTaskActive(taskId);
  } 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" placeholder="Task..." />
        <button type="submit">Add</button>
      </form>
      <ul style={{ padding: '0', margin: '0' }}>
        {tasks.filter(t => !t.task_id).map(task => {
          return (
            <li key={task.id} style={{ 
              border: '1px solid', 
              margin: '5px 0',  
            }}>
              <div style={{
                display: 'flex',
              }}>
                <div style={{ padding: '5px', }}>
                  <input type="checkbox" onChange={() => handleFinishTask(task.id)} checked={task.finish} />
                </div>
                <div style={{ padding: '5px', flex: 5, }}>
                  {task.id}) {task.title} - <small>Create: {task.create_date}</small>
                </div>
                <div style={{ padding: '5px',}}>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  <button onClick={() => toggleTaskActive(task.id)}>
                    {taskActive === task.id ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {taskActive === task.id &&
                (<div style={{ padding: '5px' }}>
                  <form onSubmit={handleSubmit}>
                    <input ref={inputRef} type="text" placeholder="Task..." />
                    <button type="submit">Add</button>
                  </form>
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
                            <input type="checkbox" onChange={() => handleFinishTask(subtask.id)} checked={subtask.finish} />
                          </div>
                          <div style={{ padding: '5px', flex: 5, }}>
                            {subtask.id}) {subtask.title} - <small>Create: {subtask.create_date}</small>
                          </div>
                          <div style={{ padding: '5px',}}>
                            <button onClick={() => handleDeleteTask(subtask.id)}>Delete</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>)
              }
            </li>
          )
        })}
      </ul>
    </div>
  ) 
}
