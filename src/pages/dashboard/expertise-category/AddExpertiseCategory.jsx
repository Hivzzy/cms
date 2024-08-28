import { useState } from 'react'
import DashboardCard from '../DashboardCard'
import { useNavigate } from 'react-router-dom';
import { createExpertiseCategorys } from '../../../services/apiServices';
import ExpertiseCategoryForm from './ExpertiseCategoryForm';

const AddExpertiseCategory = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ status: 'Active' });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);


  const formSubmit = async () => {
    console.log('uploaded', uploadedImage);

    try {
      const response = await createExpertiseCategorys(formData, uploadedImage);
      setShow(false);

      if (response.code === 200) {
        navigate('../expertiseCategory');
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
      <DashboardCard cardTittle="Add Expertise Category">
        <ExpertiseCategoryForm
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

export default AddExpertiseCategory