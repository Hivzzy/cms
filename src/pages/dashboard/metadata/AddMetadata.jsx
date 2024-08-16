import { useState } from "react";
import DashboardCard from "../DashboardCard";
import MetadataForm from "./MetadataForm";
import { useNavigate } from "react-router-dom";

const AddMetadata = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const formSubmit = async () => {
        try {
            // const response = await (formData);
            console.log('Success: create metadata');
            setShow(false);
            // if (response.code === 200) {
            //     navigate('../user');
            // } else if (response.code === 400) {
            //     setIsError(true);
            //     setErrorMessage(response.message)
            //     setShow(true);
            // }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
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