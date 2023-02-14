import React from "react";
import "./App.css";
import { Reminder } from "./reminders/reminders";
import { mswServer } from "./server";
import * as restHandlers from "./server/routeHandlers";

function App() {
    const handlers = Object.values({ ...restHandlers });

    React.useEffect(
        () => mswServer.resetHandlers(...handlers.map(handler => handler())),
        [handlers]
    );
    return (
        <div className="App">
            <Reminder />
        </div>
    );
}

export default App;
