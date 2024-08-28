import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbCustom = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
        <Breadcrumb>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                if (value === "dashboard" && value.length > 1) {
                    return null;
                }
                return (
                    <Breadcrumb.Item
                        key={to}
                        linkAs={Link}
                        linkProps={{ to }}
                        active={index === pathnames.length - 1 || value == 'edit'}
                    >
                        {index === 1 && <span style={{ paddingRight: '8px' }}>/</span>}
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    )
}

export default BreadcrumbCustom