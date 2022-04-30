import React, { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { IoFolderOutline, IoClose } from 'react-icons/io5';

import { IFolder } from '../../interfaces/folder';
import { ITask } from '../../interfaces/task';
import { ITag } from '../../interfaces/tag';

import FoldersService from '../../services/folders';
import TasksService from '../../services/tasks';
import TagsService from '../../services/tags';

// import Chip from '../../styles/Chip';
import DropDownMenu, { DropDownMenuAction, DropDownMenuContainer } from '../../styles/DropDownMenu';

const _tasks = new TasksService();
const _folders = new FoldersService();
const _tags = new TagsService();

const Container = styled.section`
  margin-bottom: 10px;
  text-align: right;
`;

const ColumnFilters = styled.div`
  text-align: left;
  display: flex;
  flex-direction: row; 
  gap: 15px;
  padding: 15px;

  & > div {
    display: flex;
    flex-direction: column; 
    width: 110px;
  }
`;

const ColumnFiltersTitle = styled.p`
  margin: 0 0 10px 0;
  text-align: center;
`;

const FiltersLabel = styled.label`
  text-overflow: ellipsis; 
  white-space: nowrap; 
  overflow: hidden; 
  width: 100%;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  &:last-child {
    border-bottom: none;
  }

  & input {
    cursor: pointer;
  }
`;

type TasksFiltersParams = {
  setTasks: (tasks: ITask[]) => void,
  filters: { folderId?: string, tagsId?: string }
}
export default function TasksFilters({ setTasks, filters }: TasksFiltersParams) {
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

  const initialFilterState = {
    folders: [], 
    tags: [],
  }
  const [filter, setFilter] = useState<{ folders: IFolder[], tags: ITag[], selectedTag?: ITag, selectedFolder?: IFolder }>(initialFilterState);
  // const navigate = useNavigate();

  useEffect(() => {
    const folders = _folders.getAll();
    const tags = _tags.getAll();

    setFilter({ folders, tags });
  }, [])

  useEffect(() => {
    const { folderId } = filters;
    if(folderId) {
      setFilter(prevState => ({...prevState, selectedFolder: prevState?.folders.find(f => f.id === folderId) }));
    }
  }, [filters])

  const handleClearFilter = () => {
    const tasks = _tasks.getAll();
    setTasks(tasks);
    setFilter(prevState => ({...prevState, selectedFolder: undefined, selectedTag: undefined }));
    setOpenDropDownMenu(!openDropDownMenu);
  }

  const handleToggleDropDownMenu = () => setOpenDropDownMenu(!openDropDownMenu);

  const handleApplyFilter = () => {
    setOpenDropDownMenu(!openDropDownMenu);
    if(filter.selectedFolder) {
      setTasks(_tasks.getAll(filter.selectedFolder.id));
    }
    
    if(!filter.selectedTag && !filter.selectedFolder) {
      setTasks(_tasks.getAll());
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name === 'folderId') {
      setFilter(prevState => ({...prevState, selectedFolder: prevState?.folders.find(f => f.id === value) }));
    }
    if(name === 'tagsId') {
      setFilter(prevState => ({...prevState, selectedTag: prevState?.tags.find(t => t.id === value) }));
    }
  }

  return (
    <Container>
      <DropDownMenuContainer>
        <DropDownMenu open={openDropDownMenu} right>
          <ColumnFilters>
            <div>
              <ColumnFiltersTitle>Folders</ColumnFiltersTitle>
              <FiltersLabel>
                <input name="folderId" type="radio" value="" onChange={handleChange} checked={!filter.selectedFolder} />
                All folders
              </FiltersLabel>
              {
                filter?.folders.map(folder => (
                  <FiltersLabel key={folder.id} >
                    <input 
                      name="folderId" 
                      type="radio" 
                      value={folder.id}
                      onChange={handleChange}
                    />
                    {folder.title}
                  </FiltersLabel>
                ))
              }
            </div>
            <div>
              <ColumnFiltersTitle>Tags</ColumnFiltersTitle>
              <FiltersLabel>
                <input name="tagsId" type="radio" value="" onChange={handleChange} checked={!filter.selectedTag} />
                All tags
              </FiltersLabel>
              {
                filter?.tags.map(tag => (
                  <FiltersLabel key={tag.id}>
                    <input 
                      name="tagsId" 
                      type="radio" 
                      value={tag.id} 
                      onChange={handleChange}
                    />
                    {tag.name}
                  </FiltersLabel>
                ))
              }
            </div>
          </ColumnFilters>
          <DropDownMenuAction>
            <button onClick={handleClearFilter}>Reset Filters</button>
            <button onClick={handleApplyFilter}>Apply Filters</button>
          </DropDownMenuAction>
        </DropDownMenu>
        <button onClick={handleToggleDropDownMenu}>Filters</button>
      </DropDownMenuContainer>
    </Container>
  )
}