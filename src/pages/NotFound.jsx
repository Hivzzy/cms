import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="position-absolute top-50 start-50 translate-middle fs-1 fw-bold text-center">
      Not Found
      <p className="fs-5 fw-normal text-decoration-underline pe-auto" style={{ cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      >Back to previous page</p>
    </div >
  )
}

export default NotFound