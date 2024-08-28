import { useState } from "react";
import { createArticle } from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../DashboardCard";
import ArticleForm from "./ArticleForm";

const AddArticle = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        status: 'ACTIVE'
    });
    const [uploadedImage, setUploadedImage] = useState();

    const formSubmit = async () => {
        try {
            const response = await createArticle(formData, uploadedImage);
            console.log('response:', response);
            if (response.code === 201) {
                navigate('../article');
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

    return (
        <>
            <DashboardCard cardTittle="Add Article">
                <ArticleForm
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

export default AddArticle