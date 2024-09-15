import express, { Router } from 'express';
import { DBCRUDController } from 'app/src/controllers/dbcrud.controller';

class CRUDRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/create', DBCRUDController.prototype.read);
    this.router.get('/read', DBCRUDController.prototype.read);
    this.router.get('/update', DBCRUDController.prototype.read);
    this.router.get('/delete', DBCRUDController.prototype.read);

    return this.router;
  }
}

export const DBCRUDRoutes: CRUDRoutes = new CRUDRoutes();
