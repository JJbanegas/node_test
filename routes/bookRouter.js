const { response } = require('express')
const express = require('express')
const booksController = require('../controllers/booksController')

const routes = (Book) => {

  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks)
    .post(controller.postBook)

  bookRouter.route('/books/:bookId')
    .get(controller.getBookById)
    .put(controller.putById)
    .delete(controller.deleteById)

  return bookRouter
}

module.exports = routes
