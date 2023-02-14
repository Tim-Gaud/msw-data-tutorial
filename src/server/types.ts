import { Reminder } from "../reminders/types";

export interface GetRemindersResponse {
    reminders: Reminder[]
}

export interface CreateReminderResponse {
    reminder: Reminder
}

export type DeleteReminderResponse = number; 