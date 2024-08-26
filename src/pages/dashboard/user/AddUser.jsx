import { Card, Col, Form, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

const AddUser = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
        }
    });

    const formSubmit = async () => {
        try {
            const response = await createUser(formData);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../user');
            } else if (response.code === 400) {
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

    const handleShow = (data) => {
        setFormData(data);
        setShow(true);
    }

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>User</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="fullname">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" placeholder="Name"
                                        {...register('fullname', {
                                            required: 'Fullname is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 255, message: 'Input max 255 character' }
                                        })} isInvalid={errors.fullname}
                                    />
                                    {errors.fullname ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullname?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username"
                                        {...register('username', {
                                            required: 'Username is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 100, message: 'Input max 100 character' }
                                        })} isInvalid={errors.username}
                                    />
                                    {errors.username ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                
                            </Col>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 100, message: 'Input max 100 character' }
                                        })} isInvalid={errors.email}
                                    />
                                    {errors.email ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register('role', { required: 'Confirm Password is required' })} isInvalid={!!errors.role} defaultValue=''>
                                        <option value='' disabled selected hidden>Role</option>
                                        <option value="User">User</option>
                                    </Form.Select>
                                    {errors.role ?
                                        <Form.Control.Feedback type="invalid">
                                            Role is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../user' />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='User'
                data={formData?.username}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddUser