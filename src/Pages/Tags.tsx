import React from 'react';

import { ITag } from '../interfaces/tag'

import TagsForm from '../components/Tags/TagsForm';

export default function Tags() {

  return (
    <section style={{ padding: '0 1rem' }}>
      <TagsForm create={tag => console.log({tag})} />
    </section>
  )
}