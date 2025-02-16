import { useState } from "react";
import DashboardCard from "../DashboardCard";
import MetadataForm from "./MetadataForm";
import { useNavigate } from "react-router-dom";
import { createMetadata } from "../../../services/apiServices";

const AddMetadata = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const formSubmit = async () => {
        try {
            const response = await createMetadata(formData);
            setShow(false);
            console.log('form data', formData);
            
            if (response.code === 200) {
                console.log('Success: create metadata');
                navigate('../metadata');
                console.log(response);

            } else if (response.code === 400) {
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
            <DashboardCard cardTittle="Add Metadata">
                <MetadataForm
                    formSubmit={formSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    show={show}
                    setShow={setShow}
                    isError={isError}
                    setIsError={setIsError}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </DashboardCard>
        </>
    )
}

export default AddMetadata