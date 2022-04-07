import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoFolderOutline, IoClose } from 'react-icons/io5';
import { IFolder } from '../../interfaces/folder';
import { ITask } from '../../interfaces/task';

import FoldersService from '../../services/folders';
import TasksService from '../../services/tasks';

import Chip from '../../styles/Chip';

const _tasks = new TasksService();
const _folders = new FoldersService();

type TasksFiltersParams = {
  setTasks: (tasks: ITask[]) => void,
  filters: { folderId?: string }
}
export default function TasksFilters({ setTasks, filters }: TasksFiltersParams) {

  const [filter, setFilter] = useState<{ folder?: IFolder } | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const { folderId } = filters;
    if(folderId) {
      setFilter({ folder: _folders.getById(folderId) })
    }
  }, [filters])

  const handleClearFilter = () => {
    const tasks = _tasks.getAll();
    setTasks(tasks);
    setFilter(null);
    navigate('/tasks')
  }

  return (
    <div>
      {
        filter && (
          <div style={{ marginBottom: 10 }}>
            {
              filter?.folder && (
                <Chip>
                  <IoFolderOutline />
                  {filter?.folder.title}
                  <button onClick={handleClearFilter}>
                    <IoClose />
                  </button>
                </Chip>
              )
            }
          </div> 
        )
      }
    </div>
  )
}