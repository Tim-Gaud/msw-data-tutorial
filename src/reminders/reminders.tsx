import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./reminders.css";
import { baseUrl } from "./constants";
import { Reminder } from "./types";

export const Reminders: React.FC = () => {
    const [reminders, setReminders] = React.useState<Reminder[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>();
    const [error, setError] = React.useState<string>();
    const [isAddingReminder, setIsAddingReminder] = React.useState<boolean>();
    const [newReminderText, setNewReminderText] = React.useState("");

    const fetchThings = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(baseUrl);
            const json = await res.json();

            setReminders(json.reminders ?? []);
        } catch (e) {
            setError("We couldn't load your reminders. Try again soon.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchThings();
    }, [fetchThings]);

    const createReminder = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newReminderText) {
            return;
        }

        try {
            const res = await fetch("/api/reminders", {
                method: "POST",
                body: JSON.stringify({
                    text: newReminderText,
                }),
            });

            const json = await res.json();
            setNewReminderText("");
            setReminders((reminders) => [...reminders, json.reminder]);
            setIsAddingReminder(false);
        } catch (e) {
            setError("Your Reminder wasn't saved. Try again.");
            console.error(e);
        }
    };

    const deleteReminder = (id: Reminder['id']) => {
        fetch(`/api/reminders/${id}`, { method: "DELETE" });
        setReminders((reminders) =>
            reminders.filter((reminder) => reminder.id !== id)
        );
    }

    const hasRenderedRemindersRef = React.useRef(false);
    React.useEffect(() => {
        if (reminders) {
            hasRenderedRemindersRef.current = true;
        } else {
            hasRenderedRemindersRef.current = false;
        }
    }, [reminders]);

    return (
        <div>
            <div className="content-container">
                <div className="main-content">
                    <div className="heading-container">
                        <h1
                            data-testid="active-list-title"
                        >
                            Reminders
                        </h1>

                        <button
                            data-testid="add-reminder"
                            onClick={() => setIsAddingReminder(!isAddingReminder)}
                            className="add-button"
                        >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div style={{ textAlign: "start" }}>
                        {error && (
                            <div
                            className="bg-white"
                                style={{
                                    position: "fixed",
                                    bottom: 0,
                                    right: 0,
                                    margin: "0 32px 32px 0",
                                    borderRadius: "4px",
                                    borderBottom: "4px solid #f05252",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "16px",
                                        display: "flex",
                                        maxHeight: "60px",
                                    }}
                                >
                                    <div
                                        style={{ width: "25px", color: "#f05252" }}
                                    >
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div style={{ marginLeft: 12 }}>
                                        <h3
                                            style={{ color: "#e02424", margin: 0 }}
                                        >
                                            Network error
                                        </h3>
                                        <div>
                                            <p>{error}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {reminders?.length ? (
                            <div>
                                <ul className="reminder-container">
                                    <AnimatePresence>
                                        {reminders.map((reminder, i) => (
                                            <motion.li
                                                variants={{
                                                    hidden: (i: number) => ({
                                                        opacity: 0,
                                                        y: -50 * i,
                                                    }),
                                                    visible: (i: number) => ({
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            delay: i * 0.025,
                                                        },
                                                    }),
                                                    removed: {
                                                        opacity: 0,
                                                    },
                                                }}
                                                initial={
                                                    hasRenderedRemindersRef.current
                                                        ? "visible"
                                                        : "hidden"
                                                }
                                                animate="visible"
                                                exit="removed"
                                                custom={i}
                                                className="reminder"
                                                key={reminder.id}
                                                data-testid="reminder"
                                            >
                                                <div>
                                                    {reminder.text}
                                                </div>
                                                <button
                                                    onClick={() => deleteReminder(reminder.id)}
                                                    data-testid="delete-reminder"
                                                >
                                                    <svg
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                            fillRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            </div>
                        ) : (
                            <p
                                style={{ color: "#97a6ba" }}
                            >
                                All done!
                            </p>
                        )}

                        {!error && isLoading && (
                            <p
                                style={{ color: "#97a6ba" }}
                            >
                                Loading...
                            </p>
                        )}

                        {isAddingReminder && (
                            <form
                                onSubmit={createReminder}
                            >
                                <div>
                                    <div
                                        style={{ position: "relative" }}
                                    >
                                        <input
                                            id="email"
                                            autoFocus
                                            placeholder="New reminder..."
                                            data-testid="new-reminder-text"
                                            value={newReminderText}
                                            onChange={(e) => setNewReminderText(e.target.value)}
                                            style={{
                                                border: "2px solid #a4cafe",
                                                outline: "none",
                                                width: "100%",
                                                padding: "8px",
                                                borderRadius: "5px",
                                                fontSize: "15px",
                                                lineHeight: 1.5,
                                                margin: "0 -12px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                display: "flex",
                                                paddingTop: "5px",
                                                paddingBottom: "5px",
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                data-testid="save-new-reminder"
                                                className="submit-button"
                                            >
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
