import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllExpertiseCategory, getExpertiseById, updateExpertise } from '../../../services/apiServices';
import ExpertiseForm from './ExpertiseForm';

const EditExpertise = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: 0, icon: '', name: '', category: { id: 0, name: '' }, status: ''
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [expertiseCategory, setExpertiseCategory] = useState([{}]);

    useEffect(() => {
        const getData = async () => {
            try {
                const dataCategory = await getAllExpertiseCategory();
                if (dataCategory?.data) {
                    setExpertiseCategory(dataCategory.data);
                }
                const data = await getExpertiseById(id);
                if (data?.data) {
                    setFormData(data.data);
                    setFormData(prev => ({ ...prev, category: data.data.category.id }));
                }
            } catch (error) {
                setIsError(true);
                setErrorMessage('Terjadi kesalahan server')
                setShow(true);
            } finally {
                setIsLoading(false);
            }
        };
        
        setIsLoading(true)
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formSubmit = async () => {
        try {
            const response = await updateExpertise(formData, uploadedImage);
            setShow(false);

            if (response.code === 200) {
                navigate('../expertise');
                console.log(response);

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
        <DashboardCard cardTittle='Edit Metadata'>
            {isLoading ? (
                <p className='fw-bold text-center fs-3'>
                    Loading...
                </p>
            ) : (
                <ExpertiseForm
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
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                    expertiseCategory={expertiseCategory}
                />
            )}
        </DashboardCard>
    )
}

export default EditExpertise