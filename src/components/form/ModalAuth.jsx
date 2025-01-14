import { Image, Modal, Stack } from 'react-bootstrap'
import icon from '../../assets/images/figma/modal-submit.svg';
import iconEdit from '../../assets/images/figma/modal-submit-edit.svg';
import iconDelete from '../../assets/images/figma/modal-submit-delete.svg';
import PropTypes from 'prop-types';

const ModalAuth = ({ show, handleClose, buttonType, isError, errorMessage }) => {
    return (
        <Modal show={show} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter" style={{ '--bs-modal-width': '400px' }}>
            <Modal.Header closeButton style={{ border: 'none' }} />
            <Stack className="px-4 d-flex justify-content-center text-center">
                <Image src={buttonType === 'danger' || isError ? iconDelete : buttonType === 'edit' ? iconEdit : icon} height='100px' />
                <div style={{ marginTop: '1rem', fontSize: '20px', fontWeight: 600, color: '#242845' }}>
                    Hold it right there!
                </div>
                <p style={{ marginTop: '1rem', fontSize: '16px', fontWeight: 400, color: '#242845' }}>
                    {errorMessage}
                </p>
                <button onClick={handleClose} className={`btn button-cancel ${isError ? 'danger' : buttonType}`}>
                    OK
                </button>
            </Stack>
            <Modal.Footer style={{ border: 'none' }} />
        </Modal>
    )
}

ModalAuth.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    page: PropTypes.string,
    data: PropTypes.string,
    buttonType: PropTypes.string,
    formSubmit: PropTypes.func,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isDelete: PropTypes.bool
}

export default ModalAuth