import { Card, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteUser, getAllUser, getUserById } from "../../../services/apiServices";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import DashboardCard from "../DashboardCard";
import UserForm from "./UserForm";


const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        username: '',
        email: '',
        fullname: '',
        role: '',
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'fullname', direction: 'ASC' });
    const [statusValue, setStatusValue] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);

    const [selectedData, setSelectedData] = useState(null);
    const [dataDetail, setDataDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const getData = async (numberPage = pageNumber) => {
        setIsLoading(true)
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const data = await getAllUser(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
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
                setIsError(true);
                setErrorMessage(data.message)
                setShow(true);
            }

        } catch (error) {
            setIsError(true);
            setErrorMessage("Terjadi kesalahan server")
            setShow(true);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig]);

    useEffect(() => {
        setPageNumber(1)
        getData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        getData(1);
    };

    const userTableHeader = [
        { name: "FULLNAME", value: "fullname" },
        { name: "USERNAME", value: "username" },
        { name: "EMAIL" },
        { name: "ROLE" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteUser(selectedData.userId);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (users.length === 1 && pageNumber > 1) {
                    setPageNumber(prev => prev - 1)
                }
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

    const rowRender = (data) => (
        <>
            <td>{data.fullname}</td>
            <td>{data.username}</td>
            <td>{data.email}</td>
            <td>{data.role}</td>
        </>
    )

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getUserById(dataId);
            if (data.code === 200) {
                setDataDetail(prev => ({
                    ...prev,
                    ...data.data,
                    articleId: data.data.id,
                    category: data.data.metadata.category,
                    source: data.data.metadata.source?.join(', '),
                    tags: data.data.metadata.tags?.join(', '),
                }));
                setShowDetail(true)
                console.log(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

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
                <DashboardCardBody
                    tableHeaders={userTableHeader}
                    rowData={users}
                    rowRender={rowRender}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalData={totalData}
                    setPageSize={setPageSize}
                    setSortConfig={setSortConfig}
                    sortConfig={sortConfig}
                    setShow={setShow}
                    setSelectedData={setSelectedData}
                    handleShowModalDetail={handleShowModalDetail}
                    isLoading={isLoading}
                />
            </Card>
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Article'
                data={selectedData?.username}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '85%' }}>
                <DashboardCard cardTittle="Detail Article">
                    <UserForm
                        formData={dataDetail}
                        isJustDetail={true}
                        show={show}
                        setShow={setShow}
                        setShowDetail={setShowDetail}
                        setSelectedData={setSelectedData}
                    />
                </DashboardCard>
            </Modal>
        </>
    )
}

export default User 