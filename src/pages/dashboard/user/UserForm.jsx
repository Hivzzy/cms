import PropTypes from 'prop-types';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';
import ModalForm from '../../../components/form/ModalForm';

const UserForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail, isCreate = false, setSelectedData }) => {

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
                    <Col>
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
                        {!isCreate &&
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
                        }
                    </Col>
                    <Col>
                        {isCreate &&
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
                        }
                        <Form.Group controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select aria-label="Default select example" {...register('role', { required: 'Confirm Password is required' })} isInvalid={!!errors.role}>
                                <option value='' disabled>Role</option>
                                <option value="User">User</option>
                            </Form.Select>
                            {errors.role ?
                                <Form.Control.Feedback type="invalid">
                                    Role is required
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
                                    <Form.Check
                                        inline disabled={isJustDetail}
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
                    <Row>
                        {!isJustDetail ?
                            <ButtonFormBottom navigateCancelPath='../user' buttonType={typeFormButton} />
                            :
                            <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                        }
                    </Row>
                </Row>
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Article'
                    data={formData?.fullname}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                    buttonType={typeFormButton}
                />
            </Form>
        </>
    )
}

UserForm.propTypes = {
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

export default UserForm