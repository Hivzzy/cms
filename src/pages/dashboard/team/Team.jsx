import { Card, Modal } from "react-bootstrap"
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader"
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody"
import ModalForm from "../../../components/form/ModalForm"
import { useEffect, useState } from "react"
import { deleteTeam, getAllTeam, getTeamById } from "../../../services/apiServices"
import DashboardCard from "../DashboardCard"
import TeamForm from "./TeamForm"

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
        position: '',
        email: '',
        status: '',
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'ASC' });
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

    const filterOptions = [
        {
            value: 'name', name: 'Name'
        },
        {
            value: 'position', name: 'Position'
        },
        {
            value: 'email', name: 'Email'
        },
        {
            value: 'status', name: 'Status'
        }
    ]

    const tableHeaders = [
        { name: "NAME", value: "name" },
        { name: "POSITION", value: "position" },
        { name: "EMAIL" },
        { name: "SEQ" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const getData = async (numberPage = pageNumber) => {
        setIsLoading(true);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const data = await getAllTeam(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: selectedValue === 'status' ? statusValue : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setTeamData(data.data);
                setTotalData(data.total);
            } else {
                setTeamData([]);
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
        setPageNumber(1);
        getData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1);
        getData(1);
    };

    const handleDelete = async () => {
        try {
            const response = await deleteTeam(selectedData.id);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (teamData.length === 1 && pageNumber > 1) {
                    setPageNumber(prev => prev - 1)
                }
            } else {
                setIsError(true);
                setErrorMessage(response.message)
                setShow(true);
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const rowRender = (data) => (
        <>
            <td>{data.name}</td>
            <td>{data.position}</td>
            <td>{data.email}</td>
            <td>{data.seq}</td>
        </>
    )

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getTeamById(dataId);
            if (data.code === 200) {
                setDataDetail(data.data)
                setShowDetail(true)
            } else {
                setIsError(true);
                setErrorMessage(data.message)
                setShow(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage("Terjadi kesalahan server")
            setShow(true);
        }
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Team'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={teamData}
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
                page='Team'
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                data={selectedData?.name}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '85%' }}>
                <DashboardCard cardTittle="Detail Team">
                    <TeamForm
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

export default Team