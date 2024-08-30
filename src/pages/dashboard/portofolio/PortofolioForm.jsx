import PropTypes from 'prop-types';
import ModalForm from '../../../components/form/ModalForm';
import ButtonFormBottom from '../../../components/form/ButtonFormBottom';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdFileUpload } from 'react-icons/md';
import ButtonDetailFormBottom from '../../../components/form/ButtonDetailFormBottom';
import { useForm } from 'react-hook-form';
import ImageCarouselUploader from '../../../components/form/ImageCarouselUploader';

const PortofolioForm = ({
    portofolioData,
    formSubmit,
    formData,
    setFormData,
    show,
    setShow,
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
    isJustDetail,
    typeFormButton,
    setShowDetail,
    isCreate = false,
    imagePreview,
    setImagePreview,
    setUploadedImage,
    carouselImageFiles,
    setCarouselImageFiles,
    carouselImages,  // Tambahkan props ini
    setCarouselImages,  // Tambahkan props ini
    clientsLov,
    categoryLov,
    removeCarouselImage,
}) => {

    // const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, getValues } = useForm({
        values: isCreate ? {} : {
            id: portofolioData?.id,
            title: portofolioData?.title,
            client: portofolioData?.client?.id,
            category: portofolioData?.category,
            nda: portofolioData?.metadata?.isNda,
            startDate: portofolioData?.startDate,
            endDate: portofolioData?.endDate,
            description: portofolioData?.description,
            fe: portofolioData?.metadata?.technicalInfo?.fe,
            be: portofolioData?.metadata?.technicalInfo?.be,
            os: portofolioData?.metadata?.technicalInfo?.os,
            db: portofolioData?.metadata?.technicalInfo?.db,
            appServer: portofolioData?.metadata?.technicalInfo?.appServer,
            devTool: portofolioData?.metadata?.technicalInfo?.devTool,
            other: portofolioData?.metadata?.technicalInfo?.other,
            highlight: portofolioData?.isHighlight,
            status: portofolioData?.status,
        }
    });   

    const handleShow = (data) => {
        if (!isJustDetail) {
            if (data.icon) {
                setUploadedImage(data.icon)
            } else {
                setUploadedImage(null)
            }

            setFormData(prev => ({
                ...prev,
                title: data.title,                
                client : formData?.client?.id ? formData?.client : clientsLov.find((item) => item.id === data.client),
                
                metadata: {
                    category: data.category,
                    isNda: data.nda,
                    technicalInfo: {
                        fe: data.fe,
                        be: data.be,
                        os: data.os,
                        db: data.db,
                        appServer: data.appServer,
                        devTool: data.devTool,
                        other: data.other
                    },
                },
                startDate: data.startDate,
                endDate: data.endDate,
                description: data.description,
                isHighlight: data.highlight,
                status: data.status,
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

    const handleChangeIcon = useCallback((e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                console.log('Invalid file type');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                setError('icon', {
                    type: 'manual',
                    message: 'Invalid file type. Please upload a JPG, JPEG, or PNG image.',
                });
                return;
            }
            if (file.size > maxSize) {
                console.log('Image max Size');
                setImagePreview(null);
                document.getElementById('icon').value = null;
                setError('icon', {
                    type: 'manual',
                    message: 'File size exceeds 2MB. Please upload a smaller image.',
                });
                return;
            } else {
                clearErrors('icon');
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview({ name: file.name, src: reader.result });
            };
            reader.readAsDataURL(file);
            console.log("call setUploadedImage");
            setUploadedImage(file);
            if (formData?.image) {
                setFormData(prev => ({
                    ...prev,
                }))
            }
        } else {
            setImagePreview(null);
        }
    }, [setUploadedImage, setImagePreview]);

    const removeImage = () => {
        if (formData.image) {
            setFormData(prev => ({ ...prev, image: null }))
        } else {
            setImagePreview(null);
        }
        document.getElementById('image').value = null;
    };


    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            <Form onSubmit={handleSubmit(handleShow)}>
                <Row>
                    <Col md='6' sm='12'>
                        <Form.Group controlId="icon">
                            <Form.Label>Icon</Form.Label>
                            <Form.Control
                                type="file" isInvalid={!!errors.icon} placeholder="Portofolio Image"
                                {...register('icon', {
                                    required: imagePreview ? false : 'Icon Image is required',
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
                                    <Image src={imagePreview?.src} height={120} style={{ maxWidth: 200, marginTop: -10, marginBottom: 10 }} className="object-fit-cover border rounded border border-5" />
                                    <div className="d-flex align-items-center">
                                        <div className="text-truncate">
                                            <span style={{ marginTop: '5px', fontSize: '0.8em' }}>
                                                {imagePreview?.name}
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
                            carouselImages={carouselImages}  // Gunakan carouselImages
                            setCarouselImages={setCarouselImages}  // Gunakan setCarouselImages
                            imageFiles={carouselImageFiles}
                            setImageFiles={setCarouselImageFiles}
                            removeImage={removeCarouselImage}
                        />
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
                                    <option key={item.id} value={item.id}>
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
                                    const categoryObj = categoryLov?.find((item) => item.id === selectedCategory);
                                    setFormData(prevData => ({
                                        ...prevData,
                                        category: categoryObj,
                                    }));
                                }}
                            >
                                {categoryLov?.map((item) => (
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
                        {(isCreate || getValues('nda')?.toLowerCase() === 'yes') && (
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
                                    defaultChecked={isCreate? true : getValues('nda')?.toLowerCase() === 'yes'}
                                    {...register('nda', { required: 'NDA is required' })}
                                />
                                <Form.Check
                                    inline
                                    label="No"
                                    name="group1"
                                    type="radio"
                                    id={`inline-radio-2`}
                                    value="No"
                                    
                                    defaultChecked={getValues('nda')?.toLowerCase() === 'no'}
                                    {...register('nda', { required: 'NDA is required' })}
                                />
                            </div>
                        </Form.Group>
                        )}
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
                        
                        {(isCreate || getValues('highlight')?.toLowerCase() === 'yes') && (<Form.Group controlId="highlight" className="mb-4" style={{ marginTop: '32px' }}>
                            <Form.Label className="mb-3">Highlight</Form.Label>
                            <div key='highlight-radio'>
                                <Form.Check disabled={isJustDetail}
                                    inline
                                    label="Yes"
                                    name="group1"
                                    type='radio'
                                    id={`highlight-radio-1`}
                                    value="YES"
                                    defaultChecked={getValues('highlight')?.toLowerCase() === 'yes' || isCreate}
                                    {...register('highlight', { required: 'Highlight is required' })}
                                />
                                <Form.Check disabled={isJustDetail}
                                    inline
                                    label="No"
                                    name="group1"
                                    type="radio"
                                    id={`highlight-radio-2`}
                                    value="NO"
                                    defaultChecked={getValues('highlight')?.isHighlight?.toLowerCase() === 'no'}
                                    {...register('highlight', { required: 'Highlight is required' })}
                                />
                            </div>
                        </Form.Group>)}
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
                                        defaultChecked={getValues('status')?.toLowerCase() === 'active'}
                                        {...register('status', { required: 'status is required' })}
                                    />
                                    <Form.Check disabled={isJustDetail}
                                        inline
                                        label="Not Active"
                                        name="group1"
                                        type="radio"
                                        id={`status-radio-2`}
                                        value="NOT ACTIVE"
                                        defaultChecked={getValues('status')?.toLowerCase() === 'no'}
                                        {...register('status', { required: 'status is required' })}
                                    />
                                </div>
                            </Form.Group>
                        }
                    </Col>
                    <Row>
                        {!isJustDetail ?
                            <ButtonFormBottom navigateCancelPath='../portofolio' buttonType={typeFormButton} />
                            :
                            <ButtonDetailFormBottom setShowDetail={setShowDetail} navigateEditPath={`./edit/${formData.id}`} handleShow={handleShow} />
                        }
                    </Row>
                </Row>
            </Form>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Portofolio'
                data={formData?.title}
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
                buttonType={typeFormButton}

            />
        </>
    );
}

PortofolioForm.propTypes = {
    portofolioData: PropTypes.object,
    formSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    setIsError: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func.isRequired,
    isJustDetail: PropTypes.bool,
    typeFormButton: PropTypes.string,
    setShowDetail: PropTypes.func,
    isCreate: PropTypes.bool,
    setUploadedImage: PropTypes.func.isRequired,
    setCarouselImageFiles: PropTypes.func.isRequired,
    clientsLov: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    categoryLov: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    setSelectedData: PropTypes.func,
    carouselImages: PropTypes.array,  // Tambahkan props ini
    setCarouselImages: PropTypes.func,  // Tambahkan props ini
    carouselImageFiles: PropTypes.array,  // Tambahkan props ini
    setImagePreview: PropTypes.func,  // Tambahkan props ini
    imagePreview: PropTypes.object,  // Tambahkan props ini


};

export default PortofolioForm