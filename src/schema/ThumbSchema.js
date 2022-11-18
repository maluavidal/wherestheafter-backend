import ThumbController from '../controllers/ThumbController';
import BaseRoute from '../routes/BaseRoute'

class ThumbRoutes extends BaseRoute {
  setup() {
    this.routes.delete('/:id', ThumbController.delete)

    return this.routes
  }
}

export default new ThumbRoutes();
