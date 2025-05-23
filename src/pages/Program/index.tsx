import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import lazyLoad from "~/router/lazyLoad";

const Index = lazy(() => import("./home"));
const Operators = lazy(() => import("./operators"));
const Observable = lazy(() => import("./observable"));
const Observer = lazy(() => import("./observer"));

console.log("router::program::");

const routes: RouteObject[] = [
    {
        path: "/",
        // element: <Layout />,
        children: [
            {
                index: true,
                element: lazyLoad(Index),
            },
            {
                path: "/",
                element: lazyLoad(Index),
            },
            {
                path: "/operators",
                element: lazyLoad(Operators),
            },
            {
                path: "/observable",
                element: lazyLoad(Observable),
            },
            {
                path: "/observer",
                element: lazyLoad(Observer),
            },
        ],
    },
];

const Program = () => {
    console.log("program::");
    const element = useRoutes(routes);

    return <>{element}</>;
};

export default Program;
