import PropTypes from "prop-types";
import { Modal, Card, Row, Col, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5"; // Import ikon close
import ButtonFormBottom from "../../../components/form/ButtonFormBottom";
import { useMediaQuery } from "react-responsive";


const DetailCareerCard = ({ show, handleClose, data }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
            style={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.85)", // Latar belakang lebih gelap
            }}
        >
            <Modal.Body
                className="p-0"
                style={{
                    borderRadius: "10px",
                    backgroundColor: "white",
                    color: "#242845",
                }}
            >
                <Card style={{ border: "none" }}>
                    <Card.Header
                        className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                        style={{ paddingBottom: '2rem' }} // Menambahkan padding bawah sebanyak 3rem
                    >
                        <div className="header-title mb-5 mb-md-0">
                            <h5 className="card-title" style={{ color: '#242845' }}>Detail Career {data?.title}</h5>
                        </div>
                        <IoClose
                            onClick={handleClose}
                            style={{
                                cursor: 'pointer',
                                fontSize: '24px',
                                marginLeft: 'auto'
                            }}
                        />
                    </Card.Header>

                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md="6" sm="12">
                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data?.title || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="position">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data?.position || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="placement">
                                        <Form.Label>Placement</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data?.placement || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="startDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={data?.startDate || ''}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="endDate">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={data?.endDate || ''}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={data?.status || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6" sm="12">
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={data?.description || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="generalRequirement">
                                        <Form.Label>General Requirement</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={data?.generalRequirement || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="specificRequirement">
                                        <Form.Label>Specific Requirement</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={data?.specificRequirement || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="benefit">
                                        <Form.Label>Benefit</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={data?.benefit || '-'}
                                            readOnly
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <ButtonFormBottom detailButton={true} isMobile={isMobile} navigateCancelPath='../career' editPath="../career/edit/1" typeButton={"detailCareer"} />
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

DetailCareerCard.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.string,
        placement: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        status: PropTypes.string,
        benefit: PropTypes.string,
        generalRequirement: PropTypes.string,
        specificRequirement: PropTypes.string,
    }),
};

export default DetailCareerCard;
