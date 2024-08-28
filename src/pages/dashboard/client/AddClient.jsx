import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import { useNavigate } from 'react-router-dom';
import { createClient, getClientCategoriesLov } from '../../../services/apiServices';
import ClientForm from './ClientForm';

const AddClient = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ status: 'Active' });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [clientCategory, setClientCategory] = useState([{}]);


  useEffect(() => {
    const getData = async () => {
      try {
        const dataCategory = await getClientCategoriesLov();
        if (dataCategory?.data) {
            setClientCategory(dataCategory.data);
        }

      } catch (error) {
        setIsError(true);
        setErrorMessage('Terjadi kesalahan server')
        setShow(true);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log()

  const formSubmit = async () => {
    console.log('uploaded', uploadedImage);

    try {
      const response = await createClient(formData, uploadedImage);
      setShow(false);

      if (response.code === 200) {
        navigate('../client');
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
      <DashboardCard cardTittle="Add Client">
        <ClientForm
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
          clientCategory={clientCategory}
        />
      </DashboardCard>
    </>
  )
}

export default AddClient