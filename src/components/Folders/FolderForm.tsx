import { useFormik } from 'formik';
import { IFolder } from '../../interfaces/folder';

import StyledForm, { StyledFooterForm, StyledFormControl } from '../../styles/Form';
import StyledButton from '../../styles/Button';

type FolderFormParams = {
  create: (folder: IFolder) => void;
}
export default function FolderForm({ create }: FolderFormParams) {

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      create_date: ''
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
          placeholder="Add new folder"
          {...formik.getFieldProps('title')} 
        />
      </StyledFormControl>
      <StyledFooterForm>
        <section className="actions">
          <StyledButton type="submit">
            Create
          </StyledButton>
        </section>
      </StyledFooterForm>
    </StyledForm>
  )
}