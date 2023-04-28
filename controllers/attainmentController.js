const { Attainment } = require('../models');

class AttainmentController {
    static async findAllAttainment(req, res) {
        try {
          const data = await Attainment.findAll();
          res.status(200).json(data);
        } catch (error) {
          console.log(error);
        }
      }
    
      static async findOneAttainment(req, res, next) {
        try {
          const { id } = req.params;
          const data = await Attainment.findOne({ where: { id } });
    
          if (data) {
            res.status(200).json(data);
          } else {
            throw { name: 'ErrorNotFound' };
          }
        } catch (error) {
          next(error);
        }
      }
      static async createAttainment(req, res){
        const {attainment} = req.body

        try {
            const attainmentData = await Attainment.create({attainment})
            res.status(201).json(attainmentData)
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
    static async updateAttaiment(req, res, next) {
        try {
          const { id } = req.params;
          const { attainment } = req.body;
    
          const findAttainment = await Attainment.findOne({ where: { id } });
    
          if (findAttainment) {
            const data = await Attainment.update(
              {
                attainment,
              },
              { where: { id } }
            );
            res.status(201).json({ message: 'Succesfully update attainment!!' });
          } else {
            throw { name: 'ErrorNotFound' };
          }
        } catch (error) {
          next(error);
        }
      }
      static async deleteAttainmentById(req, res, next) {
        const {id} = req.params
        try{
            console.log(id)
            const deleteAttainmentById = await Attainment.destroy({
                where : {
                    id
                }
            })
            if(deleteAttainmentById){
                res.status(200).json({message : 'Successfully deleted Attainment'})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }
}

module.exports = AttainmentController;
