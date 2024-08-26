import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import ModalForm from '../../../components/form/ModalForm';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdFileUpload } from 'react-icons/md';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';

const TeamForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, handleDelete, setShowDetail, isCreate = false, setUploadedImage }) => {

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: formData
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleShow = (data) => {
        if (!isJustDetail) {
            if (data.photo) {
                setUploadedImage(data.photo)
            } else {
                setUploadedImage(null)
            }
            setFormData(prev => ({
                ...prev,
                ...data,
                category: {
                    id: data.category
                },
                photo: data.photo[0].name
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
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                console.log('Invalid file type');
                setImagePreview(null);
                document.getElementById('photo').value = null;
                setError('photo', {
                    type: 'required',
                    message: 'Invalid file type. Please upload a JPG, JPEG, or PNG image.',
                });
                return;
            }
            if (file.size > maxSize) {
                console.log('Image max Size');
                setImagePreview(null);
                document.getElementById('photo').value = null;
                setError('photo', {
                    type: 'required',
                    message: 'File size exceeds 2MB. Please upload a smaller image.',
                });
                return;
            } else {
                clearErrors('photo');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
            if (formData?.photo) {
                setFormData(prev => ({
                    ...prev,
                    photo: null
                }))
            }
        } else {
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        if (formData.photo) {
            setFormData(prev => ({ ...prev, photo: null }))
        } else {
            setImagePreview(null);
        }
        document.getElementById('photo').value = null;
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="photo">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                type="file" isInvalid={!!errors.photo} accept=".png, .jpg, .jpeg"
                                {...register('photo', {
                                    required: !formData?.photo ? 'photo is required' : false,
                                    onChange: handleImageChange
                                })}
                                className="d-none"
                            />
                            <Button style={{ lineHeight: '1.5', paddingLeft: '0.75rem', paddingRight: '1rem', width: isMobile && '100%' }} className="d-block"
                                onClick={() => document.getElementById('photo').click()}
                            >
                                <MdFileUpload className="me-2" size={20} />
                                Upload Image
                            </Button>
                            {errors.photo ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.photo?.message}
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
                                formData?.photo &&
                                <>
                                    <Image src={formData.photo} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                    <div className="d-flex align-items-center">
                                        <div className="text-truncate">
                                            <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                {formData.photo.split('/').pop()}
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
                        <Form.Group controlId="position">
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Position" readOnly={isJustDetail}
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
                            <Form.Group controlId="email" className='mb-4'>
                                <Form.Label className='not-required'>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" readOnly={isJustDetail}
                                    {...register('email')} />
                            </Form.Group>
                        </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="biography">
                            <Form.Label>Biography</Form.Label>
                            <Form.Control type="text" placeholder="Biography" readOnly={isJustDetail}
                                {...register('biography', {
                                    required: 'Biography is required',
                                    minLength: { value: 5, message: 'Input min 5 character' },
                                })} isInvalid={errors.biography}
                            />
                            {errors.biography ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.biography?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="linkedIn">
                            <Form.Label className='not-required'>LinkedIn</Form.Label>
                            <Form.Control type="text" placeholder="LinkedIn" readOnly={isJustDetail}
                                {...register('linkedin')}
                            />
                            <br></br>
                        </Form.Group>
                        <Form.Group controlId="seq">
                            <Form.Label className='not-required'>Seq</Form.Label>
                            <Form.Control type="text" placeholder="Seq" readOnly={isJustDetail}
                                {...register('seq')}
                            />
                            <br></br>
                        </Form.Group>
                        {!isCreate &&
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
                    {!isJustDetail ?
                        <ButtonFormBottom navigateCancelPath='../metadata' buttonType={typeFormButton} />
                        :
                        <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                    }
                </Row>
            </Form>
            {!isJustDetail ?
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Team'
                    data={formData?.name}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                    buttonType={typeFormButton}
                />
                :
                <ModalForm
                    show={show}
                    buttonType='danger'
                    handleClose={handleClose}
                    page='Team'
                    data={formData?.name}
                    formSubmit={handleDelete}
                    isError={isError}
                    errorMessage={errorMessage}
                    isDelete={true}
                />
            }
        </>
    )
}

TeamForm.propTypes = {
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
    setUploadedImage: PropTypes.func
}

export default TeamForm