import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import MetadataForm from './MetadataForm'
import { getMetadataById, updateMetadata } from '../../../services/apiServices';
import { useNavigate, useParams } from 'react-router-dom';

const EditMetadata = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    code: '',
    value: ''
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMetadataById(id);
        if (data?.data) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error("Error API", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    try {
      getData();
    } catch (error) {
      setIsError(true);
      setErrorMessage('Terjadi kesalahan server')
      setShow(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formSubmit = async () => {
    try {
      const response = await updateMetadata(formData);
      setShow(false);

      if (response.code === 200) {
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
    <DashboardCard cardTittle='Edit Metadata'>
      {isLoading ? (
        <p className='fw-bold text-center fs-3'>
          Loading...
        </p>
      ) : (
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
          defaultValues={formData}
          typeFormButton='edit'
        />
      )}
    </DashboardCard>
  )
}

export default EditMetadata