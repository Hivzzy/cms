import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createClient, createPortofolio, getClientCategoriesLov, getClientsLov } from "../../../services/apiServices";
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
    const [icon, setIcon] = useState({});
    const [imagePreview, setImagePreview ] = useState(null);
    const [carouselImages, setCarouselImages] = useState([]);
    const [carouselImageFiles, setCarouselImageFiles] = useState([]);
    const [clientsLov, setClientsLov] = useState([{id : "", name : "Client"}]);
    const [categoryLov, setCategoryLov] = useState([{id : "", name : "Category"}]);

    const fetchClientsLov = async () => {
        try {
            const response = await getClientsLov();
            setClientsLov((prev) => ([...prev, ...response.data]));
            console.log('Clients:', response?.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchCategoryLov = async () => {
        try {
            const response = await getClientCategoriesLov();
            console.log(response?.data)
            setCategoryLov((prev) => ([...prev, ...response.data]));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            client: {
                id: '',
                name: ''
            },
            isHighlight: '',
            status: 'Active',
            metadata : {
                category: '',
                isNda: '',
                technicalInfo : { 
                    fe: '',
                    be: '',
                    os: '', 
                    db: '',
                    appServer: '',
                    devTool: '',
                    other: ''
                }
            },
            
        }
    });

    const formSubmit = async () => {
        const portofolioData = {
            ...formData,
        };

        try {
            const response = await createPortofolio(portofolioData, icon, carouselImageFiles);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../portofolio');
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response || error.message);
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
            status: 'Active',
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
            isHighlight: data.highlight,
            metadata : {
                category: data.category,
                isNda: data.nda,
                technicalInfo :{
                    fe: data.fe,
                    be: data.be,
                    os: data.os,
                    db: data.db,
                    appServer: data.appServer,
                    devTool: data.devTool,
                    other: data.other
                }
            }
        }));
        setShow(true);
    }

    const handleChangeIcon = (e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                console.log('Invalid file type');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                // setError('icon', {
                //     type: 'manual',
                //     message: 'Invalid file type. Please upload a JPG, JPEG, or PNG image.',
                // });
                return;
            }
            if (file.size > maxSize) {
                console.log('Image max Size');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                // setError('icon', {
                //     type: 'manual',
                //     message: 'File size exceeds 2MB. Please upload a smaller image.',
                // });
                return;
            } else {
                clearErrors('icon');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
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
        console.log('Icon:', file);
    };


    // const handleImageChange = (e) => {
    //     const files = e.target.files;
    //     const newImages = [];

    //     if (files.length > 0) {
    //         for (let i = 0; i < files.length && i < 5; i++) {
    //             const file = files[i];
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 newImages.push({ name: file.name, src: reader.result });
    //                 if (newImages.length === files.length || newImages.length === 5) {
    //                     ([...carouselImages, ...newImages].slice(0, 5)); // Batas maksimum 5 gambar
    //                 }
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    // };

    const removeImage = (index) => {
        setCarouselImages(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus gambar yang dipilih berdasarkan indeks
    }

    useEffect(() => {
        if (clientsLov.length === 1) fetchClientsLov();
        if (categoryLov.length === 1) fetchCategoryLov();
    }, []);

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
                                            onChange: handleChangeIcon
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
                                    imageFiles={carouselImageFiles}
                                    setImageFiles={setCarouselImageFiles} 
                                    removeImage={removeImage}
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
                                            const selectedItem = e.target.value;
                                            const itemObj = clientsLov.find((item) => item.id === selectedItem);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                client: itemObj,
                                            }));
                                        }}
                                    >
                                        {clientsLov.map((item) => (
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
                                            const categoryObj = categoryLov.find((item) => item.id === selectedCategory);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                category: categoryObj,
                                            }));
                                        }}
                                    >
                                        {categoryLov.map((item) => (
                                            <option key={item.id} value={item.name}>
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
                                <Form.Group controlId="fe">
                                    <Form.Label>Technical Info - FE</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('fe', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.fe}
                                    />
                                    {errors.title ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fe?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="be">
                                    <Form.Label>Technical Info - BE</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('be', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.be}
                                    />
                                    {errors.be ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.be?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="os">
                                    <Form.Label>Technical Info - OS</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('os', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.os}
                                    />
                                    {errors.os ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.os?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="db">
                                    <Form.Label>Technical Info - DB</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('db', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.db}
                                    />
                                    {errors.db ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.db?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="appServer">
                                    <Form.Label>Technical Info - App Server</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('appServer', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.appServer}
                                    />
                                    {errors.appServer ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.appServer?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="devTool">
                                    <Form.Label>Technical Info - Dev Tool</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('devTool', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.devTool}
                                    />
                                    {errors.devTool ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.devTool?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="other">
                                    <Form.Label>Technical Info - Other</Form.Label>
                                    <Form.Control type="text" placeholder="Technical Info"
                                        {...register('other', {
                                            required: 'The field is required',
                                        })} isInvalid={errors.other}
                                    />
                                    {errors.other ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.other?.message}
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
                data={formData?.title}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default AddPortofolio

