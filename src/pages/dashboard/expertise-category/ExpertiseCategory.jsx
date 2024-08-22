import { Button, Card, Form, Stack, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteExpertiseCategory, getAllExpertiseCategory } from "../../../services/apiServices";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from "react-router-dom";
import PaginationCustom from "../../../components/form/PaginationCustom";
import ModalForm from "../../../components/form/ModalForm";

const ExpertiseCategory = () => {
    const [expertiseCategory, setExpertiseCategory] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
        status: ''
    });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData] = useState(10);

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [idDelete, setIdDelete] = useState(null);


    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValue(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllExpertiseCategory(
                { pageSize, pageNumber, [selectedValue]: searchValue[selectedValue] }
            )
            if (data?.data) {
                setExpertiseCategory(data.data);
            } else {
                setExpertiseCategory([]);
            }

        } catch (error) {
            // setError(error.message);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        getData(pageSize, pageNumber, selectedValue, searchValue);

    }, []);

    const userTableHeader = ["ICON", "NAME", "SEQ", "STATUS", "ACTION"];

    const handleSubmit = (event) => {
        event.preventDefault();
        getData(pageSize, pageNumber, selectedValue, searchValue);
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const handleShow = (expertiseCategoryId, selectedData) => {
        setSelectedData(selectedData);
        setIdDelete(expertiseCategoryId)
        setShow(true);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteExpertiseCategory( idDelete );
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                window.location.reload();
                navigate('../client');
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Expertise Category</h5>
                    </div>
                    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                        <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                            <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '170px' }} value={selectedValue} onChange={handleSelectChange}>
                                <option value="">Filter</option>
                                <option value="name">Name</option>
                                <option value="status">Status</option>
                            </Form.Select>
                            <div className="inline-block">
                                <svg className="position-absolute" style={{ top: '2.25rem', marginLeft: '1rem' }} width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <Form.Control type="search" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingLeft: '3rem' }}
                                    value={searchValue[selectedValue] || ''} onChange={handleSearchChange}
                                />
                            </div>
                        </Form>
                        <Link to='./add'>
                            <Button style={{ background: '#E1F7E3', color: '#23BD33', border: '0px', borderRadius: '0.5rem', width: isMobile ? '100%' : '' }} className="px-2">
                                <FiPlusCircle size='20px' style={{ marginRight: '0.5rem' }} />
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>Add Data</span>
                            </Button>
                        </Link>
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive border-bottom my-3">
                        <Table>
                            <thead>
                                <tr>
                                    {userTableHeader.map((header) => (
                                        // width: index === 2 ? '100px' : '50%'
                                        <th key={header} style={{ fontSize: '14px' }}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {expertiseCategory.map((data, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {/* Ganti tampilan icon dengan image */}
                                        <td>
                                            <img
                                                src={data.icon}
                                                alt="icon"
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.seq}</td>
                                        <td>{data.status?.toLowerCase() === "active" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                        <td>
                                            <Link to={`/dashboard/expertiseCategory/edit/${data?.id}`}>
                                                <Button className="p-0" style={{ fontSize: '15px', color: '#FFBB34', width: '24px', height: '24px', background: '#FFF5D6', border: '0px', marginRight: '0.5rem' }}>
                                                    <FaRegEdit />
                                                </Button>
                                            </Link>
                                            <Button className="p-0" style={{ fontSize: '15px', color: '#FF3548', width: '24px', height: '24px', background: '#FFE1E4', border: '0px' }}
                                                onClick={() => handleShow( data?.id , data?.name)}
                                            >
                                                <GoTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="d-flex justify-content-center">
                        <PaginationCustom
                            pageSize={pageSize}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalData={totalData}
                            setPageSize={setPageSize}
                        />
                    </div>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Expertise Category'
                data={selectedData}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
};


export default ExpertiseCategory