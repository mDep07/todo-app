import React, { useState, useEffect } from "react";
import moment from "moment";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { ITask } from "../interfaces/task";

import TaskForm from './TaskForm';
import Task from './Task';
import Button from './Button';

type Params = {
  tasks: ITask[];
  create: (task: ITask) => void;
  finish: (taskId: string, finished: boolean) => void;
  remove: (taskId: string) => void;
};

export default function Tasks({ tasks, create, finish, remove }: Params) {
  type TGroupedTasks = { today: ITask[]; pending: ITask[] };
  const initialState: TGroupedTasks = { today: [], pending: [] };
  const [groupedTasks, setGroupedTasks] = useState(initialState);
  const [taskActive, setTaskActive] = useState('');

  useEffect(() => {
    const todaysTasks = tasks.filter((t) =>
      moment().startOf("day").isSame(moment(t.create_date).startOf("day"))
    );
    const pendingTasks = tasks.filter((t) =>
      moment(t.create_date).isBefore(moment().startOf("day"))
    );

    setGroupedTasks({
      today: todaysTasks,
      pending: pendingTasks,
    });
  }, [tasks]);

  // useEffect(() => console.log({groupedTasks}), [groupedTasks])
  const toggleTaskActive = (taskId: string) => {
    if (taskId === taskActive) setTaskActive("");
    else setTaskActive(taskId);
  };

  const [showGroupedTasks, setShowGroupedTasks] = useState([
    "today",
    "pending",
  ]);
  const toggleShowGroupedTasks = (groupedTask: "today" | "pending") => {
    if (!showGroupedTasks.includes(groupedTask)) {
      setShowGroupedTasks([...showGroupedTasks, groupedTask]);
    } else {
      const groupedTasksIndex = showGroupedTasks.indexOf(groupedTask);
      setShowGroupedTasks([
        ...showGroupedTasks.slice(0, groupedTasksIndex),
        ...showGroupedTasks.slice(groupedTasksIndex + 1),
      ]);

      if (
        groupedTasks[groupedTask].findIndex((t) => t.id === taskActive) !== -1
      )
        toggleTaskActive("");
    }
  };

  const createTask = (task: string, important?: boolean) => {
    const taskFather = taskActive !== '' ? taskActive : undefined;
    create({ id: '', title: task, create_date: moment().format(), finished: false, task_id: taskFather, important });
    toast.success('Created task successfully!');
  }

  const handleDeleteTask = (taskId: string) => {
    remove(taskId)
    toast.success('Deleted task successfully!');
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
      {
        Object.keys(groupedTasks).map((g, index) => {
          if (g !== "today" && g !== "pending") return null;

          return (
            <div key={index}>
              <Button
                icon
                color="main"
                small
                onClick={() => toggleShowGroupedTasks(g)}
              >
                {g}{" "}
                {showGroupedTasks.includes(g) ? (
                  <IoChevronUp />
                ) : (
                  <IoChevronDown />
                )}
              </Button>
              {showGroupedTasks.includes(g) && (
                <div>
                  <ul style={{ padding: "0", margin: "0" }}>
                    {groupedTasks[g]
                      .filter((t) => !t.task_id)
                      .map((task) => (
                        <Task
                          key={task.id}
                          task={task}
                          subtasks={getSubTasks(task.id)}
                          isActive={taskActive === task.id}
                          toggleActive={toggleTaskActive}
                          finish={handleFinishTask}
                          remove={handleDeleteTask}
                          state={g}
                        >
                          <TaskForm
                            addTask={createTask}
                            disabled={task.finished}
                          />
                          {/* <div style={{padding: 10}}>
                            <small>
                              {getSubTasks(task.id).length}/{getSubTasks(task.id).filter(t => t.finished).length}
                            </small>
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
                          </div> */}
                        </Task>
                      ))}
                    </ul>
                  </div>
              )}
            </div>
          )
        })
      }

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
