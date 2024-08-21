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
import { getClientById, updateClient } from "../../../services/apiServices";

const EditClient = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isUpdateIcon, setIsUpdateIcon] = useState(false)
    const dataS = [
        { id: "00258081-9a33-486b-9b14-a0457c6cf855", name: "BUMN" },
        { id: "0d456182-7f45-4b91-bc17-94f9c71477af", name: "Private" }
    ];

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { clientId } = useParams();
    const [client, setClient] = useState({
        name: '',
        category: '',
        trustedSeq: '',
        icon: '',
        priority: '',
        status: '',
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getClientById(clientId);
                if (data?.data) {
                    setClient(data.data);
                } else {
                    setClient({});
                }
            } catch (error) {
                console.error("Error API", error.message);
            }
        };

        getData();
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
            priority: 'Yes',
        },
        values: {
            name: client.name,
            category: client.category,
            trustedSeq: client.trustedSeq,
            priority: client.priority,
            status: client.status,
        }
    });

    const [icon, setIcon] = useState(null);

    const formSubmit = async () => {
        try {
            const response = await updateClient(formData, icon);
            setShow(false);
            if (response.code === 200) {
                window.location.reload();
                navigate('../client');
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
        const selectedCategory = dataS.find(item => item.id === data.category);

        if (data.icon) {
            setIcon(data.icon);
            setIsUpdateIcon(true);
        }

        setFormData({
            id: clientId,
            icon: isUpdateIcon ? null : data.name,
            name: data.name,
            category: {
                id: selectedCategory?.id || '',
                name: selectedCategory?.name || '',
            },
            trustedSeq: data.trustedSeq,
            priority: data.priority,
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
                setIconPreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
        }
    };

    const removeImage = () => {
        if (client.icon) {
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
                        <h5 className="card-title" style={{ color: '#242845' }}>Edit Article</h5>
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
                                            required: !client ? 'Cover Image is required' : false,
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
                                    {client.icon ?
                                        <>
                                            <Image src={client.icon} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                            <div className="d-flex align-items-center">
                                                <div className="text-truncate">
                                                    <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                        {client.icon.split('/').pop()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        iconPreview &&
                                        <>
                                            <Image src={iconPreview.src} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                            <div>
                                                <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                    {iconPreview.name}{iconPreview.name}
                                                </span>
                                                <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                            </div>
                                        </>}
                                    {/* {imagePreview && (
                                        <>
                                            <Image src={imagePreview.src} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                            <div>
                                                <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                    {imagePreview.name}{imagePreview.name}
                                                </span>
                                                <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={removeImage} />
                                            </div>
                                        </>
                                    )} */}
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
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        aria-label="Select category"
                                        {...register('category', { required: 'Category is required' })}
                                        isInvalid={!!errors.category}
                                        defaultValue={client.category.id || ''}
                                    >
                                        <option value='' disabled>Category</option>
                                        {dataS.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.category && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category?.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="trustedSeq">
                                    <Form.Label>Trusted Seq</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Trusted Seq"
                                        min="0"
                                        {...register('trustedSeq', {
                                            required: 'Trusted Seq is required',
                                            validate: value => value >= 0 || 'Trusted Seq must be a positive number',
                                        })}
                                        isInvalid={errors.trustedSeq}
                                    />
                                    {errors.trustedSeq && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.trustedSeq?.message}
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
                                <Form.Group controlId="priority" className="mb-4" style={{ marginTop: '32px' }}>
                                    <Form.Label className="mb-3">Priority</Form.Label>
                                    <div key='highlight-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`highlight-radio-1`}
                                            value="Yes"
                                            {...register('priority', { required: 'Highlight is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`highlight-radio-2`}
                                            value="No"
                                            {...register('priority', { required: 'Highlight is required' })}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Row>
                                <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../client' />
                            </Row>
                        </Row>
                    </Form>
                </Card.Body>
                <ModalForm
                    show={show}
                    handleClose={handleClose}
                    page='Client'
                    data={formData?.name}
                    formSubmit={formSubmit}
                    isError={isError}
                    errorMessage={errorMessage}
                />
            </Card>

        </>
    );
}

export default EditClient