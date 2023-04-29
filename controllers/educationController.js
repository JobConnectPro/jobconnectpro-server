const { Education, Attainment } = require('../models');

class EducationController {
    static async getAllEducation(req, res, next) {
        try{
            const findAllEducation = await Education.findAll({
                where: {id},
                include: [
                    {model: Attainment}
                ]
                
            })

            if(findAllEducation){
                res.status(200).json(findAllEducation)
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch(error){
            next(error)
        }
    }
    static async getEducationById(req, res, next) {
        const {id} = req.params
        try{
            const findEducationById = await Company.findOne({
                where: {
                    id
                },
                include : [
                    {
                        model: Attainment
                    },
                ]
            })
            if (findEducationById){
                res.status(200).json(findEducationById)
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }
    static async createEducation(req, res, next) {
        const {id} = req.userLogged;
        const {attainment, school, major, description, start_date, end_date}  = req.body
        try{
            const findAttainment = await Attainment.findOne({where: {attainment : `${attainment}`}})

            const data = await Education.create({
                user_id : id,
                attainment_id : findAttainment.id,
                school,
                major,
                description,
                start_date,
                end_date,
            })
            if(data){
                res.status(200).json({message: "Successfully create education!"})
            }else{
                next({name: 'ValidationFailed'})
            }
        }catch (error){
            next(error)
        }
    }
    static async updateEducationById(req, res, next) {
        const {id} = req.params
        const {attainment, school, major, description, start_date, end_date}  = req.body
        try{
            const findAttainment = await Attainment.findOne({where: {attainment : `${attainment}`}})

            const updateEducation = await Education.update({
                attainment_id : findAttainment.id,
                school,
                major,
                description,
                start_date,
                end_date,
            },
            {
                where: {
                    id
                }
            })
            if(updateEducation){
                res.status(200).json({message: "Successfully update education!"})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }
    static async deleteEducationById(req, res, next) {
        const {id} = req.params
        try{
            const deleteEducationById = await Education.destroy({
                where : {
                    id
                }
            })
            if (deleteEducationById){
                res.status(200).json({message: "Successfully delete Education!"})
            }else{
                next({name: 'ErrorNotFound'})
            }

        }catch (error){
            next(error)
        }
    }
}

module.exports = EducationController;
