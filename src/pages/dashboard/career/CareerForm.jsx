import PropTypes from 'prop-types';
import ModalForm from '../../../components/form/ModalForm';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';
import { useForm } from 'react-hook-form';

const CareerForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail, isCreate = false, setSelectedData }) => {

    // const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData
    });

    const handleShow = (data) => {
        if (!isJustDetail) {
            setFormData(prev => ({
                ...prev,
                ...data,
            }));
        } else {
            setSelectedData(formData)
            setShowDetail(false)
        }
        setShow(true);
    }

    console.log("ini form", formData)

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
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title"
                                {...register('title', {
                                    required: 'Title is required',
                                    minLength: { value: 5, message: 'Input min 5 characters' },
                                    maxLength: { value: 255, message: 'Input max 255 characters' }
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
                                isInvalid={!!errors.position}
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
                                isInvalid={!!errors.placement}
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
                        {!isCreate &&
                            <Form.Group controlId="status" className="mb-4">
                                <Form.Label className="mb-3">Status</Form.Label>
                                <div key='status-radio'>
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Active"
                                        name="group1"
                                        type='radio'
                                        id={`status-radio-1`}
                                        value="Active"
                                        defaultChecked={formData.status == "Active"}
                                        {...register('status', { required: 'Status is required' })}
                                    />
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Not Active"
                                        name="group1"
                                        type="radio"
                                        id={`status-radio-2`}
                                        value="Not Active"
                                        defaultChecked={formData.status === "Not Active"}
                                        {...register('status', { required: 'Status is required' })}
                                    />
                                </div>
                            </Form.Group>
                        }
                    </Col>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description"
                                {...register('description', {
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
                        <Form.Group controlId="generalReq">
                            <Form.Label>General Requirement</Form.Label>
                            <Form.Control as="textarea" placeholder="General Requirement"
                                {...register('generalReq')} isInvalid={errors.generalReq}
                            />
                            {errors.generalReq ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.generalReq?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="specificReq">
                            <Form.Label>Specific Requirement</Form.Label>
                            <Form.Control as="textarea" placeholder="Specific Requirement"
                                {...register('specificReq')} isInvalid={errors.specificReq}
                            />
                            {errors.specificReq ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.specificReq?.message}
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
                    <Row>
                        {!isJustDetail ?
                            <ButtonFormBottom navigateCancelPath='../career' buttonType={typeFormButton} />
                            :
                            <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                        }
                    </Row>
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Career'
                data={formData?.title}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
                buttonType={typeFormButton}
            />
        </>
    );
}

CareerForm.propTypes = {
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
    isCreate: PropTypes.bool,
    setUploadedImage: PropTypes.func,
    setSelectedData: PropTypes.func,
}

export default CareerForm