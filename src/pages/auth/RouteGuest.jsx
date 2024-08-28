import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteGuest = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    console.log('route guest is auth', isAuthenticated);
    return !isAuthenticated ? element : <Navigate to="/dashboard" />;
}

RouteGuest.propTypes = {
    element: PropTypes.node
};

export default RouteGuest