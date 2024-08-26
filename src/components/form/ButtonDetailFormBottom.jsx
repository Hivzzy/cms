import { Button, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useMediaQuery } from "react-responsive";

const ButtonDetailFormBottom = ({ setShowDetail, navigateEditPath, handleShow }) => {
  const navigate = useNavigate();
  const isMobileButton = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Stack direction={isMobileButton ? "vertical" : "horizontal"} gap={3} className="justify-content-end mt-3">
      <Button className={`button-cancel`} variant="" onClick={() => setShowDetail(false)}>
        Close
      </Button>
      <Button className={`button-submit danger`} type='submit' variant='' onClick={handleShow}>
        Delete Data
      </Button>
      <Button className={`button-submit edit`} type='submit' variant='' onClick={() => navigate(navigateEditPath)}>
        Edit Data
      </Button>
    </Stack>
  )
}

ButtonDetailFormBottom.propTypes = {
  setShowDetail: PropTypes.func,
  navigateEditPath: PropTypes.string,
  handleShow: PropTypes.func
}

export default ButtonDetailFormBottom