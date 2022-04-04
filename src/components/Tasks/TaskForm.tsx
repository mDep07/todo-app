import { useState } from 'react';
import { useFormik } from 'formik';
import { ITask } from '../../interfaces/task';
import { IFolder } from '../../interfaces/folder';

import StyledForm, { StyledFooterForm, StyledFormControl } from '../../styles/Form';
import StyledButton from '../../styles/Button';

type TaskFormParams = {
  create: (task: ITask) => void;
  foldersList: IFolder[]
}
export default function TaskForm({ create, foldersList }: TaskFormParams) {
  const [showButtons, setShowButtons] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      create_date: '',
      finished: false,
      important: false,
      folderId: '',
    },
    onSubmit: (values, formikBag) => {
      const newTask: ITask = { ...values }
      if(values.folderId) {
        const folder = foldersList.find(f => f.id === values.folderId)
        if(folder) {
          newTask.folder = {...folder};
        }
      }
      create(newTask);
      formikBag.resetForm();
    }
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledFormControl>
        <input
          required 
          minLength={3}
          autoComplete="off"
          type="text" 
          placeholder="Add new task"
          onFocus={() => setShowButtons(true)}
          {...formik.getFieldProps('title')} 
        />
      </StyledFormControl>
      {
        showButtons &&
        <StyledFooterForm>
          {
            foldersList.length > 0 &&
            <select
              name="folderId" 
              value={formik.values.folderId}
              onChange={formik.handleChange}
            >
              <option value="">-- None --</option>
              {
                foldersList.map(folder => (
                  <option value={folder.id} key={folder.id}>{folder.name}</option>
                ))
              }
            </select>
          }          
          <StyledButton 
            checked={formik.values.important} 
            type="button" 
            color="info" 
            onClick={() => formik.setFieldValue('important', !formik.values.important)}
          >
            Make important
          </StyledButton>
          <StyledButton type="submit">
            Create
          </StyledButton>
        </StyledFooterForm>
      }
    </StyledForm>
  )
}