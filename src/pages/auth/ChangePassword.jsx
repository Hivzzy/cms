import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [urlParams] = useSearchParams();
  const tokenParamValue = urlParams.get('token');

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post('https://your-api-endpoint.com/login', data);
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  const password = watch('password');

  console.log('Params "token" url', tokenParamValue);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-1" controlId="formGroupEmail">
        <Form.Label className="mb-1">New Password</Form.Label>
        <Form.Control type="password" placeholder="New Password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Input min 8 character' },
            maxLength: { value: 16, message: 'Input max 16 character' },
            validate: {
              hasLowercase: value => /[a-z]/.test(value) || 'Password must have at least one lowercase letter',
              hasUppercase: value => /[A-Z]/.test(value) || 'Password must have at least one uppercase letter',
              hasNumber: value => /[0-9]/.test(value) || 'Password must have at least one number',
              hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have at least one special character',
              noSpaces: value => /^\S*$/.test(value) || 'Password must not contain spaces',
            }
          })}
        />
        {errors.password ? <span>{errors.password.message}</span> : <br></br>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label className="mb-1">Confirm New Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm New Password"
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            minLength: { value: 8, message: 'Input min 8 character' },
            maxLength: { value: 16, message: 'Input max 16 character' },
            validate: {
              hasLowercase: value => /[a-z]/.test(value) || 'Password must have at least one lowercase letter',
              hasUppercase: value => /[A-Z]/.test(value) || 'Password must have at least one uppercase letter',
              hasNumber: value => /[0-9]/.test(value) || 'Password must have at least one number',
              hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have at least one special character',
              noSpaces: value => /^\S*$/.test(value) || 'Password must not contain spaces',
              matchPassword: value => value === password || 'Password not match'
            }
          })}
        />
        {errors.confirmPassword ? <span>{errors.confirmPassword.message}</span> : <br></br>}
      </Form.Group>
      <Stack gap={1} className='d-flex align-items-center justify-content-center'>
        <Button type="submit" className='button-submit primary' variant=''>
          Change Password
        </Button>
      </Stack>
    </Form>
  )
}

export default ChangePassword