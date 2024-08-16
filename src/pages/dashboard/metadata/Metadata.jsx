import { Card, Modal, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { deleteUser, getAllMetadata, getMetadataById } from "../../../services/apiServices";

import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../components/form/ModalForm";
import PaginationCustom from "../../../components/form/PaginationCustom";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardRowActionButton from "../../../components/dashboard/DashboardRowActionButton";

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
    const [pageNumber, setPageNumber] = useState(0);
    const [totalData, setTotalData] = useState(10);

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [metadataDetail, setMetadataDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllMetadata(
                { size: pageSize, page: pageNumber, [selectedValue]: searchValue[selectedValue] }
            );
            console.log(data);

            if (data?.data) {
                setMetadata(data.data);
                setTotalData(data.total);
            } else {
                setMetadata([]);
            }

        } catch (error) {
            // setError(error.message);
        }
    };

    useEffect(() => {
        getData(pageSize, pageNumber, selectedValue, searchValue);
    }, []);

    const userTableHeader = ["CODE", "VALUE", "ACTION"];

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
        try {
            const response = await deleteUser({ userId: selectedData.userId });
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
            // setError(error.message);
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
                    handleSelectChange={handleSelectChange}
                    searchValue={searchValue}
                    handleSearchChange={handleSearchChange}
                />
                <Card.Body>
                    <div className="table-responsive border-bottom my-3">
                        <Table>
                            <thead>
                                <tr>
                                    {userTableHeader.map((header, index) => (
                                        <th key={header} style={{ fontSize: '14px', width: index === 2 ? '100px' : '50%' }}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {metadata.map((data, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{data.code}</td>
                                        <td>{data.value}</td>
                                        <DashboardRowActionButton
                                            setShow={setShow}
                                            setSelectedData={setSelectedData}
                                            data={data?.code}
                                            handleShowModalDetail={handleShowModalDetail}
                                            linkToEdit={''}
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
                data={selectedData}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />

            {/* Modal Detail */}
            <Modal show={showDetail} onHide={handleCloseDetail} centered>
                 
            </Modal>
        </>
    )
}

export default Metadata;