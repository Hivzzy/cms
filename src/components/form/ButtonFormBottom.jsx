import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ButtonFormBottom = ({ isMobile, navigateCancelPath, typeButton, detailButton, editPath }) => {
  const navigate = useNavigate();
  const buttonPageStyle = typeButton !== undefined ? typeButton : '';

  console.log(buttonPageStyle);

  return (
    <Stack direction={isMobile ? "vertical" : "horizontal"} gap={3} className="justify-content-end mt-3">
      {detailButton ? (
        <>
          <Button className={`button-cancel ${buttonPageStyle}`} variant="" onClick={() => navigate(navigateCancelPath)}>
            Cancel
          </Button>
          <Button className={`button-submit ${buttonPageStyle}`} variant="" onClick={() => alert('Delete action')}>
            Delete
          </Button>
          <Button className={`button-edit ${buttonPageStyle}`} variant="" onClick={() => navigate(editPath)}>
            Edit data
          </Button>
        </>
      ) : (
        <>
          <Button className={`button-cancel ${buttonPageStyle}`} variant="" onClick={() => navigate(navigateCancelPath)}>
            Cancel
          </Button>
          <Button className={`button-submit ${buttonPageStyle}`} type='submit' variant=''>Add data</Button>
        </>)}
    </Stack>
  );
}

ButtonFormBottom.propTypes = {
  isMobile: PropTypes.bool,
  navigateCancelPath: PropTypes.string,
  typeButton: PropTypes.string,
  detailButton: PropTypes.bool,
  editPath: PropTypes.string.isRequired,
}

export default ButtonFormBottom;
