import { Card, Form, Image } from 'react-bootstrap'
import DashboardCardHeader from '../../../components/dashboard/DashboardCardHeader'
import { deleteExpertise, getAllExpertise, getAllExpertiseCategory } from '../../../services/apiServices';
import DashboardCardBody from '../../../components/dashboard/DashboardCardBody';
import ModalForm from '../../../components/form/ModalForm';
import { useEffect, useState } from 'react';

const Expertise = () => {
    const [expertise, setExpertise] = useState([]);
    const [expertiseCategory, setExpertiseCategory] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        name: '',
        category: '',
    });
    const [statusValue, setStatusValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [sortConfig, setSortConfig] = useState({ sortBy: 'name', direction: 'ASC' });

    const [isLoading, setIsLoading] = useState(true);

    const filterOptions = [
        {
            value: 'name', name: 'Name'
        },
        {
            value: 'status', name: 'Status'
        },
        {
            value: 'category', name: 'Category'
        }
    ]

    const expertiseTableHeaders = [
        { name: "ICON" },
        { name: "NAME", value: "name" },
        { name: "CATEGORY", value: "category" },
        { name: "STATUS" },
        { name: "ACTION" }
    ];

    const getData = async (numberPage = pageNumber) => {
        setIsLoading(true);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const data = await getAllExpertise(
                {
                    pageSize: pageSize,
                    pageNumber: numberPage,
                    [selectedValue]: selectedValue === 'status' ? statusValue : selectedValue === 'category' ? categoryValue : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );
            if (data?.code == 200) {
                setExpertise(data.data);
                setTotalData(data.total);
            } else {
                console.log('404', data);
                setExpertise([]);
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
    }, [pageSize, pageNumber, sortConfig])

    useEffect(() => {
        setPageNumber(1)
        getData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusValue, categoryValue])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setPageNumber(1)
        getData(1);
    };

    useEffect(() => {
        const getCategory = async () => {
            try {
                const data = await getAllExpertiseCategory();
                console.log(data);

                if (data?.data) {
                    setExpertiseCategory(data.data);
                }
            } catch (error) {
                console.error("Error API", error.message);
            }
        }

        getCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleDelete = async () => {
        try {
            const response = await deleteExpertise(selectedData.id);
            console.log('Success:', response);
            setShow(false);
            if (response.code === 200) {
                getData(pageNumber - 1);
                if (expertise.length === 1 && pageNumber > 1) {
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
            <td>
                <span>
                    <Image src={data.icon} height='24px' className='me-2' />
                    {data.icon.split('/').pop()}
                </span>
            </td>
            <td>{data.name}</td>
            <td>{data.category.name}</td>
        </>
    )

    const otherSelectRender = () => (
        <>
            <Form.Select aria-label="Select Category" value={categoryValue} name={selectedValue} onChange={(e) => setCategoryValue(e.target.value)} style={{ minWidth: '170px' }}>
                <option value="">Select Category</option>
                {expertiseCategory.map((category) => (
                    <option value={category.name} key={category.id}>{category.name}</option>
                ))}
            </Form.Select>
        </>
    )

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Expertise'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue='category'
                    renderOtherFIlterForm={otherSelectRender}
                />
                <DashboardCardBody
                    tableHeaders={expertiseTableHeaders}
                    rowData={expertise}
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
                    isLoading={isLoading}
                />
            </Card>
            <ModalForm
                show={show}
                buttonType='danger'
                handleClose={handleClose}
                page='Expertise'
                data={selectedData?.name}
                formSubmit={handleDelete}
                isError={isError}
                errorMessage={errorMessage}
                isDelete={true}
            />
        </>
    )
}

export default Expertise