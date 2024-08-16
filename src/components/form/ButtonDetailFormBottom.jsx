import { Button, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useMediaQuery } from "react-responsive";

const ButtonDetailFormBottom = ({ navigateEditPath, typeButton }) => {
  const navigate = useNavigate();
  const buttonPageStyle = typeButton !== undefined ? typeButton : '';
  const isMobileButton = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Stack direction={isMobileButton ? "vertical" : "horizontal"} gap={3} className="justify-content-end mt-3">
      <Button className={`button-cancel`} variant="">
        Close
      </Button>
      <Button className={`button-submit danger`} type='submit' variant=''>
        Delete Data
      </Button>
      <Button className={`button-submit edit`} type='submit' variant='' onClick={() => navigate(navigateEditPath)}>
        Edit Data
      </Button>
    </Stack>
  )
}

ButtonDetailFormBottom.propTypes = {
  isMobile: PropTypes.bool,
  navigateCancelPath: PropTypes.string,
  typeButton: PropTypes.string
}

export default ButtonDetailFormBottom