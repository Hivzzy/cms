import PropTypes from 'prop-types';
import { Col, Form, Row } from "react-bootstrap"
import ModalForm from '../../../components/form/ModalForm';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getLOVClient } from '../../../services/apiServices';

const TestimonialForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail, isCreate }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData
    });

    const [clientData, setClientData] = useState([])
    const clientsDummy = [
        {
            id: 1,
            name: "Tech Corp"
        },
        {
            id: 2,
            name: "Innovate Ltd"
        },
        {
            id: 3,
            name: "Design Studio"
        },
        {
            id: 4,
            name: "Data Insights"
        },
        {
            id: 5,
            name: "Market Leaders"
        },
        {
            id: 6,
            name: "HR Solutions"
        },
        {
            id: 7,
            name: "Product Hub"
        },
        {
            id: 8,
            name: "Biz Analytics"
        },
        {
            id: 9,
            name: "Sales Experts"
        },
        {
            id: 10,
            name: "Ops Solutions"
        }
    ];

    useEffect(() => {
        // const getData = async () => {
        //     try {
        //         const data = await getLOVClient();
        //         if (data?.data) {
        //             setClientData(data.data);
        //         } else {
        //             setClientData([]);
        //             setIsError(true);
        //             setErrorMessage(data.message)
        //             setShow(true);
        //         }
        //     } catch (error) {
        //         setIsError(true);
        //         setErrorMessage("Terjadi kesalahan server")
        //         setShow(true);
        //     }
        // };
        // getData();

        setClientData(clientsDummy)
    }, [])

    const handleShow = (data) => {
        if (!isJustDetail) {
            setFormData(prev => {
                const updatedData = {
                    ...prev,
                    ...data,
                    client: {
                        id: data.client
                    }
                };

                console.log("Updated FormData:", updatedData);

                return updatedData;
            });
        } else {
            setShowDetail(false)
        }
        setShow(true);
    }

    const handleClose = () => {
        if (!isJustDetail) {
            setShow(false);
            setTimeout(() => {
                setIsError(false)
                setErrorMessage('')
            }, 1000);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" disabled={isJustDetail}
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: { value: 5, message: 'Input min 5 character' },
                                    maxLength: { value: 255, message: 'Input max 255 character' }
                                })} isInvalid={errors.name}
                            />
                            {errors.name ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="position">
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Position" disabled={isJustDetail}
                                {...register('position', {
                                    required: 'Position is required',
                                    minLength: { value: 5, message: 'Input min 5 character' },
                                    maxLength: { value: 50, message: 'Input max 50 character' }
                                })} isInvalid={errors.position}
                            />
                            {errors.position ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.position?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="client">
                            <Form.Label>Client</Form.Label>
                            <Form.Select aria-label="Select Client"
                                {...register('client', { required: 'Client is required' })}
                                isInvalid={!!errors.client} defaultValue='' disabled={isJustDetail}
                            >
                                <option value='' disabled style={{ height: '50px', overflow: 'auto' }}>Client</option>
                                {clientData.map((data, index) => (
                                    <option value={data.id} key={index} style={{ height: '50px', overflow: 'auto' }}>{data.name}</option>
                                ))}
                            </Form.Select>
                            {errors.client ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.client?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" disabled={isJustDetail} style={{ resize: 'none' }}
                                {...register('description', {
                                    required: 'Description is required',
                                    minLength: { value: 5, message: 'Input min 5 character' }
                                })} isInvalid={errors.description}
                            />
                            {errors.description ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.description?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="seq">
                            <Form.Label className='not-required'>Seq</Form.Label>
                            <Form.Control type="number" placeholder="Seq" disabled={isJustDetail} min={0}
                                {...register('seq')} isInvalid={errors.seq}
                            />
                            {errors.seq ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.seq?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        {!isCreate &&
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <div key='inline-radio'>
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Active"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-1`}
                                        value="Active"
                                        {...register('status', { required: 'Role is required' })}
                                    />
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Not Active"
                                        name="group1"
                                        type="radio"
                                        id={`inline-radio-2`}
                                        value="Not Active"
                                        {...register('status', { required: 'Role is required' })}
                                    />
                                </div>
                            </Form.Group>
                        }
                    </Col>
                </Row>
                <Row>
                    {!isJustDetail ?
                        <ButtonFormBottom navigateCancelPath='../metadata' buttonType={typeFormButton} />
                        :
                        <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                    }
                </Row>
            </Form>
            {!isJustDetail &&
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Testimony'
                    data={formData?.code}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                    buttonType={typeFormButton}
                />
            }
        </>
    )
}

TestimonialForm.propTypes = {
    formSubmit: PropTypes.func,
    formData: PropTypes.object,
    setFormData: PropTypes.func,
    show: PropTypes.bool,
    setShow: PropTypes.func,
    isError: PropTypes.bool,
    setIsError: PropTypes.func,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func,
    isJustDetail: PropTypes.bool,
    typeFormButton: PropTypes.string,
    setShowDetail: PropTypes.func,
    isCreate: PropTypes.bool
}

export default TestimonialForm