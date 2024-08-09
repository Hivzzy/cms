import { Button, Card, Form, InputGroup, Pagination, Stack, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../../services/apiServices";
// import DataTable from "../../../src/components/DataTable";
import { FiPlusCircle } from "react-icons/fi";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";


import { useMediaQuery } from 'react-responsive';
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { Link, useNavigate } from "react-router-dom";
import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";


const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(18);

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllUser(
                { pageSize, pageNumber, [selectedValue]: searchValue }
            );
            if (data?.data) {
                setUsers(data.data);
            } else {
                setUsers([]);
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

    const userTableHeader = ["FULLNAME", "USERNAME", "EMAIL", "ROLE", "STATUS", "ACTION"];

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

    const handleShow = (selectedUser) => {
        setSelectedUser(selectedUser);
        setShow(true);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteUser({ userId: selectedUser.userId });
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                navigate('../user');
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
                        <h5 className="card-title" style={{ color: '#242845' }}>User</h5>
                    </div>
                    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                        <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                            <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '150px' }} value={selectedValue} onChange={handleSelectChange}>
                                <option value="">Filter</option>
                                <option value="username">Username</option>
                                <option value="email">Email</option>
                                <option value="fullname">Fullname</option>
                                <option value="role">Role</option>
                                <option value="status">Status</option>
                            </Form.Select>
                            <InputGroup>
                                <InputGroup.Text id="search-input">
                                    <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                        <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </InputGroup.Text>
                                <Form.Control type="search" placeholder="Search..." aria-label="Search filter"
                                    value={searchValue} onChange={handleSearchChange} readOnly={!selectedValue}
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
                        />
                    </div>
                </Card.Body>
            </Card>
            <ModalForm
                show={show}
                handleClose={handleClose}
                page='User'
                data={selectedUser?.username}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default User 