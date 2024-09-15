import { ExpressAdapter } from '@bull-board/express';
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');

import { userQueue } from 'app/src/workers/user.worker';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(userQueue)],
  serverAdapter: serverAdapter,
});
