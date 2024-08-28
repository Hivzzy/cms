import PropTypes from 'prop-types';
import ModalForm from '../../../components/form/ModalForm';
import {Col, Form, Row } from 'react-bootstrap';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { useForm } from 'react-hook-form';

const ClientCategoryForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail }) => {
      
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData
    });

    const handleShow = (data) => {
        if (!isJustDetail) {
            setFormData(prev => ({
                ...prev,
                ...data
            }));
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
                            <Form.Control type="text" placeholder="Name" readOnly={isJustDetail}
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: { value: 3, message: 'Input min 3 character' },
                                    maxLength: { value: 55, message: 'Input max 55 character' }
                                })} isInvalid={errors.name}
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
                        {typeFormButton === 'edit' &&
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <div key='inline-radio'>
                                    <Form.Check
                                        inline
                                        label="Active"
                                        name="group1"
                                        type='radio'
                                        id={`inline-radio-1`}
                                        value="Active"
                                        {...register('status', { required: 'Role is required' })}
                                    />
                                    <Form.Check
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
                    <ButtonFormBottom navigateCancelPath='../clientCategory' buttonType={typeFormButton} />
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Client Category'
                data={formData?.name}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
                buttonType={typeFormButton}
            />
        </>
    )
}

ClientCategoryForm.propTypes = {
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
    handleDelete: PropTypes.func,
    setShowDetail: PropTypes.func,
    isCreate: PropTypes.bool,
}

export default ClientCategoryForm