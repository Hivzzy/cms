import { Pagination } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

const PaginationCustom = ({ pageSize, pageNumber, setPageNumber, totalData, setPageSize }) => {
    const totalPage = Math.ceil(totalData / pageSize);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isSmallScreen = useMediaQuery({ query: '(max-width: 375px)' });

    const handleChangePage = (number) => {
        setPageNumber(number - 1)
    }

    const handleNextPage = () => {
        setPageNumber(prev => prev + 1)
        // console.log('change page', number);
    }

    const handlePreviousPage = () => {
        setPageNumber(prev => prev - 1)
    }

    const numberPage = pageNumber + 1;

    const renderPaginationItems = () => {
        const items = [];
        const isNearStart = isMobile ? numberPage <= 2 : numberPage <= 4;
        const isNearEnd = isMobile ? numberPage >= totalPage - 1 : numberPage >= totalPage - 3;
        const isInMiddle = !isNearStart && !isNearEnd;

        const mddlePaginationValue = isMobile ? 0 : 1;
        const maxFirstPage = isMobile ? 3 : 5;
        const leftElippsisInMiddle = isMobile ? 2 : 4;
        const ellipsisNearOne = isMobile ? 3 : 5;
        const rightElippsisInMiddle = isMobile ? 1 : 3;
        const maxLastPage = isMobile ? 2 : 4;
        const isMoreThanNormalPage = totalPage > (isMobile ? 5 : 7);

        // Halaman no 1
        items.push(
            <Pagination.Item key={1} active={1 === numberPage} onClick={() => handleChangePage(1)}>
                1
            </Pagination.Item>
        );

        if (!isMoreThanNormalPage) {
            // Halaman lainnya
            for (let number = 2; number <= Math.min(7, totalPage - 1); number++) {
                items.push(
                    <Pagination.Item key={number} active={number === numberPage} onClick={() => handleChangePage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }

            // Halaman terakhir
            if (totalPage > 1) {
                items.push(
                    <Pagination.Item key={totalPage} active={totalPage === numberPage} onClick={() => handleChangePage(totalPage)}>
                        {totalPage}
                    </Pagination.Item>
                );
            }

        } else {
            // Ellipsis near one if reach last page
            if (numberPage >= ellipsisNearOne && !isInMiddle) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }

            // Left ellipsis after reach middle pagination
            if (isInMiddle && numberPage > leftElippsisInMiddle) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }

            // Shown when reach middle pagination
            if (isInMiddle) {
                for (let number = numberPage - mddlePaginationValue; number <= numberPage + mddlePaginationValue; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === numberPage} onClick={() => handleChangePage(number)}>
                            {number}
                        </Pagination.Item>
                    );
                }
            }

            // Page after page 1 before the ellipsis
            if (isNearStart) {
                for (let number = 2; number <= Math.min(maxFirstPage, totalPage - 1); number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === numberPage} onClick={() => handleChangePage(number)}>
                            {number}
                        </Pagination.Item>
                    );
                }
            }

            // Right ellipsis after reach middle pagination
            if (isInMiddle && numberPage < totalPage - rightElippsisInMiddle) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }

            // Last page shown after reach last page
            if (isNearEnd) {
                for (let number = Math.max(totalPage - maxLastPage, 2); number <= totalPage; number++) {
                    items.push(
                        <Pagination.Item key={number} active={number === numberPage} onClick={() => handleChangePage(number)}>
                            {number}
                        </Pagination.Item>
                    );
                }
            }

            // Elipsis sebelah kiri jika berada di 4 halaman terakhir
            if (numberPage <= 4 && !isInMiddle) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }

            // Halaman terakhir yang selalu muncul
            if (!isNearEnd && totalPage > 1) {
                items.push(
                    <Pagination.Item key={totalPage} active={totalPage === numberPage} onClick={() => handleChangePage(totalPage)}>
                        {totalPage}
                    </Pagination.Item>
                );
            }
        }

        return items;
    };

    const handleChangeSelect = (e) => {
        setPageSize(e.target.value)
    }

    return (
        <>
            {/* <Pagination> */}
            <Pagination size={isSmallScreen ? 'sm' : ''}>
                <Pagination.First onClick={handlePreviousPage} disabled={numberPage == 1} />
                {renderPaginationItems()}
                <Pagination.Last onClick={handleNextPage} disabled={numberPage === totalPage} />
            </Pagination>
            <div className={`ms-3`}>
                <select className="form-select form-select-sm" aria-label="Default select example" onChange={handleChangeSelect}>
                    <option value='10'>10/page</option>
                    <option value='20'>20/page</option>
                    <option value='30'>30/page</option>
                </select>
            </div>
        </>
    )
}

PaginationCustom.propTypes = {
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func,
    totalData: PropTypes.number,
    setPageSize: PropTypes.func
}

export default PaginationCustom