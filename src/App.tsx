import React from "react";
import "./App.css";
import { Reminders } from "./reminders/reminders";

function App() {
    const [isRemindersTabActive, setIsRemindersTabActive] = React.useState(true)
    return (
        <div className="App">
            <header className="max-w-md mx-auto">
                <nav className="mt-4 space-x-5">
                    <button className={isRemindersTabActive ? "activeTab" : ''} onClick={() => setIsRemindersTabActive(true)}>
                        Reminders
                    </button>
                    <button className={!isRemindersTabActive ? "activeTab" : ''} onClick={() => setIsRemindersTabActive(false)}>
                        About
                    </button>
                </nav>
            </header>
            {isRemindersTabActive ? <Reminders /> : null}
        </div>
    );
}

export default App;
