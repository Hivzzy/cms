import { Button, Card, Form, InputGroup, Stack } from "react-bootstrap"
import { FiPlusCircle } from "react-icons/fi"
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom"

import PropTypes from 'prop-types';

const DashboardCardHeader = ({ tittle, filterOptions, handleSubmit, selectedValue, setSelectedValue, searchValue, setSearchValue, statusValue, setStatusValue, selectedOtherFilterValue, renderOtherFIlterForm }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusValue(e.target.value);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchValue(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isHaveAnotherFilter = () => {
        if (Array.isArray(selectedOtherFilterValue)) {
            return selectedOtherFilterValue.includes(selectedValue);
        } else {
            return selectedValue === selectedOtherFilterValue;
        }
    }

    return (
        <Card.Header className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="header-title mb-3 mb-md-0">
                <h5 className="card-title" style={{ color: '#242845' }}>{tittle}</h5>
            </div>
            <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={4}>
                <Form className="d-flex flex-column flex-md-row align-items-center gap-4" onSubmit={handleSubmit}>
                    <Form.Select aria-label="Select filter" style={{ maxWidth: isMobile ? '100%' : '170px' }} value={selectedValue} onChange={handleSelectChange}>
                        <option value="">Filter</option>
                        {filterOptions.map((data, index) => (
                            <option value={data.value} key={index}>{data.name}</option>
                        ))}
                    </Form.Select>
                    {selectedValue == 'status' ?
                        <Form.Select aria-label="Select Statu" value={statusValue} name={selectedValue} onChange={handleStatusChange} style={{ minWidth: '170px' }}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Not Active">Not Active</option>
                        </Form.Select>
                        :
                        isHaveAnotherFilter() ?
                            renderOtherFIlterForm()
                            :
                            <InputGroup>
                                <svg className="position-absolute" style={{ top: '0.75rem', marginLeft: '1rem', zIndex: 50 }} width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <Form.Control type="search" placeholder="Search..." aria-label="Search filter" name={selectedValue} style={{ paddingLeft: '3rem' }}
                                    value={searchValue[selectedValue] || ''} onChange={handleSearchChange} disabled={!selectedValue}
                                />
                            </InputGroup>
                    }
                </Form>
                <Link to='./add'>
                    <Button style={{ background: '#E1F7E3', color: '#23BD33', border: '0px', borderRadius: '0.5rem', width: isMobile ? '100%' : '' }} className="px-2">
                        <FiPlusCircle size='20px' style={{ marginRight: '0.5rem' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>Add Data</span>
                    </Button>
                </Link>
            </Stack>
        </Card.Header>
    )
}

DashboardCardHeader.propTypes = {
    tittle: PropTypes.string,
    filterOptions: PropTypes.array,
    handleSubmit: PropTypes.func,
    selectedValue: PropTypes.string,
    setSelectedValue: PropTypes.func,
    searchValue: PropTypes.object,
    setSearchValue: PropTypes.func,
    statusValue: PropTypes.string,
    setStatusValue: PropTypes.func,
    selectedOtherFilterValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    renderOtherFIlterForm: PropTypes.func
}

export default DashboardCardHeader