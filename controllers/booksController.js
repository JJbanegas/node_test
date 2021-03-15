const booksController = (Book) =>{
  const getBooks = async (req, res) => {
    try{
      const { query } = req
      const response = await Book.find(query)
      return res.json(response) 
    } catch(error){
      throw error
    }
  }

  const postBook = async (req, res) => {
    try{
      const book = new Book(req.body)
      await book.save()

      return res.status(201).json(book)
    } catch(error){
      throw error
    }
  }

  const getBookById = async (req, res) =>{
    try{
      const{ params } = req
      const response = await Book.findById(params.bookId)

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  const putById = async (req, res) =>{
    try{    
      const { params, body } = req
      /*const response = await Book.updateOne({
        _id: params.bookId
      }, {
        $set: {
          title: body.title,
          genre: body.genre,
          author: body.author,
          read: body.read
        }
      })*/
      const response = await Book.findByIdAndUpdate(
        {_id: params.bookId}, {
          $set: {
            title: body.title,
            genre: body.genre,
            author: body.author,
            read: body.read}
          }, {new: true})
      return res.status(202).json(response)
    } catch(error){
      throw error
    }
  }

  const deleteById = async(req, res) =>{
    try{
      const { params } = req
      await Book.findByIdAndDelete(params.bookId)
      return res.status(202).json({message: "El libro fue eliminado con exito"})
    } catch(error){
      throw error
    }
  }

  return {getBooks, postBook, getBookById, putById, deleteById}
}

module.exports = booksController