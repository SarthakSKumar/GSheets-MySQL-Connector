import express, { Router } from 'express';
import { SheetCRUDController } from '@/controllers/sheet.controller';

class CRUDRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/sheet', SheetCRUDController.prototype.update);
    return this.router;
  }
}

export const SheetCRUDRoutes: CRUDRoutes = new CRUDRoutes();
