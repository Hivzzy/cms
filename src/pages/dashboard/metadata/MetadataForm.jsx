import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/apiServices';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import ModalForm from '../../../components/form/ModalForm';

const MetadataForm = () => {
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
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="code">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="Code"
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
                            <Form.Control type="text" placeholder="Value"
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
                    <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../metadata' />
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Metadata'
                data={formData?.code}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default MetadataForm