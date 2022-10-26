import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminRoutes from "routes/AdminRoutes";

import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import AdministracaoPage from "pages/Administracao";
import AdicionarProdutoPage from "pages/AdicionarProduto";
import VizualizarProdutoPage from "pages/VisualizarProduto";
import ResultadosPage from "pages/Resultados";
import VerCategoriaPage from "pages/VerCategoria";
import EditarProdutoPage from "pages/EditarProduto";
import SingupPage from "pages/Singup";

class AppRoutes {
    static home = "/home";
    static login = "/login";
    static singup = "/singup";
    static administracao = "/administracao";
    static adicionarProduto = `${this.administracao}/adicionar-produto`;
    static visualizarProduto = "/produto";
    static resultados = "/search";
    static verCategoria = "/categoria";
    static editarProduto = `${this.administracao}/editar-produto`;
}
Object.freeze(AppRoutes);
Object.bind(AppRoutes, AppRoutes);

function RouteHandler() {
    const location = useLocation();

    useEffect(() => scrollTo(0, 0), [location]);

    return (
        <Routes>
            {/* normal routes */}
            <Route
                path="/"
                element={<Navigate to={AppRoutes.home} />} />

            <Route
                path={AppRoutes.home}
                element={<HomePage />} />
            <Route
                path={AppRoutes.login}
                element={<LoginPage />} />
            <Route
                path={AppRoutes.singup}
                element={<SingupPage />} />
            <Route
                path={AppRoutes.visualizarProduto + "/:id"}
                element={<VizualizarProdutoPage />} />
            <Route
                path={AppRoutes.resultados + "/:query"}
                element={<ResultadosPage />} />
            <Route
                path={AppRoutes.verCategoria + "/:categoria"}
                element={<VerCategoriaPage />} />

            {/* admin routes */}
            <Route
                path={AppRoutes.administracao}
                element={<AdminRoutes />}>
                <Route
                    index
                    element={<AdministracaoPage />} />
                <Route
                    path={AppRoutes.adicionarProduto}
                    element={<AdicionarProdutoPage />} />
                <Route
                    path={AppRoutes.editarProduto + "/:id"}
                    element={<EditarProdutoPage />} />
            </Route>

            {/* not found */}
            <Route path="*" element={<p>not found</p>}/>
        </Routes>
    );
}

export default RouteHandler;
export { AppRoutes };