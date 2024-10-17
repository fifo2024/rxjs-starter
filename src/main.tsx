import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import './index.css'
import "~/styles/index.scss";

import useCounterStore from "~/stores/counter";

const Init = () => {
    // const counter = useCounterStore((state) => state.counter);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

Init();
