import { Card, Modal } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteMetadata, getAllMetadata, getMetadataById } from "../../../services/apiServices";

import ModalForm from "../../../components/form/ModalForm";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import MetadataForm from "./MetadataForm";
import DashboardCard from "../DashboardCard";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";

const Metadata = () => {
    const [metadata, setMetadata] = useState([
        {
            code: '<html></html>',
            value: 'html'
        },
        {
            code: '<html>2</html>',
            value: 'html'
        }
    ]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        code: '',
        value: '',
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'code', direction: 'ASC' });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);

    const [selectedData, setSelectedData] = useState(null);
    const [metadataDetail, setMetadataDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const getData = async (numberPage = pageNumber) => {
        setIsLoading(true);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const data = await getAllMetadata(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setMetadata(data.data);
                setTotalData(data.total);
            } else {
                setMetadata([]);
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

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setPageNumber(1)
        getData(1);
    };

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 1000);
    }

    const handleDelete = async () => {
        try {
            const response = await deleteMetadata(selectedData.id);
            console.log('Success delete:', response);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (metadata.length === 1 && pageNumber > 1) {
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
            value: 'code', name: 'Code'
        },
        {
            value: 'value', name: 'value'
        }
    ]

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getMetadataById(dataId);
            if (data.code === 200) {
                setMetadataDetail(data.data)
                setShowDetail(true)
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

    const tableHeaders = [
        { name: "Code", value: "code" },
        { name: "VALUE" },
        { name: "ACTION" }
    ];

    const rowRender = (data) => (
        <>
            <td>{data.code}</td>
            <td style={{ maxWidth: '700px' }} className="text-truncate">{data.value}</td>
        </>
    )

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Metadata'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={metadata}
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
                    isHaveStatus={false}
                    isLoading={isLoading}
                />
            </Card >
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Metadata'
                data={selectedData?.code}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '80%' }}>
                <DashboardCard cardTittle="Detail Metadata">
                    <MetadataForm
                        formData={metadataDetail}
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

export default Metadata;