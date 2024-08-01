import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post('https://your-api-endpoint.com/login', data);
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-1" controlId="formGroupEmail">
        <Form.Label className="mb-1">Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
          {...register('email', {
            required: 'Email is required',
            minLength: { value: 5, message: 'Input min 5 character' },
            maxLength: { value: 100, message: 'Input max 100 character' }
          })}
        />
        {errors.email ? <span>{errors.email.message}</span> : <br></br>}
      </Form.Group>
      <Form.Group className="mb-1" controlId="formGroupPassword">
        <Form.Label className="mb-1">Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Input min 8 character' },
            maxLength: { value: 16, message: 'Input max 16 character' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Input not valid'
            }
          })}
        />
        {errors.password ? <span>{errors.password.message}</span> : <br></br>}
      </Form.Group>
      <Stack gap={1} className='d-flex align-items-center justify-content-center'>
        <a href='/forgot-password' style={{ textDecoration: 'none', marginBottom: '2em' }}>Forgot Password</a>
        <Button variant="primary" type="submit" style={{ width: '40%', backgroundColor: '##0078D7' }}>
          Sign In
        </Button>
      </Stack>
    </Form>
  )
}

export default Login