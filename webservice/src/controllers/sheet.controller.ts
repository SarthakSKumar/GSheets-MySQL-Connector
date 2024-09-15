import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import Logger from 'bunyan';
import { config } from '@/config';

const log: Logger = config.createLogger('POST /sheet ');

export class SheetCRUDController {
  public async update(req: Request, res: Response): Promise<void> {
    try {
      log.info('Triggering job with data:', req.body);

      res.status(HTTP_STATUS.ACCEPTED).json({ message: req.body });
    } catch (err: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to trigger job', error: err.message });
    }
  }
}
