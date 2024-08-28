import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientCategoryById, updateClientCategory } from '../../../services/apiServices';
import ClientCategoryForm from './ClientCategoryForm';

const EditClientCategory = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: 0, icon: '', name: '', category: { id: 0, name: '' }, status: ''
    });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    console.log("id",id);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getClientCategoryById(id);
                if (data?.data) {
                    setFormData(data.data);
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
            const response = await updateClientCategory(formData);
            setShow(false);

            if (response.code === 200) {
                navigate('../clientCategory');
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
        <DashboardCard cardTittle='Edit Client Category'>
            {isLoading ? (
                <p className='fw-bold text-center fs-3'>
                    Loading...
                </p>
            ) : (
                <ClientCategoryForm
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
            )}
        </DashboardCard>
    )
}

export default EditClientCategory