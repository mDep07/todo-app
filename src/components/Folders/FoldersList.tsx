import React from 'react'
import { Link } from 'react-router-dom';
import { motion, usePresence, AnimatePresence } from 'framer-motion';
import { IoFolderOutline, IoClose } from 'react-icons/io5'

import { IFolder } from '../../interfaces/folder';

import { StyledIconButton } from '../../styles/Button'
import StyledListContainer, { StyledItem, StyledItemIcon, StyledItemName } from '../../styles/List'

type FoldersListParams = {
  folders: IFolder[],
  removed: (id: string) => void
}
export default function FoldersList({ folders, removed }: FoldersListParams) {
  

  return (
    <StyledListContainer>
      <AnimatePresence>
        {
          folders.map(folder => (
            <FolderItem key={folder.id} folder={folder} removed={removed} /> 
          ))
        }
      </AnimatePresence>
    </StyledListContainer>  
  )
}

const FolderItem = ({ folder, removed }: { folder: IFolder, removed: (id: string) => void }) => {
  const [isPresent, safeToRemove] = usePresence()

  return (
    <motion.div 
      layout
      initial="out"
      animate={isPresent ? 'in' : 'out'}
      variants={{
        in: { x: 0, opacity: 1 },
        out: { x: 10, opacity: 0 }
      }}
      transition={{ duration: .25 }}
      onAnimationComplete={() =>  !isPresent && safeToRemove && safeToRemove()}
    >
      <StyledItem>
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
        <StyledItemIcon>
          <IoFolderOutline />
        </StyledItemIcon>
        <StyledItemName>
          {folder.title}
        </StyledItemName>
        <StyledIconButton style={{ zIndex: 2 }} color="danger" onClick={() => removed(folder.id)} title="Delete">
          <IoClose />
        </StyledIconButton>
      </StyledItem>
    </motion.div>
  )
}