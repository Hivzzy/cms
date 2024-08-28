import { useEffect, useState } from "react";
import { deleteTestimonial, getAllTestimonial, getTestimonialById } from "../../../services/apiServices";
import { Card, Form, Modal } from "react-bootstrap";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCard from "../DashboardCard";
import TestimonialForm from "./TestimonialForm";

const Testimonial = () => {
    const [testimonialData, setTestimonialData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
        position: '',
        client: '',
        description: '',
    });
    const [sortConfig, setSortConfig] = useState({ sortBy: 'seq', direction: 'ASC' });
    const [clientValue, setClientValue] = useState('');
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
            value: 'client', name: 'Client'
        },
        {
            value: 'description', name: 'Description'
        }
    ]

    const tableHeaders = [
        { name: "NAME", value: "name" },
        { name: "POSITION" },
        { name: "CLIENT", value: "client" },
        { name: "DESCRIPTION" },
        { name: "SEQ", value: "seq" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const clientDummy = [
        {
            id: 'ca6c5a2b-0f98-4302-aa0e-04e7390ba021',
            name: 'PT Bank'
        },
        {
            id: '186780ae-6e5f-4097-b73e-a8db4e5280f4',
            name: 'PT Finnet Indonesia'
        },
        {
            id: 'a30ea498-a799-47d2-be14-0fa8d1c7975b',
            name: 'PT Affinity Health Indonesia'
        },
    ]

    const getData = async (numberPage = pageNumber) => {
        setIsLoading(true);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const getSearchValue = (selectedValue) => {
                if (selectedValue === 'client') {
                    if (clientValue == 'null') {
                        return null
                    }
                    return clientValue;
                } else {
                    return searchValue[selectedValue];
                }
            };

            const data = await getAllTestimonial(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: getSearchValue(selectedValue),
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.data) {
                setTestimonialData(data.data);
                setTotalData(data.total);
                setClientData(clientDummy);
            } else {
                setTestimonialData([]);
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
    }, [clientValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1);
        getData(1);
    };

    const handleDelete = async () => {
        console.log('selected data', selectedData);
        try {
            const response = await deleteTestimonial(selectedData.id);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (testimonialData.length === 1 && pageNumber > 1) {
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
            <td>{data.client.name}</td>
            <td style={{ maxWidth: '25rem' }} className="text-truncate">{data.description}</td>
            <td>{data.seq}</td>
        </>
    )

    const otherSelectRender = () => (
        <Form.Select aria-label="Select Client" value={clientValue} name='client' onChange={(e) => setClientValue(e.target.value)} style={{ minWidth: '170px' }}>
            <option value="null">Select Client</option>
            {clientData.map((data, index) => (
                <option value={data.name} key={index}>{data.name}</option>
            ))}
        </Form.Select>
    )

    const handleShowModalDetail = async (dataId) => {
        try {
            const data = await getTestimonialById(dataId);
            if (data.code === 200) {
                setDataDetail(data.data)
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
                    tittle='Testimonial'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    selectedOtherFilterValue='client'
                    renderOtherFIlterForm={otherSelectRender}
                />
                <DashboardCardBody
                    tableHeaders={tableHeaders}
                    rowData={testimonialData}
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
                page='Testimonial'
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
                <DashboardCard cardTittle="Detail Testimonial">
                    <TestimonialForm
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

export default Testimonial