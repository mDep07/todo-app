import React, { FormEvent, useState, useRef } from 'react';

interface ITask {
  id: number;
  title: string;
  create_date: string;
  finish: boolean;
  task_id?: number;
}
const listTasks: ITask[] = [
  { id: 1, title: 'Task 1', create_date: '2021-12-18', finish: false },
  { id: 2, title: 'Task 2', create_date: '2021-12-18', finish: false },
  { id: 3, title: 'Task 3', create_date: '2021-12-18', finish: false },
]
export default function Tasks() {
  const [tasks, setTasks] = useState(listTasks)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newId = tasks.map(t => t.id).sort().at(-1);
    if(inputRef.current && newId) {
      setTasks([...tasks, { id: newId + 1, title: inputRef.current.value, create_date: '2021-12-01', finish: false }])
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" placeholder="Task..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ border: '1px solid', margin: '5px 0' }}>
            <div>
              <input type="checkbox" onClick={() => handleFinishTask(task.id)} checked={task.finish} /> {task.id}) {task.title} - <small>Create: {task.create_date}</small>
            </div>
            <div>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) 
}
