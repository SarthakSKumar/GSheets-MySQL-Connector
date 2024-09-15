import express, { Router } from 'express';
import { DBCRUDController } from '@/controllers/db.controller';

class CRUDRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/db/create', DBCRUDController.prototype.read);

    return this.router;
  }
}

export const DBCRUDRoutes: CRUDRoutes = new CRUDRoutes();
