import { useEffect, useState } from "react";
import { getTeamById, updateTeam } from "../../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import DashboardCard from "../DashboardCard";
import TeamForm from "./TeamForm";

const EditTeam = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: 0, name: '', position: '', description: '', seq: '', status: '', client: { id: 0 }
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getTeamById(id);
                if (data?.data) {
                    setFormData(data.data);
                }
            } catch (error) {
                console.error("Error API", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formSubmit = async () => {
        try {
            const response = await updateTeam(formData, uploadedImage);
            setShow(false);

            if (response.code === 201) {
                navigate('../team');

            } else {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('Terjadi kesalahan server')
            setShow(true);
        }
    };

    return (
        <>
            <DashboardCard cardTittle='Edit Metadata'>
                {isLoading ?
                    <p className='fw-bold text-center fs-3'>
                        Loading...
                    </p>
                    :
                    <TeamForm
                        formSubmit={formSubmit}
                        formData={formData}
                        setFormData={setFormData}
                        show={show}
                        setShow={setShow}
                        isError={isError}
                        setIsError={setIsError}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        defaultValues={formData}
                        typeFormButton='edit'
                        setUploadedImage={setUploadedImage}
                    />
                }
            </DashboardCard>
        </>
    )
}

export default EditTeam