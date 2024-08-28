import { useNavigate } from "react-router-dom";
import { createTeam } from "../../../services/apiServices";
import { useState } from "react";
import DashboardCard from "../DashboardCard";
import TeamForm from "./TeamForm";

const AddTeam = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ status: 'Active' });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [uploadedImage, setUploadedImage] = useState(null);

    const formSubmit = async () => {
        try {
            const response = await createTeam(formData, uploadedImage);
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
            <DashboardCard cardTittle="Add Expertise">
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
                    setUploadedImage={setUploadedImage}
                    isCreate={true}
                />
            </DashboardCard>
        </>
    )
}

export default AddTeam