import express, { Express } from 'express';
import { MyServer } from '@/setup/setupServer';
import { config } from '@/config';

class Application {
  public start(): void {
    this.loadConfig();
    const app: Express = express();
    const server: MyServer = new MyServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.start();
