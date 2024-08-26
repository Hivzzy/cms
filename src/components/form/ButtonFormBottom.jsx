import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useMediaQuery } from "react-responsive";

const ButtonFormBottom = ({ navigateCancelPath, buttonType }) => {
  const navigate = useNavigate();
  const buttonPageStyle = buttonType !== undefined ? buttonType : '';
  const isMobileButton = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Stack direction={isMobileButton ? "vertical" : "horizontal"} gap={3} className="justify-content-end mt-3">
      <Button className={`button-cancel ${buttonPageStyle}`} variant="" onClick={() => navigate(navigateCancelPath)}>
        Cancel
      </Button>
      <Button className={`button-submit ${buttonPageStyle}`} type='submit' variant=''>{buttonType == 'edit' ? 'Edit' : 'Add'} data</Button>
    </Stack>
  );
}

ButtonFormBottom.propTypes = {
  isMobile : PropTypes.bool,
  navigateCancelPath : PropTypes.string,
  buttonType: PropTypes.string
}

export default ButtonFormBottom;
