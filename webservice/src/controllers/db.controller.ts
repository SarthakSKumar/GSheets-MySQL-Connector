import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
export class DBCRUDController {
  public async read(req: Request, res: Response): Promise<void> {
    try {
      res
        .status(HTTP_STATUS.ACCEPTED)
        .json({ message: 'Job is processing in the background' });
    } catch (err: any) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to trigger job', error: err.message });
    }
  }
}
