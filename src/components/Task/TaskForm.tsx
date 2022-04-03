import { useFormik } from 'formik';
import { ITask } from '../../interfaces/task';

type TaskFormParams = {
  createTask: (task: ITask) => void;
}
export default function TaskForm({ createTask }: TaskFormParams) {
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      create_date: '',
      finished: false
    },
    onSubmit: (values) => {
      console.log({values});
      createTask(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          autoComplete="off"
          required 
          type="text" 
          placeholder="Add new task" 
          {...formik.getFieldProps('title')} 
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}