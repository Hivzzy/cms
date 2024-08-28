import { Card, Placeholder, Table } from 'react-bootstrap'
import PaginationCustom from '../form/PaginationCustom'
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import DashboardRowActionButton from './DashboardRowActionButton';
import { FaCheckCircle } from 'react-icons/fa';

const DashboardCardBody = ({ tableHeaders, rowData, rowRender, pageSize, pageNumber, setPageNumber, totalData, setPageSize, sortConfig, setSortConfig,
    setShow, setSelectedData, handleShowModalDetail, isHaveStatus = true, isHavePriority, isLoading
}) => {
    return (
        <Card.Body>
            {rowData.length > 0 ?
                <div className="table-responsive border-bottom my-3">
                    <Table>
                        <TableHeader tableHeaders={tableHeaders} setSortConfig={setSortConfig} sortConfig={sortConfig} />
                        {isLoading ?
                            <tbody style={{ fontSize: '14px' }}>
                                {rowData.map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {tableHeaders.map((_, rowIndex) => (
                                            <td key={rowIndex}>
                                                <Placeholder animation="glow">
                                                    <Placeholder xs={12} />
                                                </Placeholder>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                            :
                            <tbody style={{ fontSize: '14px' }}>
                                {rowData.map((data, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {rowRender(data)}
                                        {isHavePriority &&
                                            <td>{data?.priority?.toLowerCase() === "yes" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                        }
                                        {isHaveStatus &&
                                            <td>{data?.status?.toLowerCase() === "active" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
                                        }
                                        <DashboardRowActionButton
                                            setShow={setShow}
                                            setSelectedData={setSelectedData}
                                            data={data}
                                            handleShowModalDetail={handleShowModalDetail}
                                            linkToEdit={`./edit/${data.id ? data.id : data.userId}`}
                                            dataId={data.id}
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </Table>
                </div>
                :
                <div className="text-center fw-bold h1 m-5">
                    No data available
                </div>
            }
            <div className="d-flex justify-content-center">
                {rowData.length > 0 &&
                    <PaginationCustom
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        totalData={totalData}
                        setPageSize={setPageSize}
                    />
                }
            </div>
        </Card.Body>
    )
}

DashboardCardBody.propTypes = {
    tableHeaders: PropTypes.array,
    rowData: PropTypes.array,
    rowRender: PropTypes.func,
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func,
    totalData: PropTypes.number,
    setPageSize: PropTypes.func,
    sortConfig: PropTypes.object,
    setSortConfig: PropTypes.func,
    setShow: PropTypes.func,
    setSelectedData: PropTypes.func,
    handleShowModalDetail: PropTypes.func,
    isHaveStatus: PropTypes.bool,
    isHavePriority: PropTypes.bool,
    isLoading: PropTypes.bool
}

export default DashboardCardBody