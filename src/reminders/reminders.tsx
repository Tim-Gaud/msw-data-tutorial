import React from "react";
// import { Link } from "./UI";
// import { useParams, useLocation, useHistory } from "react-router-dom";
// import { useQueryParam } from "use-query-params";
// import { BooleanParam } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import "./reminders.css";
import { baseUrl } from "./constants";

export const Reminder: React.FC = () => {
    let [reminders, setReminders] = React.useState<any[]>([]);
    //   let [lists, setLists] = React.useState();
    let [error, setError] = React.useState<string>();
    let [isAddingReminder, setIsAddingReminder] = React.useState<boolean>();
    let [isSavingReminder, setIsSavingReminder] = React.useState<boolean>();
    //   let [isAddingList, setIsAddingList] = React.useState<boolean>();
    //   let [isSavingList, setIsSavingList] = React.useState<boolean>();
    let [newReminderText, setNewReminderText] = React.useState("");
    //   let [newListName, setNewListName] = React.useState("");
    //   let [sidebarIsOpen, setSidebarIsOpen] = useQueryParam("open", BooleanParam);

    //   let activeList = listId && lists?.find((list) => list.id === listId);

    const fetchThings = React.useCallback(async () => {
        let isCurrent = true;
        setReminders([]);
        try {
            
            const res = await fetch(baseUrl);
            const json = await res.json();
            if (isCurrent) {
                setReminders(json.reminders);
            }
        } catch (e) {
            if (isCurrent) {
                setError("We couldn't load your reminders. Try again soon.");
                console.error(e);
            }
        }
        return () => {
            isCurrent = false;
        };
    }, []);

    React.useEffect(() => {
        // let isCurrent = true;
        // setReminders([]);
        // // let url = listId ? `/api/lists/${listId}/reminders` : `/api/reminders`;
        // let url = `/api/reminders`;

        // try {
        //     const res = await fetch(url)
        //       .then((res) => res.json())
        //       .then((json) => {
        //         if (isCurrent) {
        //           setReminders(json.reminders);
        //         }
        //       })
        // }
        //   .catch((e) => {
        //     if (isCurrent) {
        //       setError("We couldn't load your reminders. Try again soon.");
        //       console.error(e);
        //     }
        //   });

        // return () => {
        //   isCurrent = false;
        fetchThings();
    }, [fetchThings]);

    //   React.useEffect(() => {
    //     let isCurrent = true;

    //     if (sidebarIsOpen) {
    //       fetch(`/api/lists`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //           if (isCurrent) {
    //             setLists(json.lists);
    //           }
    //         })
    //         .catch((e) => {
    //           console.error(e);
    //         });
    //     }

    //     return () => {
    //       isCurrent = false;
    //     };
    //   }, [sidebarIsOpen]);

    function createReminder(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!newReminderText) {
            return;
        }

        setIsSavingReminder(true);

        fetch("/api/reminders", {
            method: "POST",
            body: JSON.stringify({
                text: newReminderText,
                // ...(listId && { listId }),
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setNewReminderText("");
                setReminders((reminders) => [...reminders, json.reminder]);
                setIsAddingReminder(false);
            })
            .catch((e) => {
                setError("Your Reminder wasn't saved. Try again.");
                console.error(e);
            })
            .finally(() => {
                setIsSavingReminder(false);
            });
    }

    //   function createList(e: React.ChangeEvent<HTMLElement>) {
    //     e.preventDefault();

    //     if (!newListName) {
    //       return;
    //     }

    //     setIsSavingList(true);

    //     fetch("/api/lists", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         name: newListName,
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         setNewListName("");
    //         // setLists((lists) => [...lists, json.list]);
    //         setIsAddingList(false);
    //         // history.push(`/${json.list.id}${location.search}`);
    //       })
    //       .catch(() => {
    //         setError("Your List wasn't saved. Try again.");
    //       })
    //       .finally(() => {
    //         setIsSavingList(false);
    //       });
    //   }

    function deleteReminder(id: string | number) {
        fetch(`/api/reminders/${id}`, { method: "DELETE" });
        setReminders((reminders) =>
            reminders.filter((reminder) => reminder.id !== id)
        );
    }

    //   function deleteList() {
    //     fetch(`/api/lists/${listId}`, { method: "DELETE" });
    //     setLists((lists) => lists?.filter((list) => list.id !== listId));
    //     history.push(`/${location.search}`);
    //   }

    let hasRenderedRemindersRef = React.useRef(false);
    React.useEffect(() => {
        if (reminders) {
            hasRenderedRemindersRef.current = true;
        } else {
            hasRenderedRemindersRef.current = false;
        }
    }, [reminders]);

    return (
        <div
            className="flex justify-center"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <div
                className="flex mx-auto overflow-hidden rounded-md shadow-lg"
                style={{ display: "flex", margin: "40px auto", width: "400px" }}
            >
                {/* <AnimatePresence initial={false}>
          {sidebarIsOpen && (
            <motion.div
              animate={{ width: 192 }}
              initial={{ width: 0 }}
              exit={{ width: 0 }}
              className="flex flex-col bg-cool-gray-800"
            >
              <div className="flex flex-col flex-1 w-48 pt-12 pb-4 bg-cool-gray-800">
                <div className="flex-1">
                  <div>
                    <Link
                      className="flex items-center justify-between px-6 py-2 text-sm font-medium"
                      activeClassName="bg-cool-gray-700 text-white"
                      inactiveClassName="text-cool-gray-400 hover:text-white"
                      to={`/${location.search}`}
                      exact
                    >
                      <span>All</span>
                    </Link>

                    {lists?.map((list) => (
                      <Link
                        key={list.id}
                        className="flex items-center justify-between px-6 py-2 text-sm font-medium"
                        activeClassName="bg-cool-gray-700 text-white"
                        inactiveClassName="text-cool-gray-400 hover:text-white"
                        to={`/${list.id}${location.search}`}
                      >
                        <span>{list.name}</span>
                      </Link>
                    ))}
                  </div>

                  {isAddingList && (
                    <form
                      onSubmit={createList}
                      className={`${
                        isSavingList ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <div className="relative">
                        <input
                          autoFocus
                          value={newListName}
                          onChange={(e) => setNewListName(e.target.value)}
                          className="block w-full py-2 pl-6 text-sm font-medium text-white border-transparent rounded-none pr-9 focus:shadow-none form-input bg-cool-gray-700"
                          type="text"
                          placeholder="New list..."
                          data-testid="new-list-text"
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-cool-gray-400 hover:text-cool-gray-200"
                          data-testid="save-new-list"
                        >
                          <svg
                            className="w-4 h-4"
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
                    </form>
                  )}
                </div>
                <div className="mt-10">
                  <button
                    onClick={() => setIsAddingList(!isAddingList)}
                    className="flex items-center mx-6 text-xs text-cool-gray-400 hover:text-white"
                    data-testid="add-list"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    Add list
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}

                {/* <div className="flex flex-1 bg-white w-md">
          <div className="flex items-center w-12 group">
            <button
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              className="hidden w-2 h-10 ml-2 rounded-full bg-cool-gray-200 hover:bg-cool-gray-300 group-hover:block"
              data-testid="toggle-sidebar"
            ></button>
          </div> */}

                <div
                    className="flex-1 pt-12 pb-12 pr-12"
                    style={{
                        flex: "1 1 0%",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        padding: "48px",
                    }}
                >
                    <div
                        className="flex items-center justify-between mb-10"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <h1
                            className="flex items-center justify-between text-3xl font-bold leading-none"
                            data-testid="active-list-title"
                        >
                            {/* {activeList?.name || "Reminders"} */}
                            Reminders
                        </h1>

                        <button
                            data-testid="add-reminder"
                            onClick={() => setIsAddingReminder(!isAddingReminder)}
                            className="add-button p-2 border border-transparent rounded hover:border-cool-gray-300 text-cool-gray-600"
                            style={{
                                // width: "34px",
                                // padding: "8px",
                                // borderWidth: "1px",
                                // backgroundColor: "transparent",
                                // borderRadius: "4px",
                                // borderColor: "transparent",
                                // cursor: "pointer",
                            }}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                                className="fixed bottom-0 right-0 mb-8 mr-8 bg-white border-b-4 border-red-500 rounded-md shadow-xl"
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
                                    className="flex p-4 pr-5 rounded-md"
                                    style={{
                                        padding: "16px",
                                        display: "flex",
                                        maxHeight: "60px",
                                    }}
                                >
                                    <div
                                        className="flex-shrink-0"
                                        style={{ width: "25px", color: "#f05252" }}
                                    >
                                        <svg
                                            className="w-5 h-5 mr-1 text-red-500"
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
                                    <div className="ml-3" style={{ marginLeft: 12 }}>
                                        <h3
                                            className="font-medium leading-5 text-red-600 text"
                                            style={{ color: "#e02424", margin: 0 }}
                                        >
                                            Network error
                                        </h3>
                                        <div className="mt-2 text-sm leading-5">
                                            <p>{error}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {reminders?.length > 0 ? (
                            <div>
                                <ul className="divide-y divide-cool-gray-100">
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
                                                    hasRenderedRemindersRef.current ? "visible" : "hidden"
                                                }
                                                animate="visible"
                                                exit="removed"
                                                custom={i}
                                                className="flex items-center justify-between py-2 group"
                                                key={reminder.id}
                                                data-testid="reminder"
                                            >
                                                {/* <div>
                            {reminder.text}
                            {!listId && reminder.list && (
                              <span
                                className="px-2 py-1 ml-3 text-xs font-medium rounded bg-cool-gray-100 text-cool-gray-600"
                                data-testid="list-tag"
                              >
                                {reminder.list.name}
                              </span>
                            )}
                          </div> */}
                                                <button
                                                    className="flex items-center invisible px-2 py-1 opacity-50 hover:opacity-100 group-hover:visible"
                                                    onClick={() => deleteReminder(reminder.id)}
                                                    data-testid="delete-reminder"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                            fillRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    ️
                                                </button>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            </div>
                        ) : reminders ? (
                            <p
                                className="pt-3 pb-3 font-medium text-cool-gray-400"
                                style={{ color: "#97a6ba" }}
                            >
                                All done!
                            </p>
                        ) : !error ? (
                            <p
                                className="pt-3 pb-3 font-medium text-cool-gray-400"
                                style={{ color: "#97a6ba" }}
                            >
                                Loading...
                            </p>
                        ) : null}

                        {isAddingReminder && (
                            <form
                                onSubmit={createReminder}
                                className={`-mx-3 ${isSavingReminder ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                <div>
                                    <div
                                        className="relative py-1"
                                        style={{ position: "relative" }}
                                    >
                                        <input
                                            id="email"
                                            autoFocus
                                            className="block w-full py-2 transition duration-150 ease-in-out border-2 border-transparent focus form-input focus:shadow-none focus:border-blue-300 sm:leading-5"
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
                                        <div className="absolute inset-y-0 right-0 flex py-1" style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                        }}>
                                            <button
                                                type="submit"
                                                data-testid="save-new-reminder"
                                                className="submit-button items-center px-4 text-sm text-cool-gray-700 hover:text-cool-gray-400"
                                            >
                                                <svg
                                                    className="w-4 h-4"
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
        // </div>
    );
};
