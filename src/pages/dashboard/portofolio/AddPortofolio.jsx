import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";
import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import ImageCarouselUploader from "../../../components/form/ImageCarouselUploader";


const AddPortofolio = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [icon, setIcon] = useState();
    const [imagePreview ] = useState(null);
    const [carouselImages, setCarouselImages] = useState([]);

    const dataS = [
        { id: "", name: "Category" },
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

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            priority: 'Yes',
            status: 'Active',
        }
    });

    const formSubmit = async () => {
        const portofolioData = {
            ...formData,
            carouselImages,
        };
    
        try {
            const response = await createClient(portofolioData, icon);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
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
        setIcon(data.icon);
        setFormData(prevData => ({
            ...prevData,
            icon: data.name,
            name: data.name,
            category: {
                id: formData?.category?.id,
                name: formData?.category?.name
            },
            trustedSeq: parseInt(data.trustedSeq, 10),
            priority: data.priority,
            status: data.status
        }));
        setShow(true);
    }


    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = [];

        if (files.length > 0) {
            for (let i = 0; i < files.length && i < 5; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push({ name: file.name, src: reader.result });
                    if (newImages.length === files.length || newImages.length === 5) {
                        setCarouselImages([...carouselImages, ...newImages].slice(0, 5)); // Batas maksimum 5 gambar
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const removeImage = (index) => {
        setCarouselImages(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus gambar yang dipilih berdasarkan indeks
    }


    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Add Portofolio</h5>
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
                                                    <IoIosCloseCircle className="ms-2 " style={{ color: '#EE5D50', cursor: 'pointer' }} onClick={() => removeImage()} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Form.Group>

                                <ImageCarouselUploader
                                    carouselImages={carouselImages} 
                                    setCarouselImages={setCarouselImages} 
                                />
                                {/* End of Carousel Images Section */}
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>

                                <Form.Group controlId="client">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Select
                                        aria-label="Select Client"
                                        {...register('client', { required: 'Client is required' })}
                                        isInvalid={!!errors.client}
                                        defaultValue=""
                                        onChange={(e) => {
                                            const selectedCategory = e.target.value;
                                            const categoryObj = dataS.find((item) => item.id === selectedCategory);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                client: categoryObj,
                                            }));
                                        }}
                                    >
                                        {dataS.map((item) => (
                                            <option key={item.id} value={item.id.toString()}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.client ? (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.client?.message}
                                        </Form.Control.Feedback>
                                    ) : (
                                        <br />
                                    )}
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        aria-label="Select category"
                                        {...register('category', { required: 'Category is required' })}
                                        isInvalid={!!errors.category}
                                        defaultValue=""
                                        onChange={(e) => {
                                            const selectedCategory = e.target.value;
                                            const categoryObj = dataS.find((item) => item.id === selectedCategory);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                category: categoryObj,
                                            }));

                                            console.log('Category set in formData:', categoryObj);
                                            console.log('Selected Category:', selectedCategory);
                                        }}
                                    >
                                        {dataS.map((item) => (
                                            <option key={item.id} value={item.id.toString()}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.category ? (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.category?.message}
                                        </Form.Control.Feedback>
                                    ) : (
                                        <br />
                                    )}
                                </Form.Group>

                                <Form.Group controlId="nda" className="mb-2">
                                    <Form.Label>NDA</Form.Label>
                                    <div key='inline-radio'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Yes"
                                            {...register('nda', { required: 'NDA is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="No"
                                            {...register('nda', { required: 'NDA is required' })}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="startDate">
                                    <Form.Label>Start</Form.Label>
                                    <Form.Control type="date" placeholder="Start Date"
                                        {...register('startDate',
                                        )} isInvalid={errors.startDate}
                                    />
                                    {errors.startDate ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.startDate?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="endDate">
                                    <Form.Label>End</Form.Label>
                                    <Form.Control type="date" placeholder="End Date"
                                        {...register('endDate'
                                        )} isInvalid={errors.endDate}
                                    />
                                    {errors.endDate ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.endDate?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>

                            </Col>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Description"
                                        {...register('description', {
                                            required: 'Description is required',
                                        })} isInvalid={errors.description}
                                    />
                                    {errors.description ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - FE</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - BE</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - OS</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - DB</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - App Server</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - Dev Tool</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Technical Info - Other</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.title}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.title?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="highlight" className="mb-2">
                                    <Form.Label>Highlight</Form.Label>
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
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../portofolio' />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Portofolio'
                data={formData?.name}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddPortofolio

