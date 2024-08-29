import PropTypes from 'prop-types';
import ModalForm from '../../../components/form/ModalForm';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import { IoIosCloseCircle } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';

const ExpertiseCategoryForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail, setUploadedImage }) => {

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: formData
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleShow = (data) => {
        console.log("ini data", data)
        if (!isJustDetail) {
            if (data.icon) {
                setUploadedImage(data.icon)
            } else {
                setUploadedImage(null)
            }
            setFormData(prev => ({
                ...prev,
                ...data,
                icon: data.icon[0].name
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png'];
        console.log("ini form", formData)
        if (file) {
            console.log("ini form", formData)
            if (!allowedTypes.includes(file.type)) {
                console.log('Invalid file type');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                setError('icon', {
                    type: 'manual',
                    message: 'Invalid file type. Please upload a JPG, JPEG, or PNG image.',
                });
                return;
            }
            if (file.size > maxSize) {
                console.log('Image max Size');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                setError('icon', {
                    type: 'manual',
                    message: 'File size exceeds 2MB. Please upload a smaller image.',
                });
                return;
            } else {
                clearErrors('icon');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("ini form", formData)
                setImagePreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
            if (formData?.icon) {
                setFormData(prev => ({
                    ...prev,
                    icon: null
                }))
            }
        } else {
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        if (formData.icon) {
            setFormData(prev => ({ ...prev, icon: null }))
        } else {
            setImagePreview(null);
        }
        document.getElementById('icon').value = null;
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="icon">
                            <Form.Label>Icon</Form.Label>
                            <Form.Control
                                type="file" isInvalid={!!errors.icon} accept=".png, .jpg, .jpeg"
                                {...register('icon', {
                                    required: !formData?.icon ? 'Icon is required' : false,
                                    onChange: handleImageChange
                                })}
                                className="d-none"
                            />
                            <Button style={{ lineHeight: '1.5', paddingLeft: '0.75rem', paddingRight: '1rem', width: isMobile && '100%' }} className="d-block"
                                onClick={() => document.getElementById('icon').click()}
                            >
                                <MdFileUpload className="me-2" size={20} />
                                Upload Image
                            </Button>
                            {errors.icon ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.icon?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                            {imagePreview ?
                                <>
                                    <Image src={imagePreview.src} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                    <div className="d-flex align-items-center">
                                        <div className="text-truncate">
                                            <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                {imagePreview.name}
                                            </span>
                                        </div>
                                        <div>
                                            <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                        </div>
                                    </div>
                                </>
                                :
                                formData?.icon &&
                                <>
                                    <Image src={formData.icon} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                    <div className="d-flex align-items-center">
                                        <div className="text-truncate">
                                            <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                {formData.icon.split('/').pop()}
                                            </span>
                                        </div>
                                        <div>
                                            <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                        </div>
                                    </div>
                                </>
                            }
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" disabled={isJustDetail}
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
                        <Form.Group controlId="seq">
                            <Form.Label>Seq</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Seq"
                                min="0" // Mencegah nilai negatif
                                {...register('seq', {
                                    required: 'Seq is required',
                                    validate: (value) => value >= 0 || 'Seq must be a positive number',
                                })}
                                isInvalid={errors.seq}
                            />
                            {errors.seq ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.seq?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
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
                    <ButtonFormBottom navigateCancelPath='../expertiseCategory' buttonType={typeFormButton} />
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Expertise Category'
                data={formData?.name}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
                buttonType={typeFormButton}
            />
        </>
    )
}

ExpertiseCategoryForm.propTypes = {
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
    setUploadedImage: PropTypes.func,
}

export default ExpertiseCategoryForm