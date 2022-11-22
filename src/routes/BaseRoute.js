import { Router } from 'express';
import SchemaValidator from '../middlewares/Validate';

class BaseRoute {
  constructor() {
    this.router = Router();
    this.SchemaValidator = new SchemaValidator();
  }
}

export default BaseRoute;
