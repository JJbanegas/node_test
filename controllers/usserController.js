const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usserController = (Usser) =>{
  const getUssers = async (req, res) =>{
    try{
      const { query } = req
      const response = await Usser.find(query)
      return res.json(response) 
    } catch(error){
      throw error
    }
  }

  const postUsser = async (req, res) => {
    const saltingNumber = 10
    const pss = await bcrypt.hash(req.body.password, saltingNumber)
    try{
      const { body } = req
      const usser = new Usser({
        ...body,
        /*firstName: body.firstName,
        lastName: body.lastName,*/
        usserName:(() => {
          if(body.lastName && body.firstName){
            return (body.firstName + "." + body.lastName)
          }
          else{
            return body.firstName ? body.firstName : body.lastName
          }
          })(),
        password: pss,
        phone: body.phone.toString()
        /*email: body.email,
        address: body.address,
        phone: body.phone*/
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
            usserName: (() => {
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

  const postUsserLogIn = async(req, res) =>{
    try{
        const { body } = req
        const response = await Usser.findOne({usserName: body.usserName})
        const isPasswordCorrect = await bcrypt.compare(body.password, response.password)
        if(response != null && isPasswordCorrect){
          const tokenUsser = {
            firstName: response.firstName,
            lastName: response.lastName,
            usserName: response.usserName
          }
          const token = jwt.sign(tokenUsser, 'secret')
          return res.status(202).json({message: 'Bienvenido usuario: ' + response.usserName, token: token})
        }
        else{
          return res.status(202).json({message: 'Datos invalidos'})
        } 
    } catch(error){
      throw error
    }
  }

  const GetUsserByUsserName = async(req, res) =>{
    try{
      const{ params } = req
      const response = await Usser.find({usserName: params.usserName})

      return res.json(response)
    } catch(error){
      throw error
    }
  }

  return {getUssers, postUsser, getUsserById, putUsserById, deleteUsserById, postUsserLogIn, GetUsserByUsserName}
}

module.exports = usserController