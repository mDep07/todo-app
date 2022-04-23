import { useFormik } from 'formik';
import { ITag } from '../../interfaces/tag';

import StyledForm, { StyledFooterForm, StyledFormControl } from '../../styles/Form';
import StyledButton from '../../styles/Button';

type TagFormParams = {
  create: (tag: ITag) => void;
}
export default function TagForm({ create }: TagFormParams) {

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
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
          {...formik.getFieldProps('name')} 
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