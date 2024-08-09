import { Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import avatars1 from '../assets/images/avatars/01.png'
import BreadcrumbCustom from "../components/dashboard/BreadcrumbCustom"
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

const HeaderLayout = ({ setLogo, logoFull, logoCrop }) => {
    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini');
        setLogo((prevLogo) => prevLogo === logoFull ? logoCrop : logoFull);
    }
    const isHideNavbar = useMediaQuery({ query: '(max-width: 1200px)' });

    return (
        <Navbar expand="lg" variant="light" className='nav iq-navbar default  navbar navbar-expand-lg navbar-light'>
            <Container fluid className="navbar-inner">
                <div className={`${isHideNavbar ? 'ms-4' : ''} mb-n3`}>
                    <BreadcrumbCustom />
                </div>

                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon">
                        <svg width="20px" height="20px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </i>
                </div>
                <Navbar.Toggle aria-controls="navbarSupportedContent">
                    <span className="navbar-toggler-icon">
                        <span className="mt-2 navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                    </span>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">
                        <Dropdown.Toggle variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                            {/* <img src={avatars2} alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
                            <img src={avatars3} alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
                            <img src={avatars5} alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
                            <img src={avatars6} alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
                            <img src={avatars4} alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" /> */}
                            <div className="caption ms-3 d-none d-md-block ">
                                <h6 className="mb-0 caption-title">Austin Robertson</h6>
                                <p className="mb-0 caption-sub-title">Marketing Administrator</p>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">Profile</Dropdown.Item>
                                <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-privacy-setting">Privacy Setting</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/auth/sign-in">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

HeaderLayout.propTypes = {
    logo: PropTypes.string,
    setLogo: PropTypes.func,
    logoFull: PropTypes.string,
    logoCrop: PropTypes.string,
}

export default HeaderLayout