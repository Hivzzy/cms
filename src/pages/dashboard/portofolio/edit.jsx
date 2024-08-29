import { useEffect, useState } from 'react';
import DashboardCard from '../DashboardCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientsLov, getClientCategoriesLov, updateExpertise } from '../../../services/apiServices';
import PortofolioForm from './PortofolioForm';

const EditPortofolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: 0, icon: '', name: '', category: { id: 0, name: '' }, status: ''
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselImageFiles, setCarouselImageFiles] = useState([]);
  const [clientsLov, setClientsLov] = useState([]);
  const [categoryLov, setCategoryLov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const clientsResponse = await getClientsLov();
        if (clientsResponse?.data) {
          setClientsLov(clientsResponse.data);
        }

        const categoryResponse = await getClientCategoriesLov();
        if (categoryResponse?.data) {
          setCategoryLov(categoryResponse.data);
        }

      } catch (error) {
        setIsError(true);
        setErrorMessage('Terjadi kesalahan server');
        setShow(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formSubmit = async () => {
    try {
      const response = await updateExpertise(formData, uploadedImage, carouselImageFiles);
      setShow(false);

      if (response.code === 200) {
        navigate('../expertise');
        console.log(response);
      } else {
        setIsError(true);
        setErrorMessage(response.message);
        setShow(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Terjadi kesalahan server');
      setShow(true);
    }
  };

  return (
    <>
      <DashboardCard cardTittle="Edit Portofolio">
        {isLoading ? (
          <p className='fw-bold text-center fs-3'>
            Loading...
          </p>
        ) : (
          <PortofolioForm
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
            setCarouselImageFiles={setCarouselImageFiles}
            carouselImages={carouselImages}
            setCarouselImages={setCarouselImages}
            clientsLov={clientsLov}
            categoryLov={categoryLov}
          />
        )}
      </DashboardCard>
    </>
  );
};

export default EditPortofolio;
