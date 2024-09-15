import * as process from 'process';
import Logger from 'bunyan';
import { config } from '@/config';

const mysql = require('mysql2');

const log: Logger = config.createLogger('setupDB');

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default () => {
  pool.getConnection(
    (err: { message: any }, connection: { release: () => void }) => {
      if (err) {
        log.error('Error connecting to the database:', err.message);
        return process.exit(1);
      } else {
        log.info('Connected to the database!');
        connection.release();
      }
    }
  );
};

module.exports = pool;
