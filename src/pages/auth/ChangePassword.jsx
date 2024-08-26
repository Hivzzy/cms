import { Button, Form, Spinner, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authRequestChangePassword } from '../../services/apiServices';
import ModalAuth from '../../components/form/ModalAuth';
import { useState } from 'react';
import { IoEye, IoEyeOffOutline } from 'react-icons/io5';

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [urlParams] = useSearchParams();
    const tokenParamValue = urlParams.get('token');
    if (!tokenParamValue) {
        navigate('/sign-in')
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const response = await authRequestChangePassword(data, { token: tokenParamValue });
            if (response.code == 200) {
                navigate('/sign-in');
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error);
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

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className={errors.password ? `mb-1` : `mb-4`} controlId="formGroupPassword">
                    <Form.Label className="mb-1">Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" autoComplete='current-password' className={errors.password && `invalid-form`} style={{paddingRight: '3.25rem'}}
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
                        <div
                            className="position-absolute"
                            style={{
                                top: '48%',
                                right: '10px',
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
                <Form.Group className={errors.confirmPassword ? `mb-1` : `mb-4`} controlId="formGroupConfirmPassword">
                    <Form.Label className="mb-1">confirmPassword</Form.Label>
                    <div className="position-relative">
                        <Form.Control type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" autoComplete='current-confirmPassword' className={errors.confirmPassword && `invalid-form`} style={{paddingRight: '3.25rem'}}
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                minLength: { value: 8, message: 'Input min 8 character' },
                                maxLength: { value: 16, message: 'Input max 16 character' },
                                validate: {
                                    hasLowercase: value => /[a-z]/.test(value) || 'Confirm Password must have at least one lowercase letter',
                                    hasUppercase: value => /[A-Z]/.test(value) || 'Confirm Password must have at least one uppercase letter',
                                    hasNumber: value => /[0-9]/.test(value) || 'Confirm Password must have at least one number',
                                    hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Confirm Password must have at least one special character',
                                    noSpaces: value => /^\S*$/.test(value) || 'Confirm Password must not contain spaces',
                                    matchPassword: value => value === password || 'Password not match'
                                }
                            })}
                        />
                        <div
                            className="position-absolute"
                            style={{
                                top: '48%',
                                right: '10px',
                                cursor: 'pointer',
                                transform: 'translateY(-50%)',
                                fontSize: '1.5rem',
                                color: '#000'
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <IoEyeOffOutline /> : <IoEye />}
                        </div>
                    </div>
                    {errors.confirmPassword &&
                        <span className='invalid-input'>
                            {errors.confirmPassword?.message}
                        </span>
                    }
                </Form.Group>
                <Stack gap={1} className='d-flex align-items-center justify-content-center mt-3'>
                    <Button type="submit" className='button-submit primary' variant=''>
                        {isLoading ?
                            <Spinner animation="border" role="status" style={{ height: '20px', width: '20px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            :
                            <span>Change Password</span>
                        }
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

export default ChangePassword