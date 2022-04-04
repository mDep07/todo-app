import { Reducer, useReducer } from "react";

import { IFolder } from "../interfaces/folder";
import FoldersService from "../services/folders";

export default function useFolders() {

  const Folders = new FoldersService();

  type TState = { 
    folders: IFolder[] 
  };

  type TAction = { type: 'add' | 'remove', payload: IFolder }

  const reducer: Reducer<TState, TAction> = (state, action): TState => {
    const { type, payload } = action;

    switch(type) {
      case 'add': {
        const { folders } = state;
        const newFolder = payload;

        return {
          ...state,
          folders: [...folders, newFolder]
        }
      }
      case 'remove': {
        const removedFolder = payload;

        return {
          ...state,
          folders: state.folders.filter(task => task.id !== removedFolder.id)
        };
      }
      default:
        return state
    }
  }

  const folders = Folders.getAll();

  return useReducer(reducer, { folders });
}