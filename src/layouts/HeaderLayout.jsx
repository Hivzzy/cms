import { Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import avatars1 from '../assets/images/avatars/01.png'
import BreadcrumbCustom from "../components/dashboard/BreadcrumbCustom"
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { useAuth } from "../pages/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const HeaderLayout = ({ setLogo, logoFull, logoCrop }) => {
    const navigate = useNavigate();
    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini');
        setLogo((prevLogo) => prevLogo === logoFull ? logoCrop : logoFull);
    }
    const isHideNavbar = useMediaQuery({ query: '(max-width: 1200px)' });

    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/sign-in')
    }

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
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon">
                        <span className="mt-2 navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                    </span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle className="py-0 d-flex align-items-center" id="dropdown-basic" variant="" style={{border: 'none'}}>
                                <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                                <div className="caption ms-3 d-none d-md-block me-2">
                                    <h6 className="mb-0 caption-title text-start">{localStorage.getItem('username')}</h6>
                                    <p className="mb-0 caption-sub-title text-start">{localStorage.getItem('role')}</p>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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