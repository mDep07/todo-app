import { useState } from 'react';
import { useFormik } from 'formik';
import { ITask } from '../../interfaces/task';

import StyledForm, { StyledFooterForm, StyledFormControl } from '../../styles/Form';
import StyledButton from '../../styles/Button';

type TaskFormParams = {
  create: (task: ITask) => void;
}
export default function TaskForm({ create }: TaskFormParams) {
  const [showButtons, setShowButtons] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      create_date: '',
      finished: false,
      important: false,
    },
    onSubmit: (values, formikBag) => {
      create(values);
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