import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbCustom = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    // const pathnames = location.pathname.split('/');
    return (
        <Breadcrumb>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                console.log("nilai to", to);
                console.log("nilai path", pathnames);
                if (value === "dashboard" && value.length > 1) {
                    return null;
                }
                return (
                    <Breadcrumb.Item
                        key={to}
                        linkAs={Link}
                        linkProps={{ to }}
                        active={index === pathnames.length - 1}
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