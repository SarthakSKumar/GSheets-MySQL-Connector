import { config } from '@/config';

const Redis = require('ioredis');

const redisConfig = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

export const redisConnection = new Redis(redisConfig);
