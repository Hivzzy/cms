import { Button, Card, Form, Stack, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteCareer, getAllCareer } from "../../../services/apiServices";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from "react-router-dom";
import PaginationCustom from "../../../components/form/PaginationCustom";
import ModalForm from "../../../components/form/ModalForm";
import DetailCareerCard from "./DetailCareerCard";


const Portofolio = () => {
    const [portofolio, setPortofolio] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        title: '',
        client: '',
        category: '',
        nda: '',
        startDate: '',
        endDate: '',
        highlight: '',
        status: ''
    });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData] = useState(10);

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);



    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        // setSearchValue(e.target.value);
        const { name, value } = e.target;
        setSearchValue(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllCareer(
                { pageSize, pageNumber, [selectedValue]: searchValue[selectedValue] }
            );
            console.log(data.data);

            if (data?.data) {
                setPortofolio(data.data);
            } else {
                setPortofolio([]);
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

    const userTableHeader = ['TITLE', 'CLIENT', 'CATEGORY', 'NDA', 'START', 'END', 'HIGHLIGHT', 'STATUS', 'ACTION'];

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        getData(pageSize, pageNumber, selectedValue, searchValue);
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const handleShow = (selectedData) => {
        setSelectedData(selectedData);
        setShow(true);
    }

    const handleDetailShow = (selectedData) => {
        setSelectedData(selectedData);
        setDetailShow(true);
    };

    const handleDetailClose = () => {
        setDetailShow(false);
    };

    const handleDelete = async () => {
        console.log("isi ini",selectedData)
        try {
            const response = await deleteCareer(selectedData);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../Career');
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
                        <h5 className="card-title" style={{ color: '#242845' }}>Career</h5>
                    </div>
                    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                        <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                            <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '170px' }} value={selectedValue} onChange={handleSelectChange}>
                                <option value="">Filter</option>
                                <option value="title">Title</option>
                                <option value="client">Client</option> 
                                <option value="category">Category</option>
                                <option value="nda">NDA</option>
                                <option value="startDate">Start Date</option>
                                <option value="endDate">End Date</option>
                                <option value="highlight">Highlight</option>
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
                                        <th key={header} style={{ fontSize: '14px' }}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {portofolio.map((data, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{data.title}</td>
                                        <td>{data.position}</td>
                                        <td>{data.placement}</td>
                                        <td>{data.startDate}</td>
                                        <td>{data.endDate}</td>
                                        <td>{data.status?.toLowerCase() == "active".toLowerCase() ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                        <td>
                                            <Button
                                                className="p-0"
                                                style={{ fontSize: '15px', color: '#0078D7', width: '24px', height: '24px', background: '#F4F7FE', border: '0px', marginRight: '0.5rem' }}
                                                onClick={() => handleDetailShow(data)} // Panggil handleDetailShow dengan data yang sesuai
                                            >
                                                <IoEyeOutline />
                                            </Button>
                                            <Link to={`/dashboard/portofolio/edit`}>
                                                <Button className="p-0" style={{ fontSize: '15px', color: '#FFBB34', width: '24px', height: '24px', background: '#FFF5D6', border: '0px', marginRight: '0.5rem' }}>
                                                    <FaRegEdit />
                                                </Button>
                                            </Link>
                                            <Button
                                                className="p-0"
                                                style={{ fontSize: '15px', color: '#FF3548', width: '24px', height: '24px', background: '#FFE1E4', border: '0px' }}
                                                onClick={() => handleShow(data.id)}
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
                page='Career'
                data={selectedData}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <DetailCareerCard
                show={detailShow}
                handleClose={handleDetailClose}
                data={selectedData} 
            />
        </>
    )
};


export default Portofolio