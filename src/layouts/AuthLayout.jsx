import { Button, Card, Col, Image, Row, Stack } from 'react-bootstrap';
import logo from '../assets/images/figma/logo.png';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/auth-style.css'
import '../assets/css/form-style.css'

import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import grapchicSide from '../assets/images/figma/graphic-side.png';

const AuthLayout = ({ isEmailSent, setIsEmailSent }) => {
    const location = useLocation();
    const animationContainer = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../../src/assets/success.json'
        });

        return () => anim.destroy();
    }, []);

    const getFormHeader = {
        '/sign-in': 'Sign In',
        '/forgot-password': 'Forgot Password',
        '/change-password': 'Change Password'
    };

    const formHeader = getFormHeader[location.pathname] || '';

    const handleNavigate = () => {
        setIsEmailSent(false);
        navigate('/');
    };

    return (
        <>
            <section className="login-content">
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="6">
                        <Row className="justify-content-center">
                            <Col md="10">
                                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                                    <Card.Body>
                                        <div className='d-md-block d-flex justify-content-center'>
                                            <img src={logo} alt="Logo Tujuh Sembilan" className='position-absolute auth-logo' />
                                        </div>
                                        <div className={`d-flex justify-content-center w-100 h-100 ${isEmailSent ? '' : 'd-none'}`} style={{ marginTop: '-5rem' }}>
                                            <div ref={animationContainer} style={{ width: '260px', height: '260px' }} />
                                        </div>
                                        {isEmailSent ?
                                            <>
                                                <h2 style={{ fontWeight: 700, fontSize: '36px', fontFamily: '"SF Compact Rounded", sans-serif', marginTop: '-3rem', color: '#23BD33' }}
                                                    className='text-center mb-3'>
                                                    Success !
                                                </h2>
                                                <Stack gap={1} className='d-flex align-items-center justify-content-center'>
                                                    <p className='text-center' style={{ color: '#232D42' }}>
                                                        A email has been send. Please check for an email from Tujuh Semilan and click on the included link to reset your password.
                                                    </p>
                                                    <Button variant="" className='button-submit primary' onClick={handleNavigate}>
                                                        Back To Home
                                                    </Button>
                                                </Stack>
                                            </>
                                            :
                                            <>
                                                <h2 style={{ fontWeight: 700, fontSize: '36px', fontFamily: '"SF Compact Rounded", sans-serif', marginTop: '-0.75rem' }}
                                                    className='text-center mb-2'>
                                                    {formHeader}
                                                </h2>
                                                <p style={{ fontSize: '16px', lineHeight: '22px', color: '#8A92A6' }} className='text-center'>
                                                    Company Profile 79 CMS.
                                                </p>
                                                <Outlet />
                                            </>
                                        }

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md='6' className='d-md-block d-none p-0 mt-n1 vh-100 overflow-hidden' style={{ background: '#0078D7' }}>
                        <Image src={grapchicSide} fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='Graphic Side' />
                    </Col>
                </Row>
            </section>
        </>
    )
}

AuthLayout.propTypes = {
    isEmailSent: PropTypes.bool,
    setIsEmailSent: PropTypes.func
}
export default AuthLayout;