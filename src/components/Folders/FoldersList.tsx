import React from 'react'
import { Link } from 'react-router-dom';
import { IoFolderOutline } from 'react-icons/io5'

import { IFolder } from '../../interfaces/folder';

import StyledFoldersContainer, { StyledFolderItem, StyledFolderItemIcon, StyledFolderItemName } from '../../styles/Folders'

type FoldersListParams = {
  folders: IFolder[]
}
export default function FoldersList({ folders }: FoldersListParams) {
  return (
    <StyledFoldersContainer>
      {
        folders.map(folder => (
          <Link key={folder.id} to={`/tasks/folder/${folder.id}`} style={{ textDecoration: 'none' }}>
            <StyledFolderItem>
              <StyledFolderItemIcon>
                <IoFolderOutline />
              </StyledFolderItemIcon>
              <StyledFolderItemName>
                {folder.name}
              </StyledFolderItemName>
            </StyledFolderItem>
          </Link>
        ))
      }
    </StyledFoldersContainer>  
  )
}