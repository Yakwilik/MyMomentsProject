import Header from "../header";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, routes} from "../../router/routes";
import React from "react";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.component/>}
                        action={route.component}
                    />
                )}
                {routes.map(route =>
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.component/>}
                    />
                )}
                <Route path={"*"} element={<Navigate to="/error" replace={true}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;