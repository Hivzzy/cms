import { useState } from 'react'
import DashboardCard from '../DashboardCard';
import TestimonialForm from './TestimonialForm';
import { useNavigate } from 'react-router-dom';
import { createTestimonial } from '../../../services/apiServices';

const AddTestimonial = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ status: 'Active' });
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const formSubmit = async () => {
        try {
            const response = await createTestimonial(formData);
            setShow(false);
            console.log('form data', formData);

            if (response.code === 200) {
                // navigate('../testimonial');
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
            <DashboardCard cardTittle="Add Testimonial">
                <TestimonialForm
                    formSubmit={formSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    show={show}
                    setShow={setShow}
                    isError={isError}
                    setIsError={setIsError}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </DashboardCard>
        </>
    )
}

export default AddTestimonial