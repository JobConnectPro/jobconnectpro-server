const { Sector, Company, User } = require('../models');

class SectorController {
    static async getAllSector(req, res, next) {
        try{
            const findAll = await Sector.findAll()
        if (findAll) {
            res.status(200).json(findAll)
        }else{
            next({name: 'ErrorNotFound'})
        }
        }catch (error){
            next(error)
        }
    }

    static async getSectorById(req, res, next) {
        const {id} =  req.params
        try{
            const findSectorById = await Sector.findOne({
                where: {
                    id
                }
            })
            if (findSectorById) {
                res.status(200).json(findSectorById)
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async createSector(req, res, next) {
        const {sector} = req.body
        try{
            const uniqueSector = await Sector.findOne({where : {sector: `${sector}`}})
            if(!uniqueSector){
                const createSector = await Sector.create({
                    sector
                })
                res.status(200).json({message: 'Successfully created sector'})
            }else{
                next({name: 'ValidationFailed'})
            }
        }catch (error){
            next(error)
        }
    }

    static async updateSectorById(req, res, next) {
        const {id} = req.params
        const {sector} = req.body
        try{
            const updateSectorById = await Sector.update(
                {
                    sector
                },
                {
                    where : {
                        id
                    }
                }
            )
            if (updateSectorById){
                res.status(200).json({message : 'Successfully updated sector'})
            }else{
                next({name : 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async deleteSectorById(req, res, next) {
        const {id} = req.params
        try{
            console.log(id)
            const deleteSectorById = await Sector.destroy({
                where : {
                    id
                }
            })
            if(deleteSectorById){
                res.status(200).json({message : 'Successfully deleted sector'})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }
}

module.exports = SectorController;
