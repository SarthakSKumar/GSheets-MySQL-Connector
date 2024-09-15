import { Queue, Worker } from 'bullmq';
import Logger from 'bunyan';
import { config } from '@/config';
import { redisConnection } from '@/setup/setupRedis';
import { SheetServices } from '@/services/sheets/sheets.service';

const log: Logger = config.createLogger('baseWorker');

export const baseQueue = new Queue('baseQueue', {
  connection: redisConnection,
});

export const worker = new Worker(
  'baseQueue',
  async (job) => {
    log.info('Processing job:', job);
    if (job.name === 'updateDBfromSheet') {
      const sheetServices = new SheetServices();
      await sheetServices.updateDB(job);
      log.info('UpdateJob completed successfully:', job.id);
    }
  },
  {
    connection: redisConnection,
  }
);
