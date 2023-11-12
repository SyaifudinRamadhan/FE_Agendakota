import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
        </Routes>
    )
}

export default PageRouter;