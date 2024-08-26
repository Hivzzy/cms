import { Button, Form, Spinner, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authRequestResetPassword } from '../../services/apiServices';
import { useState } from 'react';
import ModalAuth from '../../components/form/ModalAuth';

const ForgotPassword = ({ setIsEmailSent }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await authRequestResetPassword({ email: data.email });
            if (response.code === 200) {
                setIsLoading(false)
                setIsEmailSent(true);
            } else {
                setIsLoading(false)
                setIsEmailSent(false);
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
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
                <Form.Group className="mb-2" controlId="formGroupEmail">
                    <Form.Label className="mb-1">Email</Form.Label>
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
                    }
                </Form.Group>
                <Stack gap={1} className='d-flex align-items-center justify-content-center'>
                    <Button variant="" type="submit" className='button-submit primary' style={{ marginBottom: ' 1.5em' }}>
                        {isLoading ?
                            <Spinner animation="border" role="status" style={{ height: '20px', width: '20px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            :
                            <span>Send</span>
                        }
                    </Button>
                    <Link to='/sign-in'>
                        <div style={{ color: '#0078D7' }}>
                            Back To Home
                        </div>
                    </Link>
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

ForgotPassword.propTypes = {
    setIsEmailSent: PropTypes.func
}

export default ForgotPassword