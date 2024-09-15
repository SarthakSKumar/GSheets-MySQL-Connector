import { Application } from 'express';
import { DBCRUDRoutes } from '@/routes/db.routes';
import { SheetCRUDRoutes } from '@/routes/sheet.routes';
import { serverAdapter } from '@/setup/setupBullBoard';

const BASE_PATH = '/api/';

export default (app: Application) => {
  app.use('/queues', serverAdapter.getRouter());
  app.use(BASE_PATH, DBCRUDRoutes.routes());
  app.use(BASE_PATH, SheetCRUDRoutes.routes());
};
