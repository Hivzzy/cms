import { Card } from 'react-bootstrap'
import DashboardCardHeader from '../../../components/dashboard/DashboardCardHeader'
import { deleteClientCategory, getAllClientCategory } from '../../../services/apiServices';
import DashboardCardBody from '../../../components/dashboard/DashboardCardBody';
import ModalForm from '../../../components/form/ModalForm';
import { useEffect, useState } from 'react';

const ClientCategory = () => {
    const [clientCategory, setClientCategory] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
    });
    const [statusValue, setStatusValue] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'ASC' });


    const filterOptions = [
        {
            value: 'name', name: 'Name'
        },
        {
            value: 'status', name: 'Status'
        },
    ]

    const clientCategoryTableHeaders = [
        { name: "NAME", value: "name" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const getData = async () => {
        try {
            const data = await getAllClientCategory(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    [selectedValue]: selectedValue === 'status' ? statusValue : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.code == 200) {
                setClientCategory(data.data);
                setTotalData(data.total);
            } else {
                console.log('404', data);
                setClientCategory([]);
                setTotalData(0);
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
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig, statusValue])

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        getData();
    };

    const handleDelete = async () => {
        console.log('selected data', selectedData);

        try {
            const response = await deleteClientCategory(selectedData.id);
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
        </>
    )

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Client Category'
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
                    tableHeaders={clientCategoryTableHeaders}
                    rowData={clientCategory}
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
                />
            </Card>
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Client Category'
                data={selectedData?.name}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
}

export default ClientCategory