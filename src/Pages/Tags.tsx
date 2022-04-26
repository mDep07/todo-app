import React from 'react';

import { ITag } from '../interfaces/tag'
import useTags from '../hooks/useTags';

import TagsService from '../services/tags';
import TagsForm from '../components/Tags/TagsForm';
import TagsList from '../components/Tags/TagsList';

export default function Tags() {
  const [state, dispatch] = useTags();

  const Tags = new TagsService();

  const handleCreate = (tag: ITag) => {
    const newTag = Tags.add(tag);
    dispatch({ type: 'add', payload: newTag })
  }
  
  const handleRemove = (tagId: string) => {
    const removedTag = Tags.remove(tagId);
    if(!removedTag) {
      return
    }

    dispatch({ type: 'remove', payload: removedTag })
  }

  return (
    <section style={{ padding: '0 1rem' }}>
      <TagsForm create={handleCreate} />
      <TagsList tags={state.tags} removed={handleRemove} />
    </section>
  )
}