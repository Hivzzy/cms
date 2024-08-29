import { Form, Image, Button } from "react-bootstrap";
import { MdFileUpload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types'; 
import { useMediaQuery } from "react-responsive";

const ImageCarouselUploader = ({ carouselImages, setCarouselImages,  imageFiles, setImageFiles }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [];

        if (files.length > 0) {
            files.forEach((file, index) => {
                if (index < 5) { // Batasi jumlah gambar hingga 5
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newImages.push({ name: file.name, src: reader.result });

                        // Update state dengan menggabungkan gambar baru dan lama
                        setCarouselImages(prevImages => [...prevImages, ...newImages].slice(0, 5));
                        setImageFiles(prevFiles => [...prevFiles, file].slice(0, 5));
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeImage = (index) => {
        setCarouselImages(prevImages => prevImages.filter((_, i) => i !== index));
        setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <Form.Group controlId="carouselImages" style={{ marginBottom: '1rem' }}>
            <Form.Label>Additional Images (For Carousel)</Form.Label>
            <Form.Control
                type="file" multiple placeholder="Image Client"
                onChange={handleImageChange}
                className="d-none"
            />
            <Button
                style={{ lineHeight: '1.5', paddingLeft: '0.75rem', paddingRight: '1rem', marginBottom: '1rem', width: isMobile && '100%' }} className="d-block"
                onClick={() => document.getElementById('carouselImages').click()}
            >
                <MdFileUpload className="me-2" size={20} />
                Upload Carousel Images
            </Button>
            
            {carouselImages.length > 0 && (
                <div className="uploaded-images" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {carouselImages.map((image, index) => (
                        <div key={index} className="image-container" style={{ position: 'relative' }}>
                            <Image 
                                src={image.src} 
                                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '5px' }} 
                            />
                            <IoIosCloseCircle 
                                className="remove-icon" 
                                onClick={() => removeImage(index)} 
                                style={{ position: 'absolute', top: '5px', right: '5px', color: '#EE5D50', cursor: 'pointer', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Form.Group>
    );
};

// Validasi props menggunakan PropTypes
ImageCarouselUploader.propTypes = {
    carouselImages: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    })).isRequired,
    setCarouselImages: PropTypes.func.isRequired,
    imageFiles: PropTypes.array.isRequired,
    setImageFiles: PropTypes.func.isRequired,
};

export default ImageCarouselUploader;
