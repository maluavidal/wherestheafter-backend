const express = require('express');
const pdfController = require('../controllers/pdfController')()
const loginRequired = require('../middlewares/loginRequired')

const routes = express.Router();

routes.get('/pdf/:student_id', loginRequired, pdfController.index);

module.exports = routes;
