import { IoTriangle } from 'react-icons/io5'
import PropTypes from 'prop-types';

const TableHeader = ({tableHeaders, sortConfig, setSortConfig}) => {
    const handleChangeSortBy = (sortBy) => {
        let direction = 'ASC';
        if (sortConfig.sortBy === sortBy && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }
        setSortConfig({ sortBy, direction });
    }

    return (
        <thead>
            <tr>
                {tableHeaders.map((header, index) => (
                    <th key={index} style={{ fontSize: '14px' }}>
                        <div className="position-relative" onClick={header.value ? () => handleChangeSortBy(header.value) : undefined} style={{cursor: header.value ? 'pointer' : ''}}>
                            {header.name}
                            {header.value &&
                                <>
                                    <span className="position-absolute" style={{
                                        fontSize: 12, bottom: 6.6, marginLeft: 10,
                                        color: sortConfig.sortBy == header.value && sortConfig.direction == 'ASC' ? '#989BB3' : '#DCDDE5'
                                    }}>
                                        <IoTriangle />
                                    </span>
                                    <span className="position-absolute" style={{
                                        fontSize: 12, top: 6.6, marginLeft: 10, transform: 'rotate(180deg)',
                                        color: sortConfig.sortBy == header.value && sortConfig.direction == 'DESC' ? '#989BB3' : '#DCDDE5'
                                    }}>
                                        <IoTriangle />
                                    </span>
                                </>
                            }
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    tableHeaders: PropTypes.array,
    setSortConfig: PropTypes.func,
    sortConfig: PropTypes.object
}

export default TableHeader