import ThumbController from '../controllers/ThumbController';
import BaseRoute from '../routes/BaseRoute'
import ThumbSchema from '../schema/ThumbSchema'

class ThumbRoutes extends BaseRoute {
  setup() {

    // this.routes.use(this.LoginRequired)
    this.routes.post('/', this.upload, this.schemaValidator.validate(ThumbSchema.store),ThumbController.store)
    this.routes.delete('/:id', ThumbController.delete)
    this.routes.get('/:id', ThumbController.show)
    this.routes.get('/', ThumbController.index)
    this.routes.put('/:id', this.schemaValidator.validate(ThumbSchema.store), ThumbController.update)

    return this.routes
  }
}

export default new ThumbRoutes();
