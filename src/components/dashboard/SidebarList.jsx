import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function SidebarList({path, name, icon}) {
    return (
        <li className={`${location.pathname === path ? 'active' : ''} nav-item `}>
            <Link className={`${location.pathname === path ? 'active' : ''} nav-link `} aria-current="page" to={path} onClick={() => { }}>
                <i className="icon">
                    {icon}
                </i>
                <span className="item-name">{name}</span>
            </Link>
        </li>
    )
}

SidebarList.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.object
}

export default SidebarList;