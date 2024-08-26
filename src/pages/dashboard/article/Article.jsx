import { Button, Card, Form, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteArticle, getAllArticle } from "../../../services/apiServices";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { Link } from "react-router-dom";
import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import TableHeader from "../../../components/dashboard/TableHeader";

const Article = () => {
    const [article, setArticle] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        category: '',
        highlight: '',
        status: ''
    });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [isNoData, setIsNoData] = useState(false);

    const [sortConfig, setSortConfig] = useState({ sortBy: 'title', direction: 'ASC' });

    const [statusValue, setStatusValue] = useState('');
    const [startReleaseDate, setstartReleaseDate] = useState('');

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllArticle(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    [selectedValue]: selectedValue === 'status' ? statusValue : selectedValue === 'startReleaseDate' ? startReleaseDate : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
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
    }, [pageSize, pageNumber, sortConfig, statusValue, startReleaseDate]);

    const tableHeaders = [
        { name: "TITLE", value: "title" },
        { name: "RELEASE DATE", value: "releaseDate" },
        { name: "CATEGORY" },
        { name: "HIGHLIGHT" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

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

    const handleShow = (selectedData) => {
        setSelectedData(selectedData);
        setShow(true);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteArticle(selectedData.id);
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

    const filterOptions = [
        {
            value: 'startReleaseDate', name: 'Release Date'
        },
        {
            value: 'category', name: 'Category'
        },
        {
            value: 'highlight', name: 'Highlight'
        },
        {
            value: 'status', name: 'Status'
        },
    ]

    const otherSelectRender = () => (
        <>
            {/* <Form.Select aria-label="Select Category" value={startReleaseDate} name={selectedValue} onChange={(e) => setstartReleaseDate(e.target.value)} style={{ minWidth: '170px' }}>
                <Form.Label>Source</Form.Label>
                <Form.Control type="password"

                />
            </Form.Select> */}
            <Form.Control type="date" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingRight: '0.75rem' }}
                value={startReleaseDate} onChange={(e) => setstartReleaseDate(e.target.value)} disabled={!selectedValue}
            />
        </>
    )

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Article'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue='startReleaseDate'
                    renderOtherFIlterForm={otherSelectRender}
                />
                <Card.Body>
                    {isNoData ?
                        <div className="text-center fw-bold h1 m-5">
                            No data available
                        </div>
                        :
                        <>
                            <div className="table-responsive border-bottom my-3">
                                <Table>
                                    <TableHeader tableHeaders={tableHeaders} sortConfig={sortConfig} setSortConfig={setSortConfig} />
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
                                                        onClick={() => handleShow(data)}
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
                data={selectedData?.title}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
}

export default Article