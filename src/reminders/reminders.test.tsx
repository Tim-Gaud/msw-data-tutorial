import { drop } from "@mswjs/data";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { db } from "../server/mockDb";
import { Reminders } from "./reminders";
import { Reminder } from "./types";

// write your tests here
describe("Reminders", () => {
  afterEach(() => {
    drop(db);
  });

  it("shows 'all done' if all reminders are completed", async () => {
    render(<Reminders />);

    expect(
      await screen.findByText("all done", { exact: false })
    ).toBeInTheDocument();
  });

  it("renders a list of pending reminders", async () => {
    const mockRemindersToCreate = 3;

    let mockReminders: Reminder[] = [];

    Array.from(Array(mockRemindersToCreate)).forEach(() => {
      mockReminders.push(db.reminder.create());
    });

    render(<Reminders />);

    expect(await screen.findAllByTestId("reminder")).toHaveLength(
      mockRemindersToCreate
    );

    mockReminders.forEach((reminder) => {
      expect(screen.getByText(reminder.text)).toBeInTheDocument();
    });
  });

  it("creates a new reminder", async () => {
    render(<Reminders />);

    const newReminder = {
      id: 11,
      text: "New reminder",
      completed: false,
    };

    userEvent.click(screen.getByTestId("add-reminder"));

    userEvent.type(screen.getByTestId("new-reminder-text"), newReminder.text);
    userEvent.click(screen.getByTestId("save-new-reminder"));

    expect(await screen.findByText(newReminder.text)).toBeInTheDocument();
  });

  it("deletes a reminder", async () => {
    const mockRemindersToCreate = 3;

    let mockReminders: Reminder[] = [];

    Array.from(Array(mockRemindersToCreate)).forEach(() => {
      mockReminders.push(db.reminder.create());
    });

    render(<Reminders />);

    expect(await screen.findAllByTestId("reminder")).toHaveLength(
      mockRemindersToCreate
    );

    userEvent.click(screen.getAllByTestId("delete-reminder")[0]);

    await waitFor(() =>
      expect(screen.queryByText(mockReminders[0].text)).not.toBeInTheDocument()
    );
  });
});
