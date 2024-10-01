import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IDBCreate, IDBUpdate } from '@/types';
import { DBAPIServices } from '@/services/dbapi.service';
import Logger from 'bunyan';
import { config } from '@/config';
import { baseQueue } from '@/worker/base.worker';

const log: Logger = config.createLogger('DBCRUDController');

//These are the APIS to simulate the CRUD operations on the database

const dbServices = new DBAPIServices();
export class DBCRUDController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data: IDBCreate = req.body;
      await dbServices.DBAPICreate(data);

      await baseQueue.add('addToSheetFromDB', data);

      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: 'Data inserted successfully' });
    } catch (err: any) {
      log.error('Failed to add data:', err.message);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to add data', error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const data: IDBUpdate = req.body;
      await dbServices.DBAPIUpdate(data);

      await baseQueue.add('updateToSheetFromDB', data);

      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: 'Data updated successfully' });
    } catch (err: any) {
      log.error('Failed to update data:', err.message);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update data', error: err.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { item_id } = req.query;
      if (!item_id) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: 'Missing item_id parameter' });
        return;
      }
      await dbServices.DBAPIDelete(String(item_id) as string);

      await baseQueue.add('deleteToSheetFromDB', { item_id });

      res.status(HTTP_STATUS.OK).json({ message: 'Data deleted successfully' });
    } catch (err: any) {
      log.error('Failed to delete data:', err.message);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete data', error: err.message });
    }
  }
}
