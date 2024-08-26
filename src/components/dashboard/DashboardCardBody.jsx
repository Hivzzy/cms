import { Card, Table } from 'react-bootstrap'
import PaginationCustom from '../form/PaginationCustom'
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import DashboardRowActionButton from './DashboardRowActionButton';
import { FaCheckCircle } from 'react-icons/fa';

const DashboardCardBody = ({ tableHeaders, rowData, rowRender, pageSize, pageNumber, setPageNumber, totalData, setPageSize, sortConfig, setSortConfig,
    setShow, setSelectedData, handleShowModalDetail
}) => {
    return (
        <Card.Body>
            <div className="table-responsive border-bottom my-3">
                <Table>
                    <TableHeader tableHeaders={tableHeaders} setSortConfig={setSortConfig} sortConfig={sortConfig} />
                    <tbody style={{ fontSize: '14px' }}>
                        {rowData.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                {rowRender(data)}
                                <td>{data?.status?.toLowerCase() === "active" ? <FaCheckCircle style={{ fontSize: '20px', color: '#23BD33' }} /> : <FaCheckCircle style={{ fontSize: '20px', color: '#E7E8EC' }} />}</td>
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
                {totalData > 0 ?
                    <PaginationCustom
                        pageSize={pageSize}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        totalData={totalData}
                        setPageSize={setPageSize}
                    />
                    :
                    <div className='fw-bold fs-2 mb-3'>
                        Data not found!
                    </div>
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
    handleShowModalDetail: PropTypes.func
}

export default DashboardCardBody