const { response } = require('express')
const express = require('express')
const usserController = require('../controllers/usserController')

const routes = (Usser) => {
  const usserRouter = express.Router()
  const controller = usserController(Usser)

  usserRouter.route('/ussers')
    .get(controller.getUssers)
    .post(controller.postUsser)

  usserRouter.route('/ussers/:usserId')
    .get(controller.getUsserById)
    .put(controller.putUsserById)
    .delete(controller.deleteUsserById)

  return usserRouter
}

module.exports = routes