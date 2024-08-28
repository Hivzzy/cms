import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import ModalForm from '../../../components/form/ModalForm';
import PropTypes from 'prop-types';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';

const MetadataForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setSelectedData, setShowDetail }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData
    });

    const handleClose = () => {
        if (!isJustDetail) {
            setShow(false);
            setTimeout(() => {
                setIsError(false)
                setErrorMessage('')
            }, 1000);
        }
    }

    const handleShow = (data) => {
        if (!isJustDetail) {
            setFormData(data);
        }else{
            setSelectedData(formData)
            setShowDetail(false)
        }
        setShow(true);
    }

    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="code">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="Code" disabled={isJustDetail}
                                {...register('code', {
                                    required: 'Code is required',
                                    minLength: { value: 3, message: 'Input min 3 character' },
                                    maxLength: { value: 55, message: 'Input max 55 character' }
                                })} isInvalid={errors.code}
                            />
                            {errors.code ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.code?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="value">
                            <Form.Label>Value</Form.Label>
                            <Form.Control type="text" placeholder="Value" disabled={isJustDetail}
                                {...register('value', {
                                    required: 'Value is required',
                                    minLength: { value: 3, message: 'Input min 3 character' },
                                })} isInvalid={errors.value}
                            />
                            {errors.value ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.value?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
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
                    page='Metadata'
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

MetadataForm.propTypes = {
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
    setSelectedData: PropTypes.func,
    setShowDetail: PropTypes.func
}

export default MetadataForm