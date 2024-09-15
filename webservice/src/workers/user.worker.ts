import { Queue, Worker } from 'bullmq'; // Import Queue from bullmq
import Logger from 'bunyan';
import { config } from '@/config';

const log: Logger = config.createLogger('userWorker');

export const userQueue = new Queue('userQueue', {
  connection: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
  },
});

class UserWorker {
  async addUserToDB(job: any): Promise<void> {
    try {
      const { data } = job.data;
      log.info('Adding user to DB with data:', data);
      // Your DB logic here...
    } catch (error) {
      log.error('Error in processing job:', error);
      throw error;
    }
  }
}

// Worker setup for processing jobs
export const userWorker = new Worker(
  'userQueue',
  async (job) => {
    const workerInstance = new UserWorker();
    await workerInstance.addUserToDB(job);
    log.info('Job completed successfully');
  },
  {
    connection: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      username: config.REDIS_USERNAME,
      password: config.REDIS_PASSWORD,
    },
  }
);
