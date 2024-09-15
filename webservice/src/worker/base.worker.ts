import { Queue, Worker } from 'bullmq';
import Logger from 'bunyan';
import { config } from '@/config';
import { redisConnection } from '@/setup/setupRedis';
import { SheetServices } from '@/services/sheets.service';

const log: Logger = config.createLogger('baseWorker');

export const baseQueue = new Queue('baseQueue', {
  connection: redisConnection,
});

export const worker = new Worker(
  'baseQueue',
  async (job) => {
    try {
      if (job.name === 'updateDBfromSheet') {
        const sheetServices = new SheetServices();
        await sheetServices.updateDB(job);
        log.info('ID:', job.id, 'Update DB Job completed');
      }
    } catch (error) {
      if (error instanceof Error) {
        log.error('ID:', job.id, 'Failed to process job: ', error.message);
      } else {
        log.error('ID:', job.id, 'Failed to process job: ', error);
      }
    }
  },
  {
    connection: redisConnection,
  }
);
