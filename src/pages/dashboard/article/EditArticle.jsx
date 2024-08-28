import '../../../assets/css/form-style.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticle } from "../../../services/apiServices";
import DashboardCard from "../DashboardCard";
import ArticleForm from "./ArticleForm";

const EditArticle = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        releaseDate: '',
        description: '',
        image: '',
        highlight: '',
        status: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getArticleById(id);
                if (data?.data) {
                    setFormData(prev => ({
                        ...prev,
                        ...data.data,
                        articleId: data.data.id,
                        category: data.data.metadata.category,
                        source: data.data.metadata.source?.join(', '),
                        tags: data.data.metadata.tags?.join(', '),
                    }));
                } else {
                    setIsError(true);
                    setErrorMessage(data.message)
                    setShow(true);
                }
            } catch (error) {
                setIsError(true);
                setErrorMessage("Terjadi kesalahan server")
                setShow(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formSubmit = async () => {
        try {
            const response = await updateArticle(formData, uploadedImage);
            setShow(false);
            if (response.code === 201) {
                navigate('../article');
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <DashboardCard cardTittle='Edit Article'>
                {isLoading ?
                    <p className='fw-bold text-center fs-3'>
                        Loading...
                    </p>
                    :
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
                        typeFormButton='edit'
                        setUploadedImage={setUploadedImage}
                    />
                }
            </DashboardCard>
        </>
    );
}

export default EditArticle