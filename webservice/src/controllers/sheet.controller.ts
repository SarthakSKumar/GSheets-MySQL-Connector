import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import Logger from 'bunyan';
import { config } from '@/config';
import { ISheetPOST } from '@/types';
import { baseQueue } from '@/worker/base.worker';
const log: Logger = config.createLogger('SheetCRUDController');

export class SheetCRUDController {
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const data: ISheetPOST = req.body;
      await baseQueue.add('updateToDBFromSheet', { data });
      res
        .status(HTTP_STATUS.ACCEPTED)
        .json({ message: 'Job added successfully' });
    } catch (err: any) {
      log.error('Failed to process data:', err.message);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to trigger job', error: err.message });
    }
  }
}
