import { Image, Modal, Stack } from 'react-bootstrap'
import icon from '../../assets/images/figma/modal-submit.svg';
import iconEdit from '../../assets/images/figma/modal-submit-edit.svg';
import iconDelete from '../../assets/images/figma/modal-submit-delete.svg';
import PropTypes from 'prop-types';

const ModalForm = ({ show, handleClose, page, data, buttonType, formSubmit, isError, errorMessage, isDelete }) => {
    return ( 
        <Modal show={show} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter" style={{ '--bs-modal-width': '400px' }}>
            <Modal.Header closeButton style={{ border: 'none' }} />
            <Stack className="px-4 d-flex justify-content-center text-center">
                <Image src={buttonType === 'danger' || isError ? iconDelete : buttonType === 'edit' ? iconEdit : icon} height='100px' />
                <div style={{ marginTop: '1rem', fontSize: '20px', fontWeight: 600, color: '#242845' }}>
                    Hold it right there!
                </div>
                <p style={{ marginTop: '1rem', fontSize: '16px', fontWeight: 400, color: '#242845' }}>
                    {isDelete ?
                        <>
                            Delete {page} <span className="fw-bold">&ldquo;{data}&rdquo;</span> ?
                        </>
                        :
                        isError ?
                            <>
                                {errorMessage}
                            </>
                            :
                            <>
                                Add new {page} <span className="fw-bold">&ldquo;{data}&rdquo;</span> ?
                            </>
                    }
                </p>
                {isDelete ?
                    <>
                        <button onClick={formSubmit} className={`btn button-submit ${buttonType} mt-2 mb-3`}>
                            Delete {page}
                        </button>
                    </>
                    :
                    isError ?
                        null
                        :
                        <button onClick={formSubmit} className={`btn button-submit ${buttonType} mt-2 mb-3`}>
                            Add {page}
                        </button>
                }
                <button onClick={handleClose} className={`btn button-cancel ${isError ? 'danger' : buttonType}`}>
                    Cancel
                </button>
            </Stack>
            <Modal.Footer style={{ border: 'none' }} />
        </Modal>
    )
}

ModalForm.propTypes = {
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

export default ModalForm