import { Button, Card, Form, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteClientCategory, getAllClientCategory } from "../../../services/apiServices";


import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import PaginationCustom from "../../../components/form/PaginationCustom";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import TableHeader from "../../../components/dashboard/TableHeader";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import ModalForm from "../../../components/form/ModalForm";

const ClientCategory = () => {
    const [clientCategory, setClientCategory] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
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

    const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'ASC' });

    const [statusValue, setStatusValue] = useState('');
    const [startReleaseDate, setstartReleaseDate] = useState('');

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllClientCategory(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    [selectedValue]: selectedValue === 'status' ? statusValue : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );

            if (data?.data) {
                setIsNoData(false);
                setTotalData(data.total);
                setClientCategory(data.data);
            } else {
                setIsNoData(true)
                setClientCategory([]);
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
        { name: "NAME", value: "name" },
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
            const response = await deleteClientCategory(selectedData.id);
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
            value: 'name', name: 'Name'
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
                    tittle='Client Category'
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
                    showAddButton={true}
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
                                        {clientCategory.map((data, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{data.name}</td>
                                                <td>{data.status?.toLowerCase() == "Active".toLowerCase() ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                                <td>
                                                    <Link to={`/dashboard/clientCategory/edit/${data.id}`}>
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

export default ClientCategory