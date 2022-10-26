import { Outlet } from "react-router-dom";

import { useIsLogged } from "context/logged";

function AdminRoutes() {
    return useIsLogged() ? <Outlet /> : <p>not allowed</p>;
}

export default AdminRoutes;