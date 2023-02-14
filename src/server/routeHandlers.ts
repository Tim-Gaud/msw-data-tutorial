import { MockedRequest, rest, RestHandler } from "msw";
import { baseUrl } from "../reminders/constants";
import { DeleteReminderResponse, CreateReminderResponse, GetRemindersResponse } from "./types";

// mock your api routes here

export const getReminders = (): RestHandler<MockedRequest<GetRemindersResponse>> =>
rest.get(baseUrl, (_req, _res, _context) => undefined)
