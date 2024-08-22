import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import ModalForm from "../../../components/form/ModalForm";

import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertiseCategoryById, updateExpertiseCategory } from "../../../services/apiServices";

const EditExpertiseCategory = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isUpdateIcon, setIsUpdateIcon] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { expertiseCategoryId } = useParams();
    const [expertiseCategory, setExpertiseCategory] = useState({
        name: '',
        seq: '',
        icon: '',
        status: '',
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getExpertiseCategoryById(expertiseCategoryId);
                if (data?.data) {
                    setExpertiseCategory(data.data);
                } else {
                    setExpertiseCategory({});
                }
            } catch (error) {
                console.error("Error API", error.message);
            }
        };

        getData();
    }, [expertiseCategoryId])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            status: 'Active',
        },
        values: {
            name: expertiseCategory.name,
            seq: expertiseCategory.seq,
            status: expertiseCategory.status,
        }
    });

    useEffect(() => {
        reset({
            name: expertiseCategory.name,
            seq: expertiseCategory.seq,
            status: expertiseCategory.status,
        });
    }, [expertiseCategory, reset])

    const [icon, setIcon] = useState(null);

    const formSubmit = async () => {
        try {
            const response = await updateExpertiseCategory(formData, icon);
            setShow(false);
            if (response.code === 200) {
                navigate('../expertiseCategory');
                window.location.reload();
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

        if (data.icon) {
            setIcon(data.icon);
            setIsUpdateIcon(true);
        }

        setFormData({
            id: expertiseCategoryId,
            icon: isUpdateIcon ? icon : data.name,
            name: data.name,
            seq: data.seq,
            status: data.status,
        });

        setShow(true);
    };

    const [iconPreview, setIconPreview] = useState(null);

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIcon(file);
                setIconPreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
        }
    };

    const removeImage = () => {
        if (expertiseCategory.icon) {
            setIcon(prev => ({ ...prev, icon: null }))
        } else {
            setIconPreview(null);
        }
        document.getElementById('icon').value = null;
    }

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Edit Expertise Category</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="icon">
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control
                                        type="file" isInvalid={!!errors.icon}
                                        {...register('icon', {
                                            required: !expertiseCategory ? 'Cover Image is required' : false,
                                            onChange: handleIconChange
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
                                    {iconPreview ?
                                        <>
                                            <Image src={iconPreview.src} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                            <div className="d-flex align-items-center">
                                                <div className="text-truncate">
                                                    <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                        {iconPreview.name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                                </div>
                                            </div>
                                        </>
                                        : expertiseCategory.icon &&
                                        <>
                                            <Image src={expertiseCategory.icon} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                            <div className="d-flex align-items-center">
                                                <div className="text-truncate">
                                                    <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                        {expertiseCategory.icon.split('/').pop()}
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
                                    <Form.Control type="text" placeholder="name"
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: { value: 5, message: 'Input min 5 characters' },
                                            maxLength: { value: 255, message: 'Input max 255 characters' }
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
                                    <Form.Label>seq</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Seq"
                                        min="0"
                                        {...register('seq', {
                                            required: 'Seq is required',
                                            validate: value => value >= 0 || 'Seq must be a positive number',
                                        })}
                                        isInvalid={errors.seq}
                                    />
                                    {errors.seq && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.seq?.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
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
                                            value="NOT ACTIVE"
                                            {...register('status', { required: 'Role is required' })}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Row>
                                <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../expertiseCategory' />
                            </Row>
                        </Row>
                    </Form>
                </Card.Body>
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Expertise Category'
                    data={formData?.name}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </Card>

        </>
    );
}

export default EditExpertiseCategory