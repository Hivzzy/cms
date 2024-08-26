import { useEffect, useState } from "react";
import { deleteTestimonial, getAllTestimonial, getTestimonialById } from "../../../services/apiServices";
import { Card, Modal } from "react-bootstrap";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import DashboardCardBody from "../../../components/dashboard/DashboardCardBody";
import ModalForm from "../../../components/form/ModalForm";
import DashboardCard from "../DashboardCard";
import TestimonialForm from "./TestimonialForm";

const Testimonial = () => {
    const [testimonialData, setTestimonialData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
        position: '',
        client: '',
        description: '',
    });

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalData, setTotalData] = useState(10);
    
    const [sortConfig, setSortConfig] = useState({ sortBy: 'seq', direction: 'ASC' });

    const [dataDetail, setDataDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);

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

    const testimonialsDummy = [
        {
            id: 1,
            name: "John Doe",
            position: "Software Engineer",
            description: "Great service and support!",
            seq: 1,
            status: "active",
            client: {
                id: 101,
                name: "Tech Corp",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 2,
            name: "Jane Smith",
            position: "Project Manager",
            description: "Highly recommend this company.",
            seq: 2,
            status: "active",
            client: {
                id: 102,
                name: "Innovate Ltd",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 3,
            name: "Alice Johnson",
            position: "UX Designer",
            description: "Amazing experience!",
            seq: 3,
            status: "active",
            client: {
                id: 103,
                name: "Design Studio",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 4,
            name: "Bob Brown",
            position: "Data Analyst",
            description: "Very professional team.",
            seq: 4,
            status: "active",
            client: {
                id: 104,
                name: "Data Insights",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 5,
            name: "Charlie Davis",
            position: "Marketing Specialist",
            description: "Exceeded our expectations.",
            seq: 5,
            status: "active",
            client: {
                id: 105,
                name: "Market Leaders",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 6,
            name: "Diana Evans",
            position: "HR Manager",
            description: "Fantastic collaboration.",
            seq: 6,
            status: "active",
            client: {
                id: 106,
                name: "HR Solutions",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 7,
            name: "Ethan Foster",
            position: "Product Manager",
            description: "Very satisfied with the results.",
            seq: 7,
            status: "active",
            client: {
                id: 107,
                name: "Product Hub",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 8,
            name: "Fiona Green",
            position: "Business Analyst",
            description: "Great attention to detail.",
            seq: 8,
            status: "active",
            client: {
                id: 108,
                name: "Biz Analytics",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 9,
            name: "George Harris",
            position: "Sales Manager",
            description: "Excellent customer service.",
            seq: 9,
            status: "active",
            client: {
                id: 109,
                name: "Sales Experts",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        },
        {
            id: 10,
            name: "Hannah White",
            position: "Operations Manager",
            description: "Smooth and efficient process.",
            seq: 10,
            status: "active",
            client: {
                id: 110,
                name: "Ops Solutions",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        }
    ];

    const getData = async () => {
        // try {
        //     const data = await getAllTestimonial(
        //         {
        //             size: pageSize,
        //             page: pageNumber,
        //             [selectedValue]: selectedValue === 'status' ? statusValue : searchValue[selectedValue],
        //             sortBy: sortConfig.sortBy,
        //             direction: sortConfig.direction
        //         }
        //     );
        //     if (data?.data) {
        //         setTestimonialData(data.data);
        //         setTotalData(data.total);
        //     } else {
        //         setTestimonialData([]);
        //         setIsError(true);
        //         setErrorMessage(data.message)
        //         setShow(true);
        //     }
        // } catch (error) {
        //     setIsError(true);
        //     setErrorMessage("Terjadi kesalahan server")
        //     setShow(true);
        // }
        setTestimonialData(testimonialsDummy);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig]);

    const handleSubmit = (event) => {
        event.preventDefault();
        getData();
    };

    const handleDelete = async () => {
        console.log('selected data', selectedData);

        try {
            const response = await deleteTestimonial(selectedData.id);
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
            <td>{data.position}</td>
            <td>{data.client.name}</td>
            <td>{data.description}</td>
            <td>{data.seq}</td>
        </>
    )

    const handleShowModalDetail = async (dataId) => {
        // try {
        //     const data = await getTestimonialById(dataId);
        //     if (data.code === 200) {
        //         setDataDetail(data.data)
        //         setShowDetail(true)
        //         console.log(data.data);
        //     }
        // } catch (error) {
        //     console.log(error);

        // }

        const dummy = {
            id: 1,
            name: "John Doe",
            position: "Software Engineer",
            description: "Great service and support!",
            seq: 1,
            status: "active",
            client: {
                id: 101,
                name: "Tech Corp",
                icon: "https://cdn-icons-png.freepik.com/256/1077/1077114.png"
            }
        }
        setDataDetail(dummy)
        setShowDetail(true)
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
                <DashboardCard cardTittle="Detail Metadata">
                    <TestimonialForm
                        formData={dataDetail}
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

export default Testimonial