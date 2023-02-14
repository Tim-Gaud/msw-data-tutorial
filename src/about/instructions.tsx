import React from "react";
import './instructions.css'

export const Instructions: React.FC = () => (
    <div className="instructions">
        <div className="content-container">
            <div className="main-content">
                <div className="heading-container">
                    <h1
                        data-testid="active-list-title"
                    >
                        About
                    </h1>
                    <p>
                        If you have setup your mock database correctly, reminders you've created
                        should be persisted when you navigate back to the "Reminders" tab
                    </p>
                </div>
            </div>
        </div>
    </div>
);
