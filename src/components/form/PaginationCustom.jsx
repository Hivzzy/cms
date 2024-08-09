import { Pagination } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

const PaginationCustom = ({ pageSize, pageNumber, setPageNumber, totalData }) => {
    const totalPage = Math.ceil(totalData / pageSize);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isSmallScreen = useMediaQuery({ query: '(max-width: 375px)' });

    const handleChangePage = (number) => {
        setPageNumber(number)
    }

    const handleNextPage = () => {
        setPageNumber(prev => prev + 1)
    }

    const handlePreviousPage = () => {
        setPageNumber(prev => prev - 1)
    }

    const renderPaginationItems = () => {
        const items = [];
        const isNearStart = isMobile ? pageNumber <= 2 : pageNumber <= 4;
        const isNearEnd = isMobile ? pageNumber >= totalPage - 1 : pageNumber >= totalPage - 3;
        const isInMiddle = !isNearStart && !isNearEnd;

        const mddlePaginationValue = isMobile ? 0 : 1;
        const maxFirstPage = isMobile ? 3 : 5;
        const leftElippsisInMiddle = isMobile ? 2 : 4;
        const ellipsisNearOne = isMobile ? 3 : 5;
        const rightElippsisInMiddle = isMobile ? 1 : 3;
        const maxLastPage = isMobile ? 2 : 4;

        // Halaman no 1
        items.push(
            <Pagination.Item key={1} active={1 === pageNumber} onClick={() => handleChangePage(1)}>
                1
            </Pagination.Item>
        );

        // Ellipsis near one if reach last page
        if (pageNumber >= ellipsisNearOne && !isInMiddle) {
            items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }

        // Left ellipsis after reach middle pagination
        if (isInMiddle && pageNumber > leftElippsisInMiddle) {
            items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }

        // Shown when reach middle pagination
        if (isInMiddle) {
            for (let number = pageNumber - mddlePaginationValue; number <= pageNumber + mddlePaginationValue; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === pageNumber} onClick={() => handleChangePage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }

        // Page after page 1 before the ellipsis
        if (isNearStart) {
            for (let number = 2; number <= Math.min(maxFirstPage, totalPage - 1); number++) {
                items.push(
                    <Pagination.Item key={number} active={number === pageNumber} onClick={() => handleChangePage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }

        // Right ellipsis after reach middle pagination
        if (isInMiddle && pageNumber < totalPage - rightElippsisInMiddle) {
            items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }

        // Last page shown after reach last page
        if (isNearEnd) {
            for (let number = Math.max(totalPage - maxLastPage, 2); number <= totalPage; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === pageNumber} onClick={() => handleChangePage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }

        // Elipsis sebelah kiri jika berada di 4 halaman terakhir
        if (pageNumber <= 4 && !isInMiddle) {
            items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }

        // Halaman terakhir yang selalu muncul
        if (!isNearEnd && totalPage > 1) {
            items.push(
                <Pagination.Item key={totalPage} active={totalPage === pageNumber} onClick={() => handleChangePage(totalPage)}>
                    {totalPage}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        // <Pagination>
        <Pagination size={isSmallScreen ? 'sm' : ''}>
            <Pagination.First onClick={handlePreviousPage} disabled={pageNumber == 1} />
            {renderPaginationItems()}
            <Pagination.Last onClick={handleNextPage} disabled={pageNumber === totalPage} />
        </Pagination>
    )
}

PaginationCustom.propTypes = {
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func,
    totalData: PropTypes.number
}

export default PaginationCustom