import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import lazyLoad from "~/router/lazyLoad";

const Index = lazy(() => import("./ExampleIndex"));
const Drag = lazy(() => import("./Drag"));
const Counter = lazy(() => import("./Counter"));
const Slider = lazy(() => import("./Slider"));
const YoutubeVideo = lazy(() => import("./YoutubeVideo"));
const LongClick = lazy(() => import("./LongClick"));
const Drag2 = lazy(() => import("./Drag2"));
const VideoDrag = lazy(() => import("./VideoDrag"));

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
                path: "drag",
                element: lazyLoad(Drag),
            },
            {
                path: "counter",
                element: lazyLoad(Counter),
            },
            {
                path: "slider",
                element: lazyLoad(Slider),
            },
            {
                path: "youtube",
                element: lazyLoad(YoutubeVideo),
            },
            {
                path: "longclick",
                element: lazyLoad(LongClick),
            },
            {
                path: "drag2",
                element: lazyLoad(Drag2),
            },
            {
                path: "video-drag",
                element: lazyLoad(VideoDrag),
            },
        ],
    },
];

export default function RxJS() {
    const element = useRoutes(routes);

    return <>{element}</>;
}
