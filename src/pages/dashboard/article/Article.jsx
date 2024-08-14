import { Button, Card, Form, InputGroup, Stack, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteArticle, getAllArticle } from "../../../services/apiServices";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";


import { useMediaQuery } from 'react-responsive';
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { Link } from "react-router-dom";
import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";

const Article = () => {
    const [article, setArticle] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        startReleaseDate: '',
        category: '',
        highlight: '',
        status: ''
    });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalData, setTotalData] = useState(10);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [isNoData, setIsNoData] = useState(false);

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
            const data = await getAllArticle(
                { size: pageSize, page: pageNumber, [selectedValue]: searchValue[selectedValue] }
            );

            if (data?.data) {
                setIsNoData(false);
                setTotalData(data.total);
                setArticle(data.data);
            } else {
                setIsNoData(true)
                setArticle([]);
            }

        } catch (error) {
            setIsNoData(true)
        }
    };

    useEffect(() => {
        getData(pageSize, pageNumber, selectedValue, searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber]);

    const userTableHeader = ["TITLE", "RELEASE DATE", "CATEGORY", 'HIGHLIGHT', 'STATUS', 'ACTION'];

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

    const handleDelete = async () => {
        try {
            const response = await deleteArticle(selectedData);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                getData(pageSize, pageNumber, selectedValue, searchValue);
            } else {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response || error.message);
        }
    };

    return (
        <>
            <Card>
                <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="header-title mb-3 mb-md-0">
                        <h5 className="card-title" style={{ color: '#242845' }}>Article</h5>
                    </div>
                    {/* <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                        <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                            <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '170px' }} value={selectedValue} onChange={handleSelectChange}>
                                <option value="">Filter</option>
                                <option value="startReleaseDate">Release Date</option>
                                <option value="category">Category</option>
                                <option value="highlight">Highlight</option>
                                <option value="status">Status</option>
                            </Form.Select>

                            <div className="inline-block">
                                <svg className="position-absolute" style={{ top: '2.25rem', marginLeft: '1rem' }} width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <Form.Control type="search" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingLeft: '3rem' }}
                                    value={searchValue[selectedValue] || ''} onChange={handleSearchChange} disabled={!selectedValue}
                                />
                            </div>
                        </Form>
                        <Link to='./add'>
                            <Button style={{ background: '#E1F7E3', color: '#23BD33', border: '0px', borderRadius: '0.5rem', width: isMobile ? '100%' : '' }} className="px-2">
                                <FiPlusCircle size='20px' style={{ marginRight: '0.5rem' }} />
                                <span style={{ fontSize: '14px', fontWeight: 600 }}>Add Data</span>
                            </Button>
                        </Link>
                    </Stack> */}
                    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                        <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                            <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '170px' }} value={selectedValue} onChange={handleSelectChange}>
                                <option value="">Filter</option>
                                <option value="startReleaseDate">Release Date</option>
                                <option value="category">Category</option>
                                <option value="highlight">Highlight</option>
                                <option value="status">Status</option>
                            </Form.Select>
                            <InputGroup>
                                <svg className="position-absolute" style={{ top: '0.75rem', marginLeft: '1rem', zIndex: 1 }} width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <Form.Control type="search" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingLeft: '3rem' }}
                                    value={searchValue[selectedValue] || ''} onChange={handleSearchChange} disabled={!selectedValue}
                                />
                            </InputGroup>
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
                    {isNoData ?
                        <div className="text-center fw-bold h1 m-5">
                            No data available
                        </div>
                        :
                        <>
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
                                        {article.map((data, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{data.title}</td>
                                                <td>{data.releaseDate}</td>
                                                <td>{data.category}</td>
                                                <td>{data.highlight}</td>
                                                <td>{data.status?.toLowerCase() == "Active".toLowerCase() ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                                <td>
                                                    <Link to={`/dashboard/article/detail/${data.id}`}>
                                                        <Button className="p-0" style={{ fontSize: '15px', color: '#0078D7', width: '24px', height: '24px', background: '#F4F7FE', border: '0px', marginRight: '0.5rem' }}>
                                                            <IoEyeOutline />
                                                        </Button>
                                                    </Link>
                                                    <Link to={`/dashboard/article/edit/${data.id}`}>
                                                        <Button className="p-0" style={{ fontSize: '15px', color: '#FFBB34', width: '24px', height: '24px', background: '#FFF5D6', border: '0px', marginRight: '0.5rem' }}>
                                                            <FaRegEdit />
                                                        </Button>
                                                    </Link>
                                                    <Button className="p-0" style={{ fontSize: '15px', color: '#FF3548', width: '24px', height: '24px', background: '#FFE1E4', border: '0px' }}
                                                        onClick={() => handleShow(data?.id)}
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
                        </>
                    }
                </Card.Body>
            </Card >
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Article'
                data={selectedData}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
}

export default Article