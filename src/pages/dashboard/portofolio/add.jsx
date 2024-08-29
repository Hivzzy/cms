import { useEffect, useState } from 'react'
import DashboardCard from '../DashboardCard'
import { useNavigate } from 'react-router-dom';
import { getClientsLov, getClientCategoriesLov, createPortofolio } from '../../../services/apiServices';
import PortofolioForm from './PortofolioForm';

const AddPortofolio = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ status: 'Active' });
  const [isError, setIsError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [uploadedImage, setUploadedImage] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);  // Tambahkan state untuk carousel images
  const [carouselImageFiles, setCarouselImageFiles] = useState([]);
  const [clientsLov, setClientsLov] = useState([]);
  const [categoryLov, setCategoryLov] = useState([]);

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
        setErrorMessage('Terjadi kesalahan server')
        setShow(true);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeCarouselImage = (index) => {
    setCarouselImages(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus gambar yang dipilih berdasarkan indeks
    setCarouselImageFiles(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus file gambar yang dipilih berdasarkan indeks
  }

  const formSubmit = async () => {
    try {
      const response = await createPortofolio({...formData, status: 'Active'}, uploadedImage, carouselImageFiles);
      setShow(false);

      if (response.code === 200) {
        navigate('../portofolio');
        console.log(response);
      } else if (response.code === 400) {
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
      <DashboardCard cardTittle="Add Portofolio">
        <PortofolioForm
          isCreate
          formSubmit={formSubmit}
          formData={formData}
          setFormData={setFormData}
          show={show}
          setShow={setShow}
          isError={isError}
          setIsError={setIsError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          typeFormButton='add'
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}         
          setUploadedImage={setUploadedImage}
          carouselImageFiles={carouselImageFiles}
          setCarouselImageFiles={setCarouselImageFiles}
          carouselImages={carouselImages}
          setCarouselImages={setCarouselImages}
          clientsLov={clientsLov}
          categoryLov={categoryLov}
          removeCarouselImage={removeCarouselImage}
        />
      </DashboardCard>
  );
}

export default AddPortofolio;
