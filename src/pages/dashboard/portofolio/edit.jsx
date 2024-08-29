import { useEffect, useState } from 'react';
import DashboardCard from '../DashboardCard';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientsLov, getClientCategoriesLov, updateExpertise, updatePortofolio, getPortofolioById } from '../../../services/apiServices';
import PortofolioForm from './PortofolioForm';

const EditPortofolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(false);  
  const [portfolioData, setPortofolioData] = useState({})
  const [formData, setFormData] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselImageFiles, setCarouselImageFiles] = useState([]);
  const [clientsLov, setClientsLov] = useState([]);
  const [categoryLov, setCategoryLov] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedImages, setDeletedImages] = useState([]);

  const getPortofolioData = async (id) => {
    try {
      const response = await getPortofolioById(id)
      setPortofolioData(response?.data)
      setImagePreview({name: response?.data?.image, src: response?.data?.image})
      setCarouselImages(response?.data?.metadata?.carousel.map((item) => ({ name: item, src: item })))
      console.log(response.data)
    } catch (e) {
      console.error(`error : ${e}`)
      console.error(response)
    }
  }

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

  const removeCarouselImage = (index) => {
    setCarouselImages(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus gambar yang dipilih berdasarkan indeks
    if (carouselImages[index]?.src?.toLowerCase().includes('http')) {
      setDeletedImages(item => [...item, carouselImages[index].src]);
      console.log(carouselImages[index].src)
    } // Simpan gambar yang dihapus
    setCarouselImageFiles(prevImages => prevImages.filter((_, i) => i !== index)); // Hapus file gambar yang dipilih berdasarkan indeks
  }

  useEffect(() => {
    getPortofolioData(id)
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formSubmit = async () => {

    try {
      console.log('form data', formData);
      const response = await updatePortofolio({ 
        ...formData, 
        id: id,
        metadata: {
          ...formData.metadata,
          carousel: deletedImages?.map((item) => item),
        }
      }, uploadedImage, carouselImageFiles);
      setShow(false);

      if (response.code === 200) {
        navigate('../portofolio');
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
      <DashboardCard cardTittle="Edit Portofolio">
        {isLoading ? (
          <p className='fw-bold text-center fs-3'>
            Loading...
          </p>
        ) : (
          <PortofolioForm
            portofolioData={portfolioData}
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
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            carouselImageFiles={carouselImageFiles}
            setCarouselImageFiles={setCarouselImageFiles}
            carouselImages={carouselImages}
            setCarouselImages={setCarouselImages}
            clientsLov={clientsLov}
            categoryLov={categoryLov}
            removeCarouselImage={removeCarouselImage}
          />
        )}
      </DashboardCard>
  );
};

export default EditPortofolio;
