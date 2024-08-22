import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createExpertiseCategory } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";
import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

const AddExpertiseCategory = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [icon, setIcon] = useState();
    const [imagePreview, setImagePreview] = useState(null);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
        }
    });

    const formSubmit = async () => {
        try {
            const response = await createExpertiseCategory(formData, icon);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../expertiseCategory');
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
        setIcon(data.icon);
        setFormData(prevData => ({
            ...prevData,
            icon: data.name,
            name: data.name,
            seq: parseInt(data.seq, 10),
            status: data.status
        }));
        setShow(true);
    }


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
        document.getElementById('icon').value = null;
    }


    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Add Expertise Category</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="icon">
                                    <Form.Label>Icon</Form.Label>
                                    <Form.Control
                                        type="file" isInvalid={!!errors.icon} placeholder="Image Client"
                                        {...register('icon', {
                                            required: 'Icon Image is required',
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
                                    {errors.icon ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.icon?.message}
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
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name"
                                        {...register('name', {
                                            required: 'Name is required',
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
                                        placeholder="Trusted Seq"
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
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../expertiseCategory' />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Expertise Category'
                data={formData?.name}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddExpertiseCategory

