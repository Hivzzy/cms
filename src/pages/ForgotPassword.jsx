import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const ForgotPassword = ({ setIsEmailSent }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // const response = await axios.post('https://your-api-endpoint.com/login', data);
      console.log('Success:', data);
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-1" controlId="formGroupEmail">
        <Form.Label className="mb-1">Email</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email"
          {...register('email', {
            required: 'Email is required',
            minLength: { value: 5, message: 'Input min 5 character' },
            maxLength: { value: 100, message: 'Input max 100 character' }
          })}
        />
        {errors.email ? <span>{errors.email.message}</span> : <br></br>}
      </Form.Group>
      <Stack gap={1} className='d-flex align-items-center justify-content-center'>
        <Button variant="primary" type="submit" style={{ width: '40%', backgroundColor: '##0078D7', marginBottom: '2em' }}>
          Send
        </Button>
        <a href='/login' style={{ textDecoration: 'none' }}>Back To Home</a>
      </Stack>
    </Form>
  )
}

export default ForgotPassword