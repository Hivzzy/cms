import { Card, Col, Form, Row } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

import ModalForm from "../../../components/form/ModalForm";
import { useParams } from "react-router-dom";
// import { getUserById, updateUser } from "../../../services/apiServices";
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";

const EditCareer = () => {
    const { careerId } = useParams();
    const [career, setCareer] = useState({});

    // const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Commented out API call function for now
    // const formSubmit = async () => {
    //     try {
    //         const response = await updateUser(formData);
    //         console.log('Success:', response);
    //         setShow(false);
    //         if (response.code === 200) {
    //             navigate('../career');
    //         } else if (response.code === 400) {
    //             setIsError(true);
    //             setErrorMessage(response.message)
    //             setShow(true);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error.response?.data || error.message);
    //     }
    // };

    useEffect(() => {
        // Commented out API data fetch for now
        // const getData = async () => {
        //     try {
        //         const data = await getUserById({ careerId });
        //         if (data?.data) {
        //             setCareer(data.data);
        //         } else {
        //             setCareer({});
        //         }
        //     } catch (error) {
        //         console.error("Error API", error.message);
        //     }
        // };

        // Using dummy data instead
        const dummyData = {
            id: 1,
            title: "Senior Developer",
            position: "Private",
            placement: "Public",
            startDate: "2024-08-15",
            endDate: "2025-08-15",
            status: "Not Active",
            description: "Oversee projects and mentor junior developers.",
            generalRequirement: "5+ years experience in software development.",
            specificRequirement: "Expertise in React and Node.js.",
            benefit: "Health insurance, remote work, stock options.",
        };
        setCareer(dummyData);

        // getData(); // Commented out actual data fetching
    }, [careerId]);

    useEffect(() => {
        if (career) {
            setValue('title', career.title);
            setValue('position', career.position);
            setValue('placement', career.placement);
            setValue('startDate', career.startDate);
            setValue('endDate', career.endDate);
            setValue('status', career.status);
            setValue('description', career.description);
            setValue('generalRequirement', career.generalRequirement);
            setValue('specificRequirement', career.specificRequirement);
            setValue('benefit', career.benefit);
        }
    }, [career, setValue]);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const handleShow = (data) => {
        setFormData(data);
        console.log(data);
        setShow(true);
    }


    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Career</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col md='6' sm='12'>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title"
                                        {...register('title', {
                                            required: 'Title is required',
                                        })} isInvalid={errors.tittle} defaultValue={career.title}
                                    />
                                    {errors.tittle ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tittle?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="position">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Select aria-label="Select position"
                                        {...register('position', { required: 'Position is required' })}
                                        isInvalid={!!errors.position} defaultValue={career.position}
                                    >
                                        <option value='' disabled>Position</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </Form.Select>
                                    {errors.position ?
                                        <Form.Control.Feedback type="invalid">
                                            position is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="placement">
                                    <Form.Label>Placement</Form.Label>
                                    <Form.Select aria-label="Select placement"
                                        {...register('placement', { required: 'Placement is required' })}
                                        isInvalid={!!errors.placement} defaultValue={career.placement}
                                    >
                                        <option value='' disabled>Placement</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </Form.Select>
                                    {errors.placement ?
                                        <Form.Control.Feedback type="invalid">
                                            placement is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start</Form.Label>
                                    <Form.Control type="date" placeholder="Start Date"
                                        {...register('startDate',
                                        )} isInvalid={errors.startDate} defaultValue={career.startDate}
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
                                        )} isInvalid={errors.endDate} defaultValue={career.endDate}
                                    />
                                    {errors.endDate ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.endDate?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="status" className="mb-2">
                                    <Form.Label>Status</Form.Label>
                                    <div key='inline-radio'>
                                        <Form.Check
                                            inline
                                            label="Active"
                                            name="group1"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value="Active"
                                            {...register('status', { required: 'Status is required' })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Not Active"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                            value="Not Active"
                                            {...register('status', { required: 'Status is required' })}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md='6' sm='12'>
                            <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Description"
                                        {...register('Description', {
                                            required: 'Description is required',
                                        })} isInvalid={errors.description} defaultValue={career.description}
                                    />
                                    {errors.description ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="generalRequirement">
                                    <Form.Label>General Requirement</Form.Label>
                                    <Form.Control as="textarea" placeholder="General Requirement"
                                        {...register('generalRequirement')} isInvalid={errors.generalRequirement} defaultValue={career.generalRequirement}
                                    />
                                    {errors.generalRequirement ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.generalRequirement?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="specificRequirement">
                                    <Form.Label>Specific Requirement</Form.Label>
                                    <Form.Control as="textarea" placeholder="Specific Requirement"
                                        {...register('specificRequirement')} isInvalid={errors.specificRequirement} defaultValue={career.specificRequirement}
                                    />
                                    {errors.specificRequirement ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.specificRequirement?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="benefit">
                                    <Form.Label>Benefit</Form.Label>
                                    <Form.Control as="textarea" placeholder="Benefit"
                                        {...register('benefit')} isInvalid={errors.benefit} defaultValue={career.benefit}
                                    />
                                    {errors.benefit ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.benefit?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonFormBottom isMobile={isMobile} navigateCancelPath='../career' typeButton={"edit"} />
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='Career'
                data={formData?.title}
                buttonType='Edit'
                // formSubmit={formSubmit} // Commented out formSubmit for now
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default EditCareer
