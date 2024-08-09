import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";
import { Col, Row } from "react-bootstrap";
// /src/store/setting/selectors
import logoFull from '../assets/images/figma/logo.png';
import logoCrop from '../assets/images/figma/logo-crop.png';
import { useState } from "react";

const DashboardLayout = () => {
    const [logo, setLogo] = useState(logoFull);
    return (
        <>
            <SidebarLayout logo={logo} setLogo={setLogo} logoFull={logoFull} logoCrop={logoCrop} />
            <main className="main-content">
                <div className="position-relative">
                    <HeaderLayout logo={logo} setLogo={setLogo} logoFull={logoFull} logoCrop={logoCrop} />
                </div>
                <div className="py-3 px-4 conatiner-fluid content-inner mt-2">
                    <Row>
                        <Col lg='12'>
                            <Outlet />
                        </Col>
                    </Row>
                </div>
                {/* <Footer /> */}
            </main>

        </>
    )
}

export default DashboardLayout;