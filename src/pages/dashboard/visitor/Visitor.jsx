import { Card, Form, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { getAllVisitor } from "../../../services/apiServices";


import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import PaginationCustom from "../../../components/form/PaginationCustom";
import DashboardCardHeader from "../../../components/dashboard/DashboardCardHeader";
import TableHeader from "../../../components/dashboard/TableHeader";

const Visitor = () => {
    const [article, setArticle] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [searchValue, setSearchValue] = useState({
        ip: '',
        category: '',
        accessDate: ''
    });
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalData, setTotalData] = useState(10);

    const [isNoData, setIsNoData] = useState(false);

    const [sortConfig, setSortConfig] = useState({ sortBy: 'title', direction: 'ASC' });

    const [statusValue, setStatusValue] = useState('');
    const [startReleaseDate, setstartReleaseDate] = useState('');

    const getData = async (pageSize, pageNumber, selectedValue, searchValue) => {
        try {
            const data = await getAllVisitor(
                {
                    pageSize: pageSize,
                    pageNumber: pageNumber,
                    [selectedValue]: selectedValue === 'startReleaseDate' ? startReleaseDate : searchValue[selectedValue],
                    sortBy: sortConfig.sortBy,
                    direction: sortConfig.direction
                }
            );

            if (data?.data) {
                setIsNoData(false);
                setTotalData(data.total);
                setArticle(data.data);
            } else {
                setIsNoData(true)
                setArticle([]);
            }

        } catch (error) {
            setIsNoData(true)
        }
    };

    useEffect(() => {
        getData(pageSize, pageNumber, selectedValue, searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber, sortConfig, statusValue, startReleaseDate]);

    const tableHeaders = [
        { name: "IP ADDRESS", value: "ip" },
        { name: "RELEASE DATE", value: "releaseDate" },
        { name: "CATEGORY" },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        getData(pageSize, pageNumber, selectedValue, searchValue);
    };

    const filterOptions = [
        {
            value: 'ip', name: 'Ip'
        },
        {
            value: 'accessDate', name: 'Access Date'
        },
        {
            value: 'category', name: 'Category'
        },
    ]

    const otherSelectRender = () => (
        <>
            {/* <Form.Select aria-label="Select Category" value={startReleaseDate} name={selectedValue} onChange={(e) => setstartReleaseDate(e.target.value)} style={{ minWidth: '170px' }}>
                <Form.Label>Source</Form.Label>
                <Form.Control type="password"

                />
            </Form.Select> */}
            <Form.Control type="date" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingRight: '0.75rem' }}
                value={startReleaseDate} onChange={(e) => setstartReleaseDate(e.target.value)} disabled={!selectedValue}
            />
        </>
    )

    return (
        <>
            <Card>
                <DashboardCardHeader
                    tittle='Visitor'
                    filterOptions={filterOptions}
                    handleSubmit={handleSubmit}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusValue={statusValue}
                    setStatusValue={setStatusValue}
                    selectedOtherFilterValue='startReleaseDate'
                    renderOtherFIlterForm={otherSelectRender}
                    showAddButton={true}
                />
                <Card.Body>
                    {isNoData ?
                        <div className="text-center fw-bold h1 m-5">
                            No data available
                        </div>
                        :
                        <>
                            <div className="table-responsive border-bottom my-3">
                                <Table>
                                    <TableHeader tableHeaders={tableHeaders} sortConfig={sortConfig} setSortConfig={setSortConfig} />
                                    <tbody>
                                        {article.map((data, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{data.title}</td>
                                                <td>{data.releaseDate}</td>
                                                <td>{data.category}</td>
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
                        </>
                    }
                </Card.Body>
            </Card >
        </>
    )
}

export default Visitor