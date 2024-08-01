import { Button, Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/images/figma/logo.png';
import { Outlet, useLocation } from 'react-router-dom';
import person from '../assets/images/figma/auth-person.png';
import '../assets/css/auth-style.css'
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import eclipse from '../assets/images/figma/eclipse.svg';
import grapchicSide from '../assets/images/figma/Graphic Side.svg';
import PropTypes from 'prop-types';
const AuthLayout = ({ isEmailSent }) => {

    const location = useLocation();
    const animationContainer = useRef(null);

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

    let formHeader = "Sign In";
    switch (location.pathname) {
        case '/':
            formHeader = "Sign In";
            break;
        case '/login':
            formHeader = "Sign In";
            break;
        case '/forgot-password':
            formHeader = "Forgot Password";
            break;
        case '/change-password':
            formHeader = "Change Password";
            break;
    }

    return (
        <Container fluid style={{ background: 'linear-gradient(to right, #ffffff 50%, #0078D7 50%)', overflow: 'hidden', position: 'relative' }}>
            <Container fluid="xxl">
                <Row style={{ height: '100vh' }}>
                    <Col xs={6} style={{ backgroundColor: '#ffffff' }} className='d-flex align-items-center justify-content-center'>
                        <div style={{ marginTop: -86 }}>
                            <div>
                                <img src={logo} alt="Logo Tujuh Sembilan" style={{ height: 42, marginBottom: 64 }} />
                            </div>
                            <div style={{ maxHeight: '405px', width: '400px' }}>
                                {isEmailSent ?
                                    <>
                                        <div className='d-flex flex-column align-items-center justify-content-center'>
                                            <div ref={animationContainer} style={{ width: 220, height: '100%', marginTop: -70, marginBottom: -50 }} />
                                            <div style={{ fontSize: '36px', fontWeight: 700, color: '#23BD33', marginBottom: 8 }}>
                                                Success!
                                            </div>
                                            <div style={{ textAlign: 'center', lineHeight: '28px', fontSize: '16px', color: '#232D42' }}>
                                                A email has been send. Please check for an email from Tujuh Semilan and click on the included link to reset your password.
                                            </div>
                                            <Button type="submit" style={{ width: '40%', marginBottom: '2em', backgroundColor: '#fffff', marginTop: '40px' }}>
                                                Back to home
                                            </Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='text-center' style={{ marginBottom: '36px' }}>
                                            <div style={{ fontWeight: 700, fontSize: '36px', fontFamily: '"SF Compact Rounded", sans-serif' }}>
                                                {formHeader}
                                            </div>
                                            <div style={{ fontSize: '16px', lineHeight: '22px', color: '#8A92A6' }}>
                                                Company Profile 79 CMS.
                                            </div>
                                        </div>
                                        <Outlet />
                                    </>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} style={{ backgroundColor: '#0078D7' }} className='position-relative overflow-y-hidden overflow-y-visible'>
                        <img src={person} alt='Illustration' className='z-1 position-absolute top-50 start-50 translate-middle'></img>
                        {/* <img src={eclipse} alt="" className='z-1 position-absolute start-50 translate-middle' style={{bottom: -420}} /> */}
                        <img src={grapchicSide} alt='Illustration' className='position-absolute top-50 start-50 translate-middle'></img>
                    </Col>
                </Row>
            </Container>
            {/*  */}
            {/* <img src={eclipse} alt="" style={{position: 'absolute', bottom: -50, right: -226, width: '80vw', maxWidth: '1216px'}} /> */}
        </Container>
    )
}

AuthLayout.propTypes = {
    isEmailSent: PropTypes.bool.isRequired
}
export default AuthLayout;