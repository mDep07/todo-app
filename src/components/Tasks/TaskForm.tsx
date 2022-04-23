import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';

import { ITask } from '../../interfaces/task';
import { IFolder } from '../../interfaces/folder';

import StyledForm, { StyledFooterForm, StyledFormControl, StyledFooterConfig } from '../../styles/Form';
import StyledButton, { StyledIconButton } from '../../styles/Button';

import { IoSettingsSharp } from 'react-icons/io5'

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
      expiration_date: '',
      start_date: '',
      showMoreConfig: false
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
            formik.values.showMoreConfig && 
            <StyledFooterConfig>
              <div>
                <label htmlFor="start_date">Start in</label> 
                <input
                  type="datetime-local"
                  id="start_date"
                  min={moment().format('yyyy-DD-MMTHH:MM')}
                  // max={moment().add(1, 'days').format('yyyy-DD-MMTHH:MM')}
                  {...formik.getFieldProps('start_date')} 
                />
              </div>
              <div>
                <label htmlFor="expiration_date">Expires in</label> 
                <input
                  type="datetime-local"
                  id="expiration_date"
                  min={moment().format('yyyy-DD-MMTHH:MM')}
                  // max={moment().add(1, 'days').format('yyyy-DD-MMTHH:MM')}
                  {...formik.getFieldProps('expiration_date')} 
                />
              </div>
              {
                foldersList.length > 0 &&
                <div>
                  <label htmlFor="folderId">Select folder</label> 
                  <select
                    id="folderId" 
                    name="folderId" 
                    value={formik.values.folderId}
                    onChange={formik.handleChange}
                  >
                    <option value="">-- None --</option>
                    {
                      foldersList.map(folder => (
                        <option value={folder.id} key={folder.id}>{folder.title}</option>
                      ))
                    }
                  </select>
                </div> 
              }
            </StyledFooterConfig>
          }
          <section className="actions">
            <StyledIconButton 
              checked={formik.values.showMoreConfig} 
              type="button"
              color="secondary"
              onClick={() => formik.setFieldValue('showMoreConfig', !formik.values.showMoreConfig)}
            >
              <IoSettingsSharp />
            </StyledIconButton>                      
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
          </section>
        </StyledFooterForm>
      }
    </StyledForm>
  )
}