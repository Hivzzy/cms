import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import ExpertiseForm from './ExpertiseForm'
import { useNavigate } from 'react-router-dom';
import { createExpertise, getAllExpertiseCategory } from '../../../services/apiServices';

const AddExpertise = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ status: 'Active' });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [expertiseCategory, setExpertiseCategory] = useState([{}]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataCategory = await getAllExpertiseCategory();
        if (dataCategory?.data) {
          setExpertiseCategory(dataCategory.data);
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

  const formSubmit = async () => {
    console.log('uploaded', uploadedImage);

    try {
      const response = await createExpertise(formData, uploadedImage);
      setShow(false);

      if (response.code === 200) {
        navigate('../expertise');
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
      <DashboardCard cardTittle="Add Expertise">
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
          setUploadedImage={setUploadedImage}
          isCreate={true}
          expertiseCategory={expertiseCategory}
        />
      </DashboardCard>
    </>
  )
}

export default AddExpertise