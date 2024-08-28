import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RoutePrivate = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    console.log('route private is auth', isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

RoutePrivate.propTypes = {
    element: PropTypes.element.isRequired
};

export default RoutePrivate;
