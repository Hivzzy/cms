import { Card, Modal, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteMetadata, getAllMetadata, getMetadataById } from "../../../services/apiServices";

import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardRowActionButton from "../../../components/dashboard/DashboardRowActionButton";
import MetadataForm from "./MetadataForm";
import DashboardCard from "../DashboardCard";
import TableHeader from "../../../components/dashboard/TableHeader";

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
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [metadataDetail, setMetadataDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [sortConfig, setSortConfig] = useState({ sortBy: 'code', direction: 'ASC' });

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllMetadata(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
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
        }
    };

    useEffect(() => {
        getData(pageSize, pageNumber, selectedValue, searchValue);
        console.log('call api');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig]);

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

    const handleDelete = async () => {
        console.log('selected data', selectedData);

        try {
            const response = await deleteMetadata(selectedData.id);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                getData(pageSize, pageNumber, selectedValue, searchValue);
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
                console.log(data.data);
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

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Metadata'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    handleSelectChange={handleSelectChange}
                    searchValue={searchValue}
                    handleSearchChange={handleSearchChange}
                />
                <Card.Body>
                    <div className="table-responsive border-bottom my-3">
                        <Table>
                            <TableHeader tableHeaders={tableHeaders} sortConfig={sortConfig} setSortConfig={setSortConfig} />
                            <tbody>
                                {metadata.map((data, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{data.code}</td>
                                        <td style={{ maxWidth: '700px' }} className="text-truncate">{data.value}</td>
                                        <DashboardRowActionButton
                                            setShow={setShow}
                                            setSelectedData={setSelectedData}
                                            data={data}
                                            handleShowModalDetail={handleShowModalDetail}
                                            linkToEdit={`./edit/${data.id}`}
                                            dataId={data.id}
                                        />
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

            {/* Modal Detail */}
            <Modal show={showDetail} onHide={handleCloseDetail} centered style={{ '--bs-modal-width': '80%' }}>
                <DashboardCard cardTittle="Detail Metadata">
                    <MetadataForm
                        defaultValues={metadataDetail}
                        isJustDetail={true}
                        show={show}
                        setShow={setShow}
                        handleDelete={handleDelete}
                        setShowDetail={setShowDetail}
                    />
                </DashboardCard>
            </Modal>
        </>
    )
}

export default Metadata;