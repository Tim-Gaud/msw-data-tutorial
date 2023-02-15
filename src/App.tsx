import React from "react";
import { Instructions } from "./about/instructions";
import "./App.css";
import { Reminders } from "./reminders/reminders";

const App: React.FC = () => {
    const [isRemindersTabActive, setIsRemindersTabActive] = React.useState(false)
    return (
        <div className="App">
            <header>
                <nav>
                    <button className={!isRemindersTabActive ? "activeTab" : ''} onClick={() => setIsRemindersTabActive(false)}>
                        Instructions
                    </button>
                    <button className={isRemindersTabActive ? "activeTab" : ''} onClick={() => setIsRemindersTabActive(true)}>
                        Reminders
                    </button>
                </nav>
            </header>
            {isRemindersTabActive ? <Reminders /> : <Instructions />}
        </div>
    );
}

export default App;
