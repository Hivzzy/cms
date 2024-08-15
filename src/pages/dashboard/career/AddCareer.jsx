import { Card, Col, Form, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

const AddCareer = () => {
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
                navigate('../career');
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
                        <h5 className="card-title" style={{ color: '#242845' }}>Add Career</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.tittle}
                                    />
                                    {errors.tittle ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tittle?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="position">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Select aria-label="Select position"
                                        {...register('position', { required: 'Position is required' })}
                                        isInvalid={!!errors.position} defaultValue=''
                                    >
                                        <option value='' disabled>Position</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </Form.Select>
                                    {errors.position ?
                                        <Form.Control.Feedback type="invalid">
                                            position is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="placement">
                                    <Form.Label>Placement</Form.Label>
                                    <Form.Select aria-label="Select placement"
                                        {...register('placement', { required: 'Placement is required' })}
                                        isInvalid={!!errors.placement} defaultValue=''
                                    >
                                        <option value='' disabled>Placement</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </Form.Select>
                                    {errors.placement ?
                                        <Form.Control.Feedback type="invalid">
                                            placement is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start</Form.Label>
                                    <Form.Control type="date" placeholder="Start Date"
                                        {...register('startDate',
                                        )} isInvalid={errors.startDate}
                                    />
                                    {errors.startDate ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.startDate?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="endDate">
                                    <Form.Label>End</Form.Label>
                                    <Form.Control type="date" placeholder="End Date"
                                        {...register('endDate'
                                        )} isInvalid={errors.endDate}
                                    />
                                    {errors.endDate ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.endDate?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
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
                            <Col md='6' sm='12'>
                            <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Description"
                                        {...register('Description', {
                                            required: 'Description is required',
                                        })} isInvalid={errors.description}
                                    />
                                    {errors.description ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="generalRequirement">
                                    <Form.Label>General Requirement</Form.Label>
                                    <Form.Control as="textarea" placeholder="General Requirement"
                                        {...register('generalRequirement')} isInvalid={errors.generalRequirement}
                                    />
                                    {errors.generalRequirement ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.generalRequirement?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="specificRequirement">
                                    <Form.Label>Specific Requirement</Form.Label>
                                    <Form.Control as="textarea" placeholder="Specific Requirement"
                                        {...register('specificRequirement')} isInvalid={errors.specificRequirement}
                                    />
                                    {errors.specificRequirement ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.specificRequirement?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="benefit">
                                    <Form.Label>Benefit</Form.Label>
                                    <Form.Control as="textarea" placeholder="Benefit"
                                        {...register('benefit')} isInvalid={errors.benefit}
                                    />
                                    {errors.benefit ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.benefit?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../career' />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Career'
                data={formData?.title}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddCareer