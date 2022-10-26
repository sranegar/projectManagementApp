import Body from "../components/Body.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/project-portal/projectPortal.js";

const AppRoutes = () => {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Body />}>
                <Route index element={<Main/>}/> 
            </Route>
    </Routes>
    </BrowserRouter>)
}

export default AppRoutes;
