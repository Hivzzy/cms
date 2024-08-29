import { Card, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deletePortofolio, getAllPortofolios, getPortofolioById } from "../../../services/apiServices";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import DashboardCard from "../DashboardCard";
import { FaCheckCircle } from "react-icons/fa";
import PortofolioForm from "./PortofolioForm";

const Portofolio = () => {
    const [portofolio, setPortofolio] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        category: '',
        client: '',
        highlight: '',
        nda: '',
        status: ''
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'title', direction: 'ASC' });
    const [statusValue, setStatusValue] = useState('');
    const [highlightValue, setHighlightValue] = useState('');
    const [ndaValue, setNdaValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndeDate] = useState('');

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
                } else if (selectedValue === 'nda') {
                    if (ndaValue == 'null') {
                        return null
                    }
                    return ndaValue;
                } else if (selectedValue === 'highlight') {
                    if (highlightValue == 'null') {
                        return null
                    }
                    return highlightValue;
                } else if (selectedValue === 'startDate') {
                    return startDate;
                } else if (selectedValue === 'endDate') {
                    return endDate;
                } else {
                    return searchValue[selectedValue];
                }
            };
            const data = await getAllPortofolios(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: getSearchValue(selectedValue),
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            console.log("data", data)
            if (data?.data) {
                setPortofolio(data.data);
                setTotalData(data.total);
            } else {
                setPortofolio([]);
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
    }, [statusValue, ndaValue, startDate, endDate, highlightValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        getData(1);
    };

    const tableHeaders = [
        { name: "TITLE", value: "title" },
        { name: "CLIENT", },
        { name: "CATEGORY" },
        { name: "NDA", value: 'nda' },
        { name: "START", value: "startDate" },
        { name: "END", value: "endDate" },
        { name: "HIGHLIGHT" },
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
            const response = await deletePortofolio(selectedData.id);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (portofolio.length === 1 && pageNumber > 1) {
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
            value: 'client', name: 'Client'
        },
        {
            value: 'category', name: 'Category'
        },
        {
            value: 'nda', name: 'NDA'
        },
        {
            value: 'startDate', name: 'Start Date'
        },
        {
            value: 'endDate', name: 'End Date'
        },
        {
            value: 'highlight', name: 'Highlight'
        },
        {
            value: 'status', name: 'Status'
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
                    value={endDate} onChange={(e) => setEndeDate(e.target.value)} disabled={!selectedValue}
                />
            )
        } else if (selectedValue == 'highlight') {
            return (
                <Form.Select aria-label="Select Highlight" value={highlightValue} name='highlight' onChange={(e) => setHighlightValue(e.target.value)} style={{ minWidth: '170px' }}>
                    <option value='null'>Select Highlight</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>
            )
        } else if (selectedValue == 'nda') {
            return (
                <Form.Select aria-label="Select NDA" value={ndaValue} name='nda' onChange={(e) => setNdaValue(e.target.value)} style={{ minWidth: '170px' }}>
                    <option value='null'>Select NDA</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </Form.Select>
            )
        }

    }

    const rowRender = (data) => (
        <>
            <td>{data.title}</td>
            <td>{data.client.name}</td>
            <td>{data.category}</td>
            <td>{data?.nda?.toLowerCase() === "yes" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
            <td>{data.startDate}</td>
            <td>{data.endDate}</td>
            <td>{data?.highlight?.toLowerCase() === "yes" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
        </>
    )


    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getPortofolioById(dataId);
            if (data.code === 200) {
                setDataDetail(prev => ({
                    ...prev,
                    ...data.data,
                    articleId: data.data.id,
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
                    tittle='Portofolio'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue={['startDate', 'endDate', 'nda', 'highlight']}
                    renderOtherFIlterForm={otherSelectRender}
                    getData={getData}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={portofolio}
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
                page='Portofolio'
                data={selectedData?.title}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '85%' }}>
                <DashboardCard cardTittle="Detail Portofolio">
                    <PortofolioForm
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

export default Portofolio