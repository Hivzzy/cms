import { Button, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authSignIn } from '../../services/apiServices';
import ModalAuth from '../../components/form/ModalAuth';
import { useState } from 'react';
import { IoEyeOffOutline, IoEye } from "react-icons/io5";
import { useAuth } from './AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const onSubmit = async (data) => {
        try {
            const response = await authSignIn(data);
            console.log(response);
            if (response.code == 200) {
                setShow(false)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('role', response.data.role);
                login();
                navigate('/dashboard');
            } else {
                console.log('kondisi else');
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            setShow(true);
            setErrorMessage("Terjadi kesalahan server")
        }
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className={errors.username ? `mb-1` : `mb-4`} controlId="formGroupEmail">
                    {/* Di-comment karena untuk sekarang sign in menggunakan username */}
                    {/* <Form.Label className="mb-1">Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" autoComplete='email' isInvalid={errors.email}
                        {...register('email', {
                            required: 'Email is required',
                            minLength: { value: 5, message: 'Input min 5 character' },
                            maxLength: { value: 100, message: 'Input max 100 character' }
                        })}
                    />
                    {errors.email ?
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                        : <br></br>
                    } */}
                    <Form.Label className="mb-1">Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" autoComplete='username' isInvalid={errors.username}
                        {...register('username', {
                            required: 'Username is required',
                            minLength: { value: 5, message: 'Input min 5 character' },
                            maxLength: { value: 100, message: 'Input max 100 character' }
                        })}
                    />
                    {errors.username &&
                        <span className='invalid-input'>
                            {errors.username?.message}
                        </span>
                    }
                </Form.Group>
                <Form.Group className={errors.password ? `mb-1` : `mb-4`} controlId="formGroupPassword">
                    <Form.Label className="mb-1">Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" className={errors.password && `invalid-form`} style={{paddingRight: '3.25rem'}}
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
                            autoComplete='current-password'
                        />
                        <div
                            className="position-absolute"
                            style={{
                                top: '48%',
                                right: '16px',
                                cursor: 'pointer',
                                transform: 'translateY(-50%)',
                                fontSize: '1.5rem',
                                color: '#000'
                            }}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <IoEyeOffOutline /> : <IoEye />}
                        </div>
                    </div>
                    {errors.password &&
                        <span className='invalid-input'>
                            {errors.password?.message}
                        </span>
                    }
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