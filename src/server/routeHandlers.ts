import { MockedRequest, rest, RestHandler } from "msw";
import { baseUrl } from "../reminders/constants";
import { db } from "./mockDb";
import {
  DeleteReminderResponse,
  CreateReminderResponse,
  GetRemindersResponse,
} from "./types";

// seeding the db with some data
if (process.env.NODE_ENV === "development") {
  Array.from(Array(3)).forEach(() => {
    db.reminder.create();
  });
}

export const getReminders = (): RestHandler<
  MockedRequest<GetRemindersResponse>
> =>
  rest.get(baseUrl, (_req, res, context) =>
    res(
      context.json({
        reminders: db.reminder.getAll(),
      })
    )
  );

export const createReminder = (): RestHandler<
  MockedRequest<CreateReminderResponse>
> =>
  rest.post(baseUrl, (req, res, context) => {
    const { text } = JSON.parse(req.body as string);

    const reminder = db.reminder.create({
      text,
    });

    return res(context.json({ reminder }));
  });

export const deleteReminder = (): RestHandler<
  MockedRequest<DeleteReminderResponse>
> =>
  rest.delete(`${baseUrl}/:id`, (req, res, context) => {
    db.reminder.delete({
      where: {
        id: {
          equals: req.params.id as string,
        },
      },
    });

    return res(context.json({}));
  });
