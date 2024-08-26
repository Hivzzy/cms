import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';

function SidebarList({ path, name, icon }) {
    const location = useLocation();
    const pathArray = path.split('/');

    if (location.pathname === '/dashboard') {
        return (
            <li className={`${location.pathname.startsWith(path) ? 'active' : ''} nav-item `}>
                <Link className={`${location.pathname.startsWith(path) ? 'active' : ''} nav-link `} aria-current="page" to={path} onClick={() => { }}>
                    <i className="icon">
                        {icon}
                    </i>
                    <span className="item-name">{name}</span>
                </Link>
            </li>
        )
    } else {
        return (
            <li className={`${location.pathname === '/dashboard' ? 'active' : pathArray.length > 2 && location.pathname.startsWith(path) ? 'active' : ''} nav-item `}>
                <Link className={`${pathArray.length > 2 && location.pathname.startsWith(path) ? 'active' : ''} nav-link `} aria-current="page" to={path} onClick={() => { }}>
                    <i className="icon">
                        {icon}
                    </i>
                    <span className="item-name">{name}</span>
                </Link>
            </li>
        )
    }
}

SidebarList.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.object
}

export default SidebarList;