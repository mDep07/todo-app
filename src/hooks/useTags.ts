import { Reducer, useReducer } from "react";

import { ITag } from "../interfaces/tag";
import TagsService from "../services/tags";

export default function useTags() {

  const Tags = new TagsService();

  type TState = { 
    tags: ITag[] 
  };

  type TAction = { type: 'add' | 'remove', payload: ITag }

  const reducer: Reducer<TState, TAction> = (state, action): TState => {
    const { type, payload } = action;

    switch(type) {
      case 'add': {
        const { tags } = state;
        const newTag = payload;

        return {
          ...state,
          tags: [...tags, newTag]
        }
      }
      case 'remove': {
        const removedTag = payload;

        return {
          ...state,
          tags: state.tags.filter(tag => tag.id !== removedTag.id)
        };
      }
      default:
        return state
    }
  }

  const tags = Tags.getAll();

  return useReducer(reducer, { tags });
}