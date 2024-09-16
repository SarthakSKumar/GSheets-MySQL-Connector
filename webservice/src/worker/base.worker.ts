import { Queue, Worker } from 'bullmq';
import Logger from 'bunyan';
import { config } from '@/config';
import { redisConnection } from '@/setup/setupRedis';
import { SheetServices } from '@/services/sheets.service';
import { DBServices } from '@/services/db.service';

const log: Logger = config.createLogger('baseWorker');

export const baseQueue = new Queue('baseQueue', {
  connection: redisConnection,
});

const sheetServices = new SheetServices();
const dbServices = new DBServices();

export const worker = new Worker(
  'baseQueue',
  async (job) => {
    try {
      switch (job.name) {
        case 'updateToDBFromSheet':
          await sheetServices.updateDB(job);
          log.info({ jobId: job.id }, 'Update DB Job completed');
          break;

        case 'addToSheetFromDB':
          await dbServices.addToSheet(job);
          log.info({ jobId: job.id }, 'Add to Sheet Job completed');
          break;

        case 'updateToSheetFromDB':
          await dbServices.updateToSheet(job);
          log.info({ jobId: job.id }, 'Update to Sheet Job completed');
          break;

        case 'deleteToSheetFromDB':
          await dbServices.deleteToSheet(job);
          log.info({ jobId: job.id }, 'Delete from Sheet Job completed');
          break;

        default:
          log.error({ jobId: job.id }, 'Failed to process job: Invalid Job');
      }
    } catch (error) {
      if (error instanceof Error) {
        log.error({ jobId: job.id }, 'Failed to process job: ', error.message);
      } else {
        log.error({ jobId: job.id }, 'Failed to process job: ', error);
      }
    }
  },
  {
    connection: redisConnection,
  }
);
