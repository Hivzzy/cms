import { useState } from 'react'
import DashboardCard from '../DashboardCard'
import { useNavigate } from 'react-router-dom';
import { createCareer} from '../../../services/apiServices';
import CareerForm from './CareerForm';

const AddCareer = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ status: 'Active' });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const formSubmit = async () => {
    try {
      const response = await createCareer(formData);
      setShow(false);

      if (response.code === 200) {
        navigate('../Career');
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
      <DashboardCard cardTittle="Add Career">
        <CareerForm
          formSubmit={formSubmit}
          formData={formData}
          setFormData={setFormData}
          show={show}
          setShow={setShow}
          isError={isError}
          setIsError={setIsError}
          errorMessage={errorMessage}
          isCreate={true}
        />
      </DashboardCard>
    </>
  )
}

export default AddCareer