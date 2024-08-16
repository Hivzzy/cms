import { Card } from "react-bootstrap";
import PropTypes from 'prop-types';

const DashboardCard = ({ cardTittle, children }) => {
    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>{cardTittle}</h5>
                    </div>
                </Card.Header>
                <Card.Body>
                    {children}
                </Card.Body>
            </Card>
        </>
    )
}

DashboardCard.propTypes = {
    cardTittle: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default DashboardCard