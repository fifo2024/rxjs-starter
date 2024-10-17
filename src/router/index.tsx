// router/index.tsx
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Layout from "~/components/Layout";
// import About from "~/pages/About";
import lazyLoad from "./lazyLoad";

const Home = lazy(() => import("~/pages/Home"));
const Page404 = lazy(() => import("~/pages/404"));
const Example = lazy(() => import("~/pages/Example"));
const Program = lazy(() => import("~/pages/Program"));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            {
                path: "home",
                element: lazyLoad(Home),
            },
            {
                path: "example/*",
                element: lazyLoad(Example),
            },
            {
                path: "program/*",
                element: lazyLoad(Program),
            },
            {
                path: "*",
                element: lazyLoad(Page404),
            },
        ],
    },
];

export default createBrowserRouter(routes, {
    basename: "/",
});
