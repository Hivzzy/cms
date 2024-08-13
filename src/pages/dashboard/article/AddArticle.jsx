import { Card, Col, Form, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/apiServices";

import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

const AddArticle = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
            highlight: 'Yes',
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

    const password = watch('password');

    // 

    const editorRef = useRef(null); // Create a ref for the editor

    useEffect(() => {
        // Initialize Quill editor
        const quill = new Quill(editorRef.current, {
            theme: 'snow', // 'snow' is the default theme
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    [{ 'align': [] }],
                    [{ 'background': [] }],

                    ['bold', 'italic', 'underline', 'strike', 'clean'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['code-block', 'blockquote']
                ]
            }
        });

        // Example: Set initial content
        quill.setText('Hello, Quill!');

        // Example: Listen for text changes
        quill.on('text-change', () => {
            console.log(quill.root.innerHTML); // Get HTML content
        });
    }, []);

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
                                <Form.Group controlId="fullname">
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control type="file" placeholder="Name"
                                        {...register('image')}
                                    />
                                    {errors.fullname ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullname?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="tittle">
                                    <Form.Label>Tittle</Form.Label>
                                    <Form.Control type="text" placeholder="Tittle"
                                        {...register('title', {
                                            required: 'Tittle is required',
                                            // minLength: { value: 5, message: 'Input min 5 character' },
                                            // maxLength: { value: 100, message: 'Input max 100 character' }
                                        })} isInvalid={errors.tittle}
                                    />
                                    {errors.tittle ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tittle?.message}
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
                                            category is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="status" className="mb-4">
                                    <Form.Label className="mb-3">Status</Form.Label>
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
                                <Form.Group controlId="highlight" className="mb-4" style={{ marginTop: '32px' }}>
                                    <Form.Label className="mb-3">Highlight</Form.Label>
                                    <div key='inline-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Yes"
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="No"
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="source" style={{ marginTop: '31px' }}>
                                    <Form.Label>Source</Form.Label>
                                    <Form.Control type="text" placeholder="Example: www.bit.ly/padepokan79, https://tujuhsembilan.com/"
                                        {...register('source', {
                                            required: 'Source is required',
                                            // minLength: { value: 8, message: 'Input min 8 character' },
                                            // maxLength: { value: 16, message: 'Input max 16 character' }
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
                                    <Form.Control type="password" placeholder="Example: code, programmer, etc"
                                        {...register('tags', {
                                            required: 'Tags is required',
                                            minLength: { value: 8, message: 'Input min 8 character' },
                                            maxLength: { value: 16, message: 'Input max 16 character' },
                                            validate: {
                                                hasLowercase: value => /[a-z]/.test(value) || 'Password must have at least one lowercase letter',
                                                hasUppercase: value => /[A-Z]/.test(value) || 'Password must have at least one uppercase letter',
                                                hasNumber: value => /[0-9]/.test(value) || 'Password must have at least one number',
                                                hasSpecialChar: value => /[!@#$%^&*(),.?":{ }|<>]/.test(value) || 'Password must have at least one special character',
                                                noSpaces: value => /^\S*$/.test(value) || 'Password must not contain spaces',
                                                matchPassword: value => value === password || 'Password not match',
                                            }
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
                            <Row>
                                <Col sm='12'>
                                    <div>
                                        <div ref={editorRef} style={{ height: '300px' }} />
                                    </div>
                                </Col>
                            </Row>
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
                    data={formData?.tittle}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </Card>

        </>
    );
}

export default AddArticle