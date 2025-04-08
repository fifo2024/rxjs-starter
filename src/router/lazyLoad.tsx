import { Suspense } from "react";

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
    console.log("lazyload", Component);
    return (
        <Suspense>
            <Component />
        </Suspense>
    );
};

export default lazyLoad;
