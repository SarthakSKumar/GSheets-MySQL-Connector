import express, { Router } from 'express';
import { DBCRUDController } from '@/controllers/db.controller';

class CRUDRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/db/create', DBCRUDController.prototype.create);
    this.router.put('/db/update', DBCRUDController.prototype.update);
    this.router.delete('/db/delete', DBCRUDController.prototype.delete);
    return this.router;
  }
}

export const DBCRUDRoutes: CRUDRoutes = new CRUDRoutes();
