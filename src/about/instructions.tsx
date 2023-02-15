import React from "react";
import "./instructions.css";

export const Instructions: React.FC = () => (
    <div className="instructions">
        <div className="content-container">
            <div className="main-content">
                <div className="heading-container">
                    <h1 data-testid="active-list-title">About</h1>

                    <h4>1. Mock APIs</h4>
                    <p>
                        The reminders app is trying to connect to a backend that doesn't
                        exist.{" "}
                    </p>
                    <ul>
                        <li>
                            You'll need to mock GET, POST and DELETE routes in order for the
                            app to function properly
                        </li>
                        <li>
                            Create msw route handlers within `src/server/routeHandlers.ts`.
                            Note: exporting your route handlers from this file should be
                            sufficient, no other setup is required
                        </li>
                    </ul>

                    <h4>2. Mock Database</h4>
                    <p>
                        You may notice that your data is not persisted when switching
                        between this page and the reminders page
                    </p>
                    <ul>
                        <li>
                            Using @msw/data mock a database with a reminders data model in
                            `src/server/mockDb.ts`. Note: faker-js is installed in the project
                            for ease of data mocking
                        </li>
                        <li>
                            Update your api mocked route handlers to use your new database
                        </li>
                        <li>
                            If you have setup your mock database correctly, reminders you've
                            created should be persisted when you navigate back to the
                            "Reminders" tab
                        </li>
                        <li>Seed your database with some starting reminders, so your GET handler returns something when you refresh the page</li>
                    </ul>

                    <h4>3. Write tests</h4>
                    <ul>
                        <li>Within `src/reminders/reminders.test.tsx` write tests for the reminders app</li>
                        <li>Use your mocked route handlers and mocked database for these tests</li>
                        <li>You'll need to use a separate instance of your mocked database, one which does not have seeded data</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);
