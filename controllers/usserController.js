const usserController = (Usser) =>{
  const getUssers = async (req, res) => {
    try{
      const { query } = req
      const response = await Usser.find(query)
      return res.json(response) 
    } catch(error){
      throw error
    }
  }

  const postUsser = async (req, res) => {
    try{
      const { body } = req
      const usser = new Usser({
        firstName: body.firstName,
        lastName: body.lastName,
        usserName:(() => {
          if(body.lastName && body.firstName){
            return (body.firstName + "." + body.lastName)
          }
          else{
            return body.firstName ? body.firstName : body.lastName
          }
          })(),
        password: body.password,
        email: body.email,
        address: body.address,
        phone: body.phone
      })
      await usser.save()

      return res.status(201).json(usser)
    } catch(error){
      throw error
    }
  }

  const getUsserById = async (req, res) =>{
    try{
      const{ params } = req
      const response = await Usser.findById(params.usserId)

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  const putUsserById = async (req, res) =>{
    try{    
      const { params, body } = req
      const response = await Usser.findByIdAndUpdate(
        {_id: params.usserId}, {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: (() => {
              if(body.lastName && body.firstName){
                return (body.firstName + "." + body.lastName)
              }
              else{
                return body.firstName ? body.firstName : body.lastName
              }
              })(),
            password: body.password,
            email: body.email,
            address: body.address,
            phone: body.phone}
          }, {new: true})
      return res.status(202).json(response)
    } catch(error){
      throw error
    }
  }

  const deleteUsserById = async(req, res) =>{
    try{
      const { params } = req
      await Usser.findByIdAndDelete(params.usserId)
      return res.status(202).json({message: "El usuario fue eliminado con exito"})
    } catch(error){
      throw error
    }
  }

  return {getUssers, postUsser, getUsserById, putUsserById, deleteUsserById}
}

module.exports = usserController