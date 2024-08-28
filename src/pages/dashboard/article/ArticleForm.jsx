import PropTypes from 'prop-types';
import ModalForm from '../../../components/form/ModalForm';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import QuillForm from '../../../components/form/QuillForm';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdFileUpload } from 'react-icons/md';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';
import { useForm } from 'react-hook-form';

const ArticleForm = ({ formSubmit, formData, setFormData, show, setShow, isError, setIsError, errorMessage, setErrorMessage,
    isJustDetail, typeFormButton, setShowDetail, isCreate = false, setUploadedImage, setSelectedData }) => {

    // const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm({
        defaultValues: formData
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleShow = (data) => {
        if (!isJustDetail) {
            if (data.image) {
                setUploadedImage(data.image)
            } else {
                setUploadedImage(null)
            }
            const sourceArray = typeof data.source === 'string' ? data.source.split(", ") : [data.source];
            const tagsArray = typeof data.tags === 'string' ? data.tags.split(", ") : [data.tags];

            setFormData(prev => ({
                ...prev,
                ...data,
                category: data.category,
                source: sourceArray,
                tags: tagsArray,
                image: data.image ? data.image : prev.image
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (file) {
            if (formData?.image) {
                setFormData(prev => ({
                    ...prev,
                    image: null
                }))
            }
            if (!allowedTypes.includes(file.type)) {
                setImagePreview(null);
                document.getElementById('image').value = null;
                setError('image', {
                    type: 'required',
                    message: 'Invalid file type. Please upload a JPG, JPEG, or PNG image.',
                });
                return;
            }
            if (file.size > maxSize) {
                setImagePreview(null);
                document.getElementById('image').value = null;
                setError('image', {
                    type: 'required',
                    message: 'File size exceeds 2MB. Please upload a smaller image.',
                });
                return;
            } else {
                clearErrors('image');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        if (formData.image) {
            setFormData(prev => ({ ...prev, image: null }))
        } else {
            setImagePreview(null);
        }
        document.getElementById('image').value = null;
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="image">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control type="file" isInvalid={!!errors.image} accept=".png, .jpg, .jpeg"
                                {...register('image', {
                                    required: !formData.image ? 'Cover Image is required' : false,
                                    onChange: handleImageChange
                                })}
                                className="d-none"
                            />
                            {!isJustDetail &&
                                <Button style={{ lineHeight: '1.5', paddingLeft: '0.75rem', paddingRight: '1rem', width: isMobile && '100%' }} className="d-block"
                                    onClick={() => document.getElementById('image').click()}
                                >
                                    <MdFileUpload className="me-2" size={20} />
                                    Upload Image
                                </Button>
                            }
                            {errors.image ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.image?.message}
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
                                formData.image &&
                                <>
                                    <Image src={formData.image} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                    <div className="d-flex align-items-center">
                                        <div className="text-truncate">
                                            <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                {formData.image.split('/').pop()}
                                            </span>
                                        </div>
                                        {!isJustDetail &&
                                            <div>
                                                <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                            </div>
                                        }
                                    </div>
                                </>
                            }
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label>Tittle</Form.Label>
                            <Form.Control type="text" placeholder="Tittle" disabled={isJustDetail}
                                {...register('title', {
                                    required: 'Tittle is required',
                                    minLength: { value: 5, message: 'Input min 5 characters' },
                                    maxLength: { value: 255, message: 'Input max 255 characters' }
                                })} isInvalid={errors.title}
                            />
                            {errors.title ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.title?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="releaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" placeholder="Release Date" disabled={isJustDetail}
                                {...register('releaseDate', {
                                    required: 'Release Date is required'
                                })} isInvalid={errors.releaseDate}
                            />
                            {errors.releaseDate ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.releaseDate?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Select category" disabled={isJustDetail}
                                {...register('category', { required: 'Category is required' })}
                                isInvalid={!!errors.category} defaultValue=''
                            >
                                <option value='' disabled>Category</option>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </Form.Select>
                            {errors.category ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.category?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
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
                                        value="ACTIVE"
                                        {...register('status', { required: 'Role is required' })}
                                    />
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Not Active"
                                        name="group1"
                                        type="radio"
                                        id={`status-radio-2`}
                                        value="NOT ACTIVE"
                                        {...register('status', { required: 'Role is required' })}
                                    />
                                </div>
                            </Form.Group>
                        }
                        <Form.Group controlId="highlight" className="mb-4" style={{ marginTop: '32px' }}>
                            <Form.Label className="mb-3">Highlight</Form.Label>
                            <div key='highlight-radio'>
                                <Form.Check disabled={isJustDetail}
                                    inline
                                    label="Yes"
                                    name="group1"
                                    type='radio'
                                    id={`highlight-radio-1`}
                                    value="YES"
                                    {...register('highlight', { required: 'Highlight is required' })}
                                />
                                <Form.Check disabled={isJustDetail}
                                    inline
                                    label="No"
                                    name="group1"
                                    type="radio"
                                    id={`highlight-radio-2`}
                                    value="NO"
                                    {...register('highlight', { required: 'Highlight is required' })}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="source" style={{ marginTop: '31px' }}>
                            <Form.Label>Source</Form.Label>
                            <Form.Control type="text" placeholder="Example: www.bit.ly/padepokan79, https://tujuhsembilan.com/"
                                {...register('source', {
                                    required: 'Source is required'
                                })} isInvalid={errors.source} disabled={isJustDetail}
                            />
                            {errors.source ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.source?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Example: code, programmer, etc"
                                {...register('tags', {
                                    required: 'Tags is required'
                                })} isInvalid={errors.tags} disabled={isJustDetail}
                            />
                            {errors.tags ?
                                <Form.Control.Feedback type="invalid">
                                    {errors.tags?.message}
                                </Form.Control.Feedback>
                                : <br></br>
                            }
                        </Form.Group>
                    </Col>
                    <Col sm='12'>
                        <Form.Label>Description</Form.Label>
                        <QuillForm
                            formName='description'
                            formError={errors.description}
                            setValue={setValue}
                            register={register}
                            validationRules={{
                                required: 'Description is required',
                                minLength: {
                                    value: 5, message: 'Input min 5 characters'
                                }
                            }}
                            initialValue={formData.description}
                            isJustDetail={isJustDetail}
                        />
                    </Col>
                    <Row>
                        {!isJustDetail ?
                            <ButtonFormBottom navigateCancelPath='../article' buttonType={typeFormButton} />
                            :
                            <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                        }
                    </Row>
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Article'
                data={formData?.title}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
                buttonType={typeFormButton}
            />
        </>
    );
}

ArticleForm.propTypes = {
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

export default ArticleForm