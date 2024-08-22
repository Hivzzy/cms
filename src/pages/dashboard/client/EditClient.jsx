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
        { id: "29b93675-398f-4a8c-b4e1-a807c376ef54", name: "Assurance" },
        { id: "ca6c5a2b-0f98-4302-aa0e-04e7390ba021", name: "Banking" },
        { id: "54000e98-8587-4daa-856e-2738d704c555", name: "IT Company" },
        { id: "186780ae-6e5f-4097-b73e-a8db4e5280f4", name: "Fintech" },
        { id: "5f577d21-3094-43b1-9afd-7497c47feb20", name: "Manufacture" },
        { id: "52c860ce-1b75-43e8-9c0b-06cd0f69a626", name: "F&B" },
        { id: "a30ea498-a799-47d2-be14-0fa8d1c7975b", name: "Health Services" },
        { id: "0d98f5b2-8fda-443a-9b46-df9681dfa6f7", name: "Distribution" },
        { id: "d9c7dee1-5892-44f9-941b-1e7e0c764dbb", name: "Retail" },
        { id: "1065ced7-f087-4e11-8686-aa806b226eab", name: "Finance" },
        { id: "df16afcf-8072-492b-9c79-0e57be8cda3e", name: "Education" },
        { id: "2b6713a2-f8dc-4ccb-bc8c-4b825e16d285", name: "Network Infrastructure" },
        { id: "060a07ab-3aaf-4893-a183-1a8ddc6989da", name: "Digital Media" },
        { id: "5a1bebcd-e76c-4a0b-b6e7-de918db284b4", name: "Capital Market" },
        { id: "7a80fdc1-c305-456e-8f95-8fd6b1f13d88", name: "Mining" },
        { id: "df5e65c6-2fd3-4a6d-bf87-b7c69471833d", name: "Others" },
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
    }, [clientId]) // perubahan: menambahkan dependency array untuk memicu useEffect ketika clientId berubah

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
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

    useEffect(() => {
        // Set default values for the form after the client data is fetched
        reset({
            name: client.name,
            category: client.category.id || client.category, // perubahan: menambahkan category.id jika ada, atau default ke client.category
            trustedSeq: client.trustedSeq,
            priority: client.priority,
            status: client.status,
        });
    }, [client, reset]) // perubahan: menambahkan dependency array untuk memicu useEffect ketika client atau reset berubah

    const [icon, setIcon] = useState(null);

    const formSubmit = async () => {
        try {
            const response = await updateClient(formData, icon); // perubahan: memastikan icon terbaru dikirim ke updateClient
            setShow(false);
            if (response.code === 200) {
                navigate('../client');
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message);
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false);
            setErrorMessage('');
        }, 1000);
    };

    const handleShow = (data) => {
        const selectedCategory = dataS.find(item => item.id === data.category);

        if (data.icon) {
            setIcon(data.icon);
            setIsUpdateIcon(true);
        }

        setFormData({
            id: clientId,
            icon: isUpdateIcon ? icon : data.name, // perubahan: memastikan icon yang benar dikirim
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
                setIcon(file); // perubahan: memastikan icon yang di-upload disimpan dalam state
                setIconPreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
        }
    };

    const removeImage = () => {
        setIcon(null); // perubahan: memastikan ikon direset saat gambar dihapus
        setIconPreview(null);
        document.getElementById('icon').value = null;
    };

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Edit Client</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="icon">
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        {...register('icon', {
                                            required: !client.icon ? 'Cover Image is required' : false, // perubahan: memperbaiki kondisi required
                                            onChange: handleIconChange,
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
                                        : client.icon &&
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
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        aria-label="Select category"
                                        {...register('category', { required: 'Category is required' })}
                                        isInvalid={!!errors.category}
                                        defaultValue={client.category.id || ''} // perubahan: memastikan nilai default sesuai dengan id kategori client
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
                                            name="status" // perubahan: memperbaiki label name menjadi 'status'
                                            type='radio'
                                            id={`status-radio-1`}
                                            value="Active"
                                            {...register('status', { required: 'Status is required' })} // perubahan: memperbaiki label name menjadi 'status'
                                        />
                                        <Form.Check
                                            inline
                                            label="Not Active"
                                            name="status" // perubahan: memperbaiki label name menjadi 'status'
                                            type="radio"
                                            id={`status-radio-2`}
                                            value="NOT ACTIVE"
                                            {...register('status', { required: 'Status is required' })} // perubahan: memperbaiki label name menjadi 'status'
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="priority" className="mb-4" style={{ marginTop: '32px' }}>
                                    <Form.Label className="mb-3">Priority</Form.Label>
                                    <div key='highlight-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="priority" // perubahan: memperbaiki label name menjadi 'priority'
                                            type='radio'
                                            id={`highlight-radio-1`}
                                            value="Yes"
                                            {...register('priority', { required: 'Priority is required' })} // perubahan: memperbaiki label name menjadi 'priority'
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="priority" // perubahan: memperbaiki label name menjadi 'priority'
                                            type="radio"
                                            id={`highlight-radio-2`}
                                            value="No"
                                            {...register('priority', { required: 'Priority is required' })} // perubahan: memperbaiki label name menjadi 'priority'
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

export default EditClient;
