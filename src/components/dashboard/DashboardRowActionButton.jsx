import { Button } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { GoTrash } from 'react-icons/go'
import { IoEyeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';

function DashboardRowActionButton({ setShow, setSelectedData, data, handleShowModalDetail, linkToEdit, dataId }) {
    const handleShow = (selected) => {
        setSelectedData(selected);
        setShow(true);
    }

    return (
        <td>
            {handleShowModalDetail &&
                <Link onClick={() => handleShowModalDetail(dataId)}>
                    <Button className="p-0" style={{ fontSize: '15px', color: '#0078D7', width: '24px', height: '24px', background: '#F4F7FE', border: '0px', marginRight: '0.5rem' }}>
                        <IoEyeOutline />
                    </Button>
                </Link>
            }
            <Link to={linkToEdit}>
                <Button className="p-0" style={{ fontSize: '15px', color: '#FFBB34', width: '24px', height: '24px', background: '#FFF5D6', border: '0px', marginRight: '0.5rem' }}>
                    <FaRegEdit />
                </Button>
            </Link>
            <Button className="p-0" style={{ fontSize: '15px', color: '#FF3548', width: '24px', height: '24px', background: '#FFE1E4', border: '0px' }}
                onClick={() => handleShow(data)}
            >
                <GoTrash />
            </Button>
        </td>
    )
}

DashboardRowActionButton.propTypes = {
    rowIndex: PropTypes.number,
    setShow: PropTypes.func,
    setSelectedData: PropTypes.func,
    data: PropTypes.string,
    handleShowModalDetail: PropTypes.func,
    linkToEdit: PropTypes.string,
    dataId: PropTypes.string
}

export default DashboardRowActionButton