import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";

import ButtonFormBottom from "../../../components/form/ButtonFormBottom";
import QuillForm from "../../../components/form/QuillForm";

import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { createArticle } from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        source: '',
        tags: ''
    });
    const [image, setImage] = useState();

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
            highlight: 'Yes',
            description: '',
        }
    });

    const formSubmit = async () => {
        try {
            const response = await createArticle(formData, image);
            console.log('response:', response);
            if (response.code === 200) {
                setIsError(false);
                setErrorMessage('')
                setShow(false);
                // navigate('../metadata');
            } else {
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
        const sourceArray = typeof data.source === 'string' ? data.source.split(", ") : [data.source];
        const tagsArray = typeof data.tags === 'string' ? data.tags.split(", ") : [data.tags];

        setImage(data.image);

        setFormData({
            category: data.category,
            description: data.description,
            highlight: data.highlight,
            releaseDate: data.releaseDate,
            status: data.status,
            title: data.title,
            source: sourceArray,
            tags: tagsArray,
            // For dev
            createdBy: 'ADMIN',
            modifiedBy: 'ADMIN'
        })

        setShow(true);
    }

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        setImagePreview(null);
        document.getElementById('image').value = null;
    }

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Add Article</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="image">
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control
                                        type="file" isInvalid={!!errors.image}
                                        {...register('image', {
                                            required: 'Cover Image is required',
                                            onChange: handleImageChange
                                        })}
                                        className="d-none"
                                    />
                                    <Button style={{ lineHeight: '1.5', paddingLeft: '0.75rem', paddingRight: '1rem', width: isMobile && '100%' }} className="d-block"
                                        onClick={() => document.getElementById('image').click()}
                                    >
                                        <MdFileUpload className="me-2" size={20} />
                                        Upload Image
                                    </Button>
                                    {errors.image ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                    {imagePreview && (
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
                                    )}
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Tittle</Form.Label>
                                    <Form.Control type="text" placeholder="title"
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
                                    <Form.Control type="date" placeholder="Release Date"
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
                                    <Form.Select aria-label="Select category"
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
                                <Form.Group controlId="status" className="mb-4">
                                    <Form.Label className="mb-3">Status</Form.Label>
                                    <div key='status-radio'>
                                        <Form.Check
                                            inline
                                            label="Active"
                                            name="group1"
                                            type='radio'
                                            id={`status-radio-1`}
                                            value="Active"
                                            {...register('status', { required: 'Role is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Not Active"
                                            name="group1"
                                            type="radio"
                                            id={`status-radio-2`}
                                            value="Not Active"
                                            {...register('status', { required: 'Role is required' })}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="highlight" className="mb-4" style={{ marginTop: '32px' }}>
                                    <Form.Label className="mb-3">Highlight</Form.Label>
                                    <div key='highlight-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`highlight-radio-1`}
                                            value="Yes"
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`highlight-radio-2`}
                                            value="No"
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="source" style={{ marginTop: '31px' }}>
                                    <Form.Label>Source</Form.Label>
                                    <Form.Control type="text" placeholder="Example: www.bit.ly/padepokan79, https://tujuhsembilan.com/"
                                        {...register('source', {
                                            required: 'Source is required'
                                        })} isInvalid={errors.source}
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
                                        })} isInvalid={errors.tags}
                                    />
                                    {errors.tags ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tags?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                            <Col sm='12' className="mt-3">
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
                                />
                            </Col>
                            <Row>
                                <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../article' />
                            </Row>
                        </Row>
                    </Form>
                </Card.Body>
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Article'
                    data={formData?.title}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </Card>

        </>
    );
}

export default AddArticle