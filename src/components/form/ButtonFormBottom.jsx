import { Button, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

const ButtonFormBottom = ({ isMobile, navigateCancelPath, typeButton }) => {
  const navigate = useNavigate();
  const buttonPageStyle = typeButton !== undefined ? typeButton : '';
  
  return (
    <Stack direction={isMobile ? "vertical" : "horizontal"} gap={3} className="justify-content-end mt-3">
      <Button className={`button-cancel ${buttonPageStyle}`} variant="" onClick={() => navigate(navigateCancelPath)}>
        Cancel
      </Button>
      <Button className={`button-submit ${buttonPageStyle}`} type='submit' variant=''>Add data</Button>
    </Stack>
  )
}

ButtonFormBottom.propTypes = {
  isMobile : PropTypes.bool,
  navigateCancelPath : PropTypes.string,
  typeButton: PropTypes.string
}

export default ButtonFormBottom