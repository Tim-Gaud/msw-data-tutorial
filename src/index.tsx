import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { mswWorker } from "./server";
import * as restHandlers from "./server/routeHandlers";

(async () => {
    const handlers = Object.values({ ...restHandlers });
    
    mswWorker.resetHandlers(...handlers.map((handler) => handler()));
    
    if (process.env.NODE_ENV === "development") {
        await mswWorker.start();
    }
})()

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
