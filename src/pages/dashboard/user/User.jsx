import { Button, Card, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../../services/apiServices";
// import DataTable from "../../../src/components/DataTable";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { Link } from "react-router-dom";
import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";
import TableHeader from "../../../components/dashboard/TableHeader";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";


const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        username: '',
        email: '',
        fullname: '',
        role: '',
    });
    const [statusValue, setStatusValue] = useState('')

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(0);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState({userId: 0, username: ''});

    const [sortConfig, setSortConfig] = useState({ sortBy: 'fullname', direction: 'ASC' });

    const getData = async () => {
        try {
            const data = await getAllUser(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    [selectedValue]: selectedValue === 'status' ? statusValue : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setTotalData(data.total)
                setUsers(data.data);
            } else {
                setUsers([]);
            }

        } catch (error) {
            // setError(error.message);
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig, statusValue]);

    const userTableHeader = [
        { name: "FULLNAME", value: "fullname" },
        { name: "USERNAME", value: "username" },
        { name: "EMAIL" },
        { name: "ROLE" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }


        getData(searchValue, selectedValue)
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
            const response = await deleteUser(selectedData.userId);
            setShow(false);
            if (response.code === 200) {
                getData(selectedValue, searchValue);
            } else if (response.code === 400) {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const filterOptions = [
        {
            value: 'username', name: 'Username'
        },
        {
            value: 'email', name: 'Email'
        },
        {
            value: 'fullname', name: 'Fullname'
        },
        {
            value: 'role', name: 'Role'
        },
        {
            value: 'status', name: 'Status'
        },
    ]

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='User'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    getData={getData}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                />
                <Card.Body>
                    <div className="table-responsive border-bottom my-3">
                        <Table>
                            <TableHeader tableHeaders={userTableHeader} sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <tbody>
                                {users.map((user, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{user.fullname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status === "Active" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                        <td>
                                            <Link to={`/dashboard/user/edit/${user.userId}`}>
                                                <Button className="p-0" style={{ fontSize: '15px', color: '#FFBB34', width: '24px', height: '24px', background: '#FFF5D6', border: '0px', marginRight: '0.5rem' }}>
                                                    <FaRegEdit />
                                                </Button>
                                            </Link>
                                            <Button className="p-0" style={{ fontSize: '15px', color: '#FF3548', width: '24px', height: '24px', background: '#FFE1E4', border: '0px' }}
                                                onClick={() => handleShow(user)}
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
                page='Article'
                data={selectedData.username}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
}

export default User 