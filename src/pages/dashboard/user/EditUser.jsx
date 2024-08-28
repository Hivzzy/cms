import { getUserById, updateUser } from "../../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard";
import UserForm from "./UserForm";

const EditUser = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        status: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const formSubmit = async () => {
        try {
            const response = await updateUser(formData);
            setShow(false);
            if (response.code === 201) {
                console.log('Success:', response);
                navigate('../user');
            } else {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage("Terjadi kesalahan server")
            setShow(true);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUserById(id);
                if (data?.data) {
                    setFormData(data.data);
                } else {
                    setFormData({});
                    setIsError(true);
                    setErrorMessage("Terjadi kesalahan server")
                    setShow(true);
                }
            } catch (error) {
                setIsError(true);
                setErrorMessage("Terjadi kesalahan server")
                setShow(true);
            } finally {
                setIsLoading(false)
            }
        };

        getData();
    }, [id]);

    return (
        <>
            <DashboardCard cardTittle='Edit Article'>
                {isLoading ?
                    <p className='fw-bold text-center fs-3'>
                        Loading...
                    </p>
                    :
                    <UserForm
                        formSubmit={formSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        show={show}
                        setShow={setShow}
                        isError={isError}
                        setIsError={setIsError}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        typeFormButton='edit'
                    />
                }
            </DashboardCard>
        </>
    )
}

export default EditUser