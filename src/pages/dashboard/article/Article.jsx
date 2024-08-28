import { Card, Form, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteArticle, getAllArticle, getArticleById } from "../../../services/apiServices";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import DashboardCard from "../DashboardCard";
import ArticleForm from "./ArticleForm";

const Article = () => {
    const [article, setArticle] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        category: '',
        highlight: '',
        status: ''
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'title', direction: 'ASC' });
    const [statusValue, setStatusValue] = useState('');
    const [highlightValue, setHighlightValue] = useState('');
    const [startReleaseDate, setstartReleaseDate] = useState('');
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
                } else if (selectedValue === 'startReleaseDate') {
                    return startReleaseDate;
                } else if (selectedValue === 'highlight') {
                    if (highlightValue == 'null') {
                        return null
                    }
                    return highlightValue;
                } else {
                    return searchValue[selectedValue];
                }
            };
            const data = await getAllArticle(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: getSearchValue(selectedValue),
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setArticle(data.data);
                setTotalData(data.total);
            } else {
                setArticle([]);
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
    }, [statusValue, startReleaseDate, highlightValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        getData(1);
    };

    const tableHeaders = [
        { name: "TITLE", value: "title" },
        { name: "RELEASE DATE", value: "releaseDate" },
        { name: "CATEGORY" },
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
            const response = await deleteArticle(selectedData.id);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (article.length === 1 && pageNumber > 1) {
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

    const otherSelectRender = () => {
        if (selectedValue == 'startReleaseDate') {
            return (
                <Form.Control type="date" placeholder="Search..." aria-label="Search filter" name='startReleaseDate' style={{ paddingRight: '0.75rem' }}
                    value={startReleaseDate} onChange={(e) => setstartReleaseDate(e.target.value)} disabled={!selectedValue}
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
        }

    }

    const rowRender = (data) => (
        <>
            <td>{data.title}</td>
            <td>{data.releaseDate}</td>
            <td>{data.category}</td>
            <td>{data.highlight}</td>
        </>
    )

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getArticleById(dataId);
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
                    tittle='Article'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue={['startReleaseDate', 'highlight']}
                    renderOtherFIlterForm={otherSelectRender}
                    getData={getData}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={article}
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
                page='Article'
                data={selectedData?.title}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '85%' }}>
                <DashboardCard cardTittle="Detail Article">
                    <ArticleForm
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

export default Article