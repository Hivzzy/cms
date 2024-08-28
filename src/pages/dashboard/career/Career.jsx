import { Card, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteCareer, getAllCareer, getCareerById } from "../../../services/apiServices";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import DashboardCard from "../DashboardCard";
import CareerForm from "./CareerForm";

const Career = () => {
    const [career, setCareer] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        status: '',
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'title', direction: 'ASC' });

    const [statusValue, setStatusValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


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
        setIsLoading(true);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const getSearchValue = (selectedValue) => {
                if (selectedValue === 'status') {
                    return statusValue;
                } else if (selectedValue === 'startDate') {
                    return startDate;
                } else if (selectedValue === 'endDate') {
                    return endDate;
                } else {
                    return searchValue[selectedValue];
                }
            };
            const data = await getAllCareer(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: getSearchValue(selectedValue),
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setCareer(data.data);
                setTotalData(data.total);
            } else {
                setCareer([]);
                setTotalData(0);
                setIsError(true);
                setErrorMessage(data.message)
                setShow(true);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage("Terjadi kesalahan server")
            setShow(true);
        } finally {
            setIsLoading(false);
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
    }, [statusValue, startDate, endDate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        getData(1);
    };

    const tableHeaders = [
        { name: "TITLE", value: "title" },
        { name: "POSISITION", value: "position" },
        { name: "PLACEMENT", value: "placement" },
        { name: "START", value: "startDate" },
        { name: "END", value: "endDate" },
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
            const response = await deleteCareer(selectedData.id);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (career.length === 1 && pageNumber > 1) {
                    setPageNumber(prev => prev - 1)
                }
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
            value: 'title', name: 'Title'
        },
        {
            value: 'placement', name: 'Placement'
        },
        {
            value: 'position', name: 'Position'
        },
        {
            value: 'status', name: 'Status'
        },
        {
            value: 'startDate', name: 'Start Date'
        },
        {
            value: 'endDate', name: 'End Date'
        },

    ]

    const otherSelectRender = () => {
        if (selectedValue == 'startDate') {
            return (
                <Form.Control type="date" placeholder="Search..." aria-label="Search filter" name='startDate' style={{ paddingRight: '0.75rem' }}
                    value={startDate} onChange={(e) => setStartDate(e.target.value)} disabled={!selectedValue}
                />
            )
        } else if (selectedValue == 'endDate') {
            return (
                <Form.Control type="date" placeholder="Search..." aria-label="Search filter" name='endDate' style={{ paddingRight: '0.75rem' }}
                    value={endDate} onChange={(e) => setEndDate(e.target.value)} disabled={!selectedValue}
                />
            )
        }

    }

    const rowRender = (data) => (
        <>
            <td>{data.title}</td>
            <td>{data.position}</td>
            <td>{data.placement}</td>
            <td>{data.startDate}</td>
            <td>{data.endDate}</td>
        </>
    )

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getCareerById(dataId);
            if (data.code === 200) {
                setDataDetail(prev => ({
                    ...prev,
                    ...data.data,
                    CareerId: data.data.id,
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
                    tittle='Career'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue={['startDate', 'endDate']}
                    renderOtherFIlterForm={otherSelectRender}
                    getData={getData}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={career}
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
            </Card >
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Career'
                data={selectedData?.title}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '85%' }}>
                <DashboardCard cardTittle="Detail Career">
                    <CareerForm
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

export default Career