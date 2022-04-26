import React from 'react'
import { Link } from 'react-router-dom';
import { motion, usePresence, AnimatePresence } from 'framer-motion';
import { IoPricetagOutline, IoClose } from 'react-icons/io5'

import { ITag } from '../../interfaces/tag';

import { StyledIconButton } from '../../styles/Button'
import StyledListContainer, { StyledItem, StyledItemIcon, StyledItemName } from '../../styles/List'

type TagsListParams = {
  tags: ITag[],
  removed: (id: string) => void
}
export default function TagsList({ tags, removed }: TagsListParams) {
  

  return (
    <StyledListContainer>
      <AnimatePresence>
        {
          tags.map(tag => (
            <TagItem key={tag.id} tag={tag} removed={removed} /> 
          ))
        }
      </AnimatePresence>
    </StyledListContainer>  
  )
}

const TagItem = ({ tag, removed }: { tag: ITag, removed: (id: string) => void }) => {
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
          to={`/tasks/folder/${tag.id}`} 
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
          <IoPricetagOutline />
        </StyledItemIcon>
        <StyledItemName>
          {tag.name}
        </StyledItemName>
        <StyledIconButton style={{ zIndex: 2 }} color="danger" onClick={() => removed(tag.id)} title="Delete">
          <IoClose />
        </StyledIconButton>
      </StyledItem>
    </motion.div>
  )
}