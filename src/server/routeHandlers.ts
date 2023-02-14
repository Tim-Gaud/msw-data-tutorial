import { DefaultBodyType, MockedRequest, rest, RestHandler } from 'msw';
import { baseUrl } from '../reminders/constants';

// mock your api routes here

export const getSingleCampaignHandler = (): RestHandler<MockedRequest<DefaultBodyType>> =>
    rest.get(`${baseUrl}`, (req, res, context) => {
        // return res(context.json(db.campaign.findFirst({ where: { referralExid: { equals: req.params.referralExid as string } } })));
        return res(context.status(200));
    });