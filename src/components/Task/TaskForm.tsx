import { useFormik } from 'formik';

import { ITask } from '../../interfaces/task';

import StyledForm, { StyledFooterForm, StyledFormControl } from '../../styles/Form';
import StyledButton from '../../styles/Button';

type TaskFormParams = {
  createTask: (task: ITask) => void;
}
export default function TaskForm({ createTask }: TaskFormParams) {
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      create_date: '',
      finished: false,
      important: false,
    },
    onSubmit: (values, formikBag) => {
      createTask(values);
      formikBag.resetForm();
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledFormControl>
        <input
          autoFocus
          autoComplete="off"
          required 
          type="text" 
          placeholder="Add new task" 
          {...formik.getFieldProps('title')} 
        />
      </StyledFormControl>
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
    </StyledForm>
  )
}