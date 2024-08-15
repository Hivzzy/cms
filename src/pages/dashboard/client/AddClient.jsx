import { Card, Col, Form, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

const AddClient = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            priority: 'Active',
            status: 'Active',
        }
    });

    const formSubmit = async () => {
        try {
            const response = await createUser(formData);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../client');
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
        console.log(data);
        setShow(true);
    }


    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Add Client</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="image">
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control type="file" placeholder="Image Client"
                                        {...register('image')}
                                    />
                                    {errors.image ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name"
                                        {...register('name', {
                                            required: 'Name is required',
                                        })} isInvalid={errors.name}
                                    />
                                    {errors.name ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Category"
                                        {...register('category', {
                                            required: 'Category is required',
                                        })} isInvalid={errors.category}
                                    />
                                    {errors.name ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="trustedSeq">
                                    <Form.Label>Trusted Seq</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Trusted Seq"
                                        min="0" // Mencegah nilai negatif
                                        {...register('trustedSeq', {
                                            required: 'Trusted Seq is required',
                                            validate: (value) => value >= 0 || 'Trusted Seq must be a positive number', // Validasi tambahan
                                        })}
                                        isInvalid={errors.trustedSeq}
                                    />
                                    {errors.trustedSeq ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.trustedSeq?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="priority" className="mb-2">
                                    <Form.Label>Priority</Form.Label>
                                    <div key='inline-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Active"
                                            {...register('priority', { required: 'Priority is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="Not Active"
                                            {...register('priority', { required: 'Priority is required' })}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="status" className="mb-2">
                                    <Form.Label>Status</Form.Label>
                                    <div key='inline-radio'>
                                        <Form.Check
                                            inline
                                            label="Active"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Active"
                                            {...register('status', { required: 'Status is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Not Active"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="Not Active"
                                            {...register('status', { required: 'Status is required' })}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../client' />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Client'
                data={formData?.name}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddClient