import dotenv from 'dotenv';
import bunyan from 'bunyan';
import * as process from 'process';

dotenv.config({});
class Config {
  public DB_HOST: string | undefined;
  public DB_USER: string | undefined;
  public DB_PASSWORD: string | undefined;
  public DB_NAME: string | undefined;
  public DB_PORT: string | undefined;
  public SERVER_PORT: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY: string | undefined;
  public REDIS_HOST: string | undefined;
  public REDIS_PORT: number | undefined;
  public REDIS_USERNAME: string | undefined;
  public REDIS_PASSWORD: string | undefined;
  public APPSCRIPT_URL: string | undefined

  constructor() {
    this.DB_HOST = process.env.DB_HOST;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_PORT = process.env.DB_PORT;
    
    this.SERVER_PORT = process.env.PORT || '5000';

    this.NODE_ENV = process.env.NODE_ENV;

    this.SECRET_KEY = process.env.SECRET_KEY;

    this.REDIS_HOST = process.env.REDIS_HOST;
    this.REDIS_PORT = process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : undefined;
    this.REDIS_USERNAME = process.env.REDIS_USERNAME;
    this.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
    this.APPSCRIPT_URL = process.env.APPSCRIPT_URL
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
