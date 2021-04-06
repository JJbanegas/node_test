const express = require('express')
const usserController = require('../controllers/usserController')
const validator = require('express-joi-validation').createValidator()
const validations = require('../Validations/validations')


const routes = (Usser) => {
  const usserRouter = express.Router()
  const controller = usserController(Usser)

  usserRouter.route('/ussers')
    .get(controller.getUssers)
    .post(validator.body(validations.valPostUser),
      controller.postUsser)

  usserRouter.route('/ussers/:usserId')
    .get(controller.getUsserById)

    .put(validator.body(validations.valUsserPut),
      controller.putUsserById)

    .delete(controller.deleteUsserById)

  usserRouter.route('/ussers/login')
    .post(validator.body(validations.valUserLogin),
      controller.postUsserLogIn)

  usserRouter.route('/ussers/usserName/:usserName')
    .get(controller.GetUsserByUsserName)

  return usserRouter
}

module.exports = routes