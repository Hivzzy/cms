import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authSignIn } from '../../services/apiServices';
import ModalAuth from '../../components/form/ModalAuth';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await authSignIn(data);
      console.log(response);
      if (response?.status || response.code == 200) {
        setShow(false)
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        console.log('kondisi else');
        setErrorMessage(response.message)
        setShow(true);
      }
    } catch (error) {
      setShow(true);
      setErrorMessage(error.message)
    }
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setIsError(false)
      setErrorMessage('')
    }, 1000);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-1" controlId="formGroupEmail">

          {/* Di-comment karena untuk sekarang sign in menggunakan username */}
          {/* <Form.Label className="mb-1">Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" autoComplete='username'
          {...register('email', {
            required: 'Email is required',
            minLength: { value: 5, message: 'Input min 5 character' },
            maxLength: { value: 100, message: 'Input max 100 character' }
          })}
        />
        {errors.email ? <span>{errors.email.message}</span> : <br></br>} */}
          <Form.Label className="mb-1">Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" autoComplete='username'
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 5, message: 'Input min 5 character' },
              maxLength: { value: 100, message: 'Input max 100 character' }
            })}
          />
          {errors.email ? <span>{errors.email.message}</span> : <br></br>}
        </Form.Group>
        <Form.Group className="mb-1" controlId="formGroupPassword">
          <Form.Label className="mb-1">Password</Form.Label>
          <div className="password-wrapper" style={{ position: 'relative' }}>
<Form.Control type="password" placeholder="Password" autoComplete='current-password'
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Input min 8 character' },
              maxLength: { value: 16, message: 'Input max 16 character' },
              // Di-comment karena akun sekarang tidak memiliki password yang sesuai
              // validate: {
              //   hasLowercase: value => /[a-z]/.test(value) || 'Password must have at least one lowercase letter',
              //   hasUppercase: value => /[A-Z]/.test(value) || 'Password must have at least one uppercase letter',
              //   hasNumber: value => /[0-9]/.test(value) || 'Password must have at least one number',
              //   hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have at least one special character',
              //   noSpaces: value => /^\S*$/.test(value) || 'Password must not contain spaces',
              // }
            })}
          />
          </div>
          
          {errors.password ? <span>{errors.password.message}</span> : <br></br>}
        </Form.Group>
        <Stack gap={1} className='d-flex align-items-center justify-content-center'>
          <Link to='/forgot-password'>
            <div style={{ marginBottom: '2em', color: '#0078D7' }}>
              Forgot Password
            </div>
          </Link>
          <Button variant="" type="submit" className='button-submit primary'>
            Sign In
          </Button>
        </Stack>
      </Form>
      <ModalAuth
        show={show}
        buttonType='danger'
        handleClose={handleClose}
        isError={isError}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Login