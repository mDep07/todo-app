import React from 'react'
import { Link } from 'react-router-dom';
import { IoFolderOutline, IoClose } from 'react-icons/io5'

import { IFolder } from '../../interfaces/folder';

import { StyledIconButton } from '../../styles/Button'
import StyledFoldersContainer, { StyledFolderItem, StyledFolderItemIcon, StyledFolderItemName } from '../../styles/Folders'

type FoldersListParams = {
  folders: IFolder[],
  removed: (id: string) => void
}
export default function FoldersList({ folders, removed }: FoldersListParams) {
  return (
    <StyledFoldersContainer>
      {
        folders.map(folder => (
          <StyledFolderItem key={folder.id}>
            <Link 
              to={`/tasks/folder/${folder.id}`} 
              style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                zIndex: 1,
                top: 0,
                left: 0 
              }} 
            />
            <StyledFolderItemIcon>
              <IoFolderOutline />
            </StyledFolderItemIcon>
            <StyledFolderItemName>
              {folder.name}
            </StyledFolderItemName>
            <StyledIconButton style={{ zIndex: 2 }} color="danger" onClick={() => removed(folder.id)} title="Delete">
              <IoClose />
            </StyledIconButton>
          </StyledFolderItem>
        ))
      }
    </StyledFoldersContainer>  
  )
}