import { Button, Card, Col, Form, Image, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useNavigate } from "react-router-dom";
import { createClient, getClientCategoriesLov, getClientsLov, getPortofolioById, updatePortofolio } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";
import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import ImageCarouselUploader from "../../../components/form/ImageCarouselUploader";

const EditPortofolio = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [icon, setIcon] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [carouselImages, setCarouselImages] = useState([]);
    const [carouselImageFiles, setCarouselImageFiles] = useState([]);    
    const [clientsLov, setClientsLov] = useState([]);
    const [categoryLov, setCategoryLov] = useState([]);

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

    const getData = async () => {
        try {
            const response = await getPortofolioById(window.location.pathname.split('/').pop());
            console.log('Success:', response);

            if (response.code === 200) {
                setFormData(response.data);
                setIcon(response.data.image);
                setImagePreview({ name: response.data.image, src: response.data.image });
                setCarouselImages(response.data.metadata.carousel.map((src) => ({ name: src, src:src })));
            
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            status: 'Active',
        },
        values: {
            title : formData?.title,
            client : formData?.client?.id,
            category : formData?.metadata?.category,
            nda : formData?.metadata?.isNda,
            startDate : formData?.startDate,
            endDate : formData?.endDate,
            description : formData?.description,
            highlight : formData?.highlight,
            fe : formData?.metadata?.technicalInfo?.fe,
            be : formData?.metadata?.technicalInfo?.be,
            os : formData?.metadata?.technicalInfo?.os,
            db : formData?.metadata?.technicalInfo?.db,
            appServer : formData?.metadata?.technicalInfo?.appServer,
            devTool : formData?.metadata?.technicalInfo?.devTool,
            other : formData?.metadata?.technicalInfo?.other
        }
    });

    const formSubmit = async () => {
        const portofolioData = {
            ...formData,
        };

        try {
            const response = await updatePortofolio(portofolioData, icon, carouselImageFiles);
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
        const allowedTypes = ['image/jpeg', 'image/png'];
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

    // const handleImageChange = (e, index) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             if (index !== undefined) {
    //                 // Update existing image in the carousel
    //                 setCarouselImages(prevImages => {
    //                     const updatedImages = [...prevImages];
    //                     updatedImages[index] = { name: file.name, src: reader.result };
    //                     return updatedImages;
    //                 });
    //             } else {
    //                 // Set preview for main icon
    //                 setImagePreview({ name: file.name, src: reader.result });
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         if (index !== undefined) {
    //             setCarouselImages(prevImages => {
    //                 const updatedImages = [...prevImages];
    //                 updatedImages[index] = null;
    //                 return updatedImages;
    //             });
    //         } else {
    //             setImagePreview(null);
    //         }
    //     }
    // };

    const removeImage = (index) => {
        if (index !== undefined) {
            setCarouselImages(prevImages => {
                const updatedImages = [...prevImages];
                updatedImages.splice(index, 1); // Hapus gambar dari array
                return updatedImages;
            });
        } else {
            setImagePreview(null);
        }
        document.getElementById('icon').value = null;
    }


    useEffect(() => {
        if (clientsLov.length === 0) fetchClientsLov();
        if (categoryLov.length === 0) fetchCategoryLov();

        getData();
    }, []);


    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Edit Portofolio</h5>
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
                                />

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
                                        onChange={(e) => {
                                            const selectedCategory = e.target.value;
                                            const categoryObj = clientsLov.find((item) => item.id === selectedCategory);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                client: categoryObj,
                                            }));
                                            console.log('Client set in formData:', categoryObj);
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
                                        defaultValue={formData?.category?.id}
                                        onChange={(e) => {
                                            const selectedCategory = e.target.value;
                                            const categoryObj = categoryLov.find((item) => item.id === selectedCategory);
                                            setFormData(prevData => ({
                                                ...prevData,
                                                category: categoryObj,
                                            }));

                                            console.log('Category set in formData:', categoryObj);
                                            console.log('Selected Category:', selectedCategory);
                                        }}
                                    >
                                        {categoryLov.map((item) => (
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
                                    <div key='inline-radio1'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Yes"
                                            checked={formData?.metadata?.isNda.toLowerCase() === 'yes'}
                                            {...register('nda', { required: 'NDA is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="No"
                                            checked={formData?.metadata?.isNda.toLowerCase() === 'no'}
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
                                    <div key='inline-radio2'>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Yes"
                                            checked={formData?.isHighlight?.toLowerCase() === 'yes'}
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="No"
                                            checked={formData?.isHighlight?.toLowerCase() === 'no'}
                                            {...register('highlight', { required: 'Highlight is required' })}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../portofolio' buttonType="edit" />
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

export default EditPortofolio

