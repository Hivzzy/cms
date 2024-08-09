import { Card, Col, Form, Row, Stack } from "react-bootstrap"
import { useForm } from 'react-hook-form';

import '../../../assets/css/form-style.css'
import { getUserById, updateUser } from "../../../services/apiServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalForm from "../../../components/form/ModalForm";

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            status: 'Active',
        },
        values: {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
        }
    });

    const formSubmit = async () => {
        try {
            const response = await updateUser(formData, { userId: user.userId });
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

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUserById({ userId });
                if (data?.data) {
                    setUser(data.data);
                } else {
                    setUser({});
                }
            } catch (error) {
                console.error("Error API", error.message);
            }
        };

        getData();
    }, [userId]);

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
    };

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>User</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleShow)}>
                        <Row>
                            <Col>
                                <Form.Group controlId="fullname">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" placeholder="Name"
                                        {...register('fullname', {
                                            required: 'Fullname is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 255, message: 'Input max 255 character' }
                                        })} isInvalid={errors.fullname} defaultValue={user.fullname}
                                    />
                                    {errors.fullname ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullname?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username"
                                        {...register('username', {
                                            required: 'Username is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 100, message: 'Input max 100 character' }
                                        })} isInvalid={errors.username} defaultValue={user.username}
                                    />
                                    {errors.username ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            minLength: { value: 5, message: 'Input min 5 character' },
                                            maxLength: { value: 100, message: 'Input max 100 character' }
                                        })} isInvalid={errors.email} defaultValue={user.email}
                                    />
                                    {errors.email ?
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" disabled />
                                    <br></br>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" disabled />
                                    <br></br>
                                </Form.Group>
                                <Form.Group controlId="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select aria-label="Default select example" {...register('role', { required: 'Confirm Password is required' })} isInvalid={!!errors.role} defaultValue={user.role}>
                                        <option value='' disabled>Role</option>
                                        <option value="User">User</option>
                                    </Form.Select>
                                    {errors.role ?
                                        <Form.Control.Feedback type="invalid">
                                            Role is required
                                        </Form.Control.Feedback>
                                        : <br></br>
                                    }
                                </Form.Group>
                                <Form.Group controlId="status">
                                    <Form.Label>Status</Form.Label>
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
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Stack direction="horizontal" gap={3} className="justify-content-end mt-3">
                                <Link to='../user'>
                                    <button className="btn button-cancel edit">Cancel</button>
                                </Link>
                                {/* <Button className="button-submit edit" type="submit">Edit Data</Button> */}
                                <button className="btn button-submit edit">Edit</button>
                            </Stack>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='User'
                data={formData?.username}
                buttonType='edit'
                formSubmit={formSubmit}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default EditUser