import { Application } from 'express';
import { DBCRUDRoutes } from '@/routes/dbcrud.routes';
import { serverAdapter } from '../setup/setupBullBoard';

const BASE_PATH = '/api/';

export default (app: Application) => {
  app.use('/queues', serverAdapter.getRouter());
  app.use(BASE_PATH, DBCRUDRoutes.routes());
};
