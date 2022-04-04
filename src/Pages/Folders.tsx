import React from 'react';

import { IFolder } from '../interfaces/folder'
import useFolders from '../hooks/useFolders';

import FoldersService from '../services/folders';
import FolderForm from '../components/Folders/FolderForm';
import FoldersList from '../components/Folders/FoldersList';

export default function Folders() {  
  const [state, dispatch] = useFolders();

  const Folders = new FoldersService();

  const handleCreate = (folder: IFolder) => {
    const newFolder = Folders.add(folder);
    dispatch({ type: 'add', payload: newFolder })
  }
  
  const handleRemove = (folderId: string) => {
    const removedFolder = Folders.remove(folderId);
    if(!removedFolder) {
      return
    }

    dispatch({ type: 'remove', payload: removedFolder })
  }

  return (
    <section style={{ padding: '0 1rem' }}>
      <FolderForm create={handleCreate} />
      <FoldersList folders={state.folders} removed={handleRemove} />
    </section>
  )
}