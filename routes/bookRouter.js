const express = require('express')
const booksController = require('../controllers/booksController')
const validator = require('express-joi-validation').createValidator({})
const validations = require('../Validations/validations')

const routes = (Book) => {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks)
    .post(validator.body(validations.valPostBook),
      controller.postBook)

  bookRouter.route('/books/:bookId')
    .get(controller.getBookById)
    .put(validator.body(validations.valPutBook),
      controller.putById)
    .delete(controller.deleteById)

  bookRouter.route('/books/bookName/:title')
    .get(controller.GetBookByName)

  bookRouter.route('/books/bookAuthor/:author')
    .get(controller.GetBookByAuthor)

  return bookRouter
}

module.exports = routes
